'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import styles from './Board.module.css';
import TaskCard from '@/components/TaskCard';

export default function Board() {
  const { tasks, openNewTaskModal, searchQuery, filterPriority, setFilterPriority, filterAssignee, setFilterAssignee } = useTaskContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'ALL' || task.assigneeInitials === filterAssignee;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const backlog = filteredTasks.filter(t => t.status === 'BACKLOG');
  const todo = filteredTasks.filter(t => t.status === 'TO DO');
  const inProgress = filteredTasks.filter(t => t.status === 'IN PROGRESS');

  const assigneesList = Array.from(new Set(tasks.map(t => t.assigneeInitials)));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Development Board</h1>
        <div className={styles.actions}>
          <div className={styles.avatars}>
            <div className={styles.avatar}>AR</div>
            <div className={styles.avatar}>SJ</div>
            <div className={styles.avatar}>MT</div>
            <div className={styles.avatar} style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>+4</div>
          </div>
          <div style={{ position: 'relative' }}>
            <button className={styles.actionBtn} onClick={() => setIsFilterOpen(!isFilterOpen)} style={{ background: filterPriority !== 'ALL' || filterAssignee !== 'ALL' ? 'var(--bg-secondary)' : 'white' }}>
              <span>≡</span> Filter {filterPriority !== 'ALL' || filterAssignee !== 'ALL' ? '(Active)' : ''}
            </button>
            {isFilterOpen && (
              <div style={{ position: 'absolute', top: '120%', right: 0, width: '260px', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 100, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
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
          </div>
          <button className={`${styles.actionBtn} ${styles.primary}`}>
            Share
          </button>
        </div>
      </div>

      <div className={styles.board}>
        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>
              Backlog <span className={styles.count}>{backlog.length}</span>
            </div>
            <span className={styles.colOptions}>•••</span>
          </div>
          <div className={styles.cards}>
            {backlog.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          <button 
            onClick={() => openNewTaskModal('BACKLOG')}
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px dashed var(--border-color)', borderRadius: '8px', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}
          >
            + Add Task
          </button>
        </div>

        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>
              To Do <span className={styles.count}>{todo.length}</span>
            </div>
            <span className={styles.colOptions}>•••</span>
          </div>
          <div className={styles.cards}>
            {todo.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          <button 
            onClick={() => openNewTaskModal('TO DO')}
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px dashed var(--border-color)', borderRadius: '8px', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}
          >
            + Add Task
          </button>
        </div>

        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>
              In Progress <span className={`${styles.count} ${styles.activeCount}`} style={{backgroundColor: 'var(--accent-black)', color: 'white'}}>{inProgress.length}</span>
            </div>
            <span className={styles.colOptions}>•••</span>
          </div>
          <div className={styles.cards}>
            {inProgress.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          <button 
            onClick={() => openNewTaskModal('IN PROGRESS')}
            style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px dashed var(--border-color)', borderRadius: '8px', background: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}
          >
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
