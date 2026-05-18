'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import styles from './TaskList.module.css';
import TaskRow from '@/components/TaskRow';

export default function Home() {
  const router = useRouter();
  const { tasks, activeTrackingId, isTracking, stopTracking, pauseTracking, searchQuery, filterPriority, setFilterPriority, filterAssignee, setFilterAssignee, sortBy, setSortBy } = useTaskContext();

  const [activeTab, setActiveTab] = useState('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    TODO: false,
    IN_PROGRESS: false,
    REVIEW: false
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter tasks
  let filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'ALL' || task.assigneeInitials === filterAssignee;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  // Sort tasks
  filteredTasks.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityWeight = { URGENT: 4, HIGH: 3, NORMAL: 2, LOW: 1, BUG: 4, SECURITY: 4, FEATURE: 2, REFACTOR: 1 };
      return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    }
    if (sortBy === 'dueDate') {
      return a.dueDate.localeCompare(b.dueDate);
    }
    if (sortBy === 'timeLogged') {
      return b.timeLogged - a.timeLogged;
    }
    return 0; // DEFAULT
  });

  const tasksToDo = filteredTasks.filter(t => t.status === 'TO DO' || t.status === 'BACKLOG');
  const tasksInProgress = filteredTasks.filter(t => t.status === 'IN PROGRESS');
  const tasksReview = filteredTasks.filter(t => t.status === 'REVIEW' || t.status === 'DONE');

  const activeTask = tasks.find(t => t.id === activeTrackingId);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const assigneesList = Array.from(new Set(tasks.map(t => t.assigneeInitials)));

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.viewTabs}>
          <div className={`${styles.tab} ${activeTab === 'list' ? styles.active : ''}`} onClick={() => setActiveTab('list')}>
            <span>🔠</span> List
          </div>
          <div className={styles.tab} onClick={() => router.push('/board')}>
            <span>📋</span> Board
          </div>
          <div className={`${styles.tab} ${activeTab === 'calendar' ? styles.active : ''}`} onClick={() => setActiveTab('calendar')}>
            <span>📅</span> Calendar
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
          <div className={`${styles.tab} ${filterPriority !== 'ALL' || filterAssignee !== 'ALL' ? styles.active : ''}`} onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}>
            <span>🔍</span> Filter {filterPriority !== 'ALL' || filterAssignee !== 'ALL' ? '(Active)' : ''}
          </div>
          <div className={`${styles.tab} ${sortBy !== 'DEFAULT' ? styles.active : ''}`} onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}>
            <span>⇅</span> Sort {sortBy !== 'DEFAULT' ? `(${sortBy})` : ''}
          </div>

          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div style={{ position: 'absolute', top: '120%', right: '100px', width: '260px', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 100, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Priority</label>
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <option value="ALL">All Priorities</option>
                  <option value="URGENT">Urgent / Bug</option>
                  <option value="HIGH">High</option>
                  <option value="NORMAL">Normal / Feature</option>
                  <option value="LOW">Low / Refactor</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Assignee</label>
                <select value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <option value="ALL">All Assignees</option>
                  {assigneesList.map(init => (
                    <option key={init} value={init}>{init}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => { setFilterPriority('ALL'); setFilterAssignee('ALL'); }} style={{ padding: '0.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>Reset Filters</button>
            </div>
          )}

          {/* Sort Dropdown */}
          {isSortOpen && (
            <div style={{ position: 'absolute', top: '120%', right: 0, width: '200px', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 100, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Sort By</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <button onClick={() => { setSortBy('DEFAULT'); setIsSortOpen(false); }} style={{ textAlign: 'left', padding: '0.5rem', background: sortBy === 'DEFAULT' ? 'var(--bg-secondary)' : 'none', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>Default</button>
                <button onClick={() => { setSortBy('priority'); setIsSortOpen(false); }} style={{ textAlign: 'left', padding: '0.5rem', background: sortBy === 'priority' ? 'var(--bg-secondary)' : 'none', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>Priority (High to Low)</button>
                <button onClick={() => { setSortBy('dueDate'); setIsSortOpen(false); }} style={{ textAlign: 'left', padding: '0.5rem', background: sortBy === 'dueDate' ? 'var(--bg-secondary)' : 'none', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>Due Date</button>
                <button onClick={() => { setSortBy('timeLogged'); setIsSortOpen(false); }} style={{ textAlign: 'left', padding: '0.5rem', background: sortBy === 'timeLogged' ? 'var(--bg-secondary)' : 'none', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>Time Logged (Most)</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '1rem', minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>October 2023</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>◀</button>
              <button style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Today</button>
              <button style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>▶</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} style={{ padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'center' }}>{d}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const dayTasks = tasks.filter(t => t.dueDate.includes(`${day},`) || (day === 12 && t.dueDate.includes('Oct 12')) || (day === 14 && t.dueDate.includes('Oct 14')) || (day === 20 && t.dueDate.includes('Oct 20')) || (day === 25 && t.dueDate.includes('Oct 25')));
              return (
                <div key={day} style={{ padding: '0.75rem', backgroundColor: 'white', minHeight: '100px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: dayTasks.length > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)', marginBottom: '0.5rem' }}>{day}</span>
                  {dayTasks.map(t => (
                    <div key={t.id} style={{ padding: '0.25rem 0.5rem', backgroundColor: t.priority === 'URGENT' || t.priority === 'HIGH' ? '#ffe3e3' : 'var(--bg-secondary)', color: t.priority === 'URGENT' || t.priority === 'HIGH' ? '#c92a2a' : 'var(--text-primary)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.name}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.tableHeader}>
            <div>TASK NAME</div>
            <div>ASSIGNEE</div>
            <div>DUE DATE</div>
            <div>PRIORITY</div>
            <div>TIME LOGGED</div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader} onClick={() => toggleSection('TODO')} style={{ cursor: 'pointer' }}>
              <span className={styles.collapseIcon}>{collapsedSections.TODO ? '▶' : '▼'}</span>
              <span className={styles.statusLabel}>TO DO / BACKLOG</span>
              <span className={styles.taskCount}>{tasksToDo.length} Tasks</span>
            </div>
            {!collapsedSections.TODO && (
              <div>
                {tasksToDo.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader} onClick={() => toggleSection('IN_PROGRESS')} style={{ cursor: 'pointer' }}>
              <span className={styles.collapseIcon}>{collapsedSections.IN_PROGRESS ? '▶' : '▼'}</span>
              <span className={`${styles.statusLabel} ${styles.inProgress}`}>IN PROGRESS</span>
              <span className={styles.taskCount}>{tasksInProgress.length} Task{tasksInProgress.length !== 1 ? 's' : ''}</span>
            </div>
            {!collapsedSections.IN_PROGRESS && (
              <div>
                {tasksInProgress.map((task) => (
                  <TaskRow key={task.id} task={task} activeTracking={activeTrackingId === task.id && isTracking} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader} onClick={() => toggleSection('REVIEW')} style={{ cursor: 'pointer' }}>
              <span className={styles.collapseIcon}>{collapsedSections.REVIEW ? '▶' : '▼'}</span>
              <span className={`${styles.statusLabel} ${styles.review}`}>REVIEW / DONE</span>
              <span className={styles.taskCount}>{tasksReview.length} Task{tasksReview.length !== 1 ? 's' : ''}</span>
            </div>
            {!collapsedSections.REVIEW && (
              <div style={{ opacity: 0.6 }}>
                {tasksReview.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Active Tracker Banner */}
      {isTracking && activeTask && (
        <div className={styles.activeTracker}>
          <div className={styles.trackerLeft}>
            <div className={styles.trackerDot}></div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--status-normal-text)' }}>ACTIVE TRACKING</span>
            <span className={styles.trackerTitle}>{activeTask.name}</span>
          </div>
          <div className={styles.trackerRight}>
            <span className={styles.trackerTime}>{formatTime(activeTask.timeLogged)}</span>
            <div className={styles.trackerControls}>
              <button className={`${styles.controlBtn} ${styles.stopBtn}`} onClick={stopTracking}>⏹</button>
              <button className={`${styles.controlBtn} ${styles.pauseBtn}`} onClick={pauseTracking}>⏸</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
