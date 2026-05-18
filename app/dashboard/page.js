'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import styles from './Dashboard.module.css';
import Badge from '@/components/Badge';

export default function Dashboard() {
  const { tasks, selectedProject, setSelectedProject, openNewTaskModal } = useTaskContext();
  const [hoveredDay, setHoveredDay] = useState(null);

  const totalSeconds = tasks.reduce((acc, t) => acc + t.timeLogged, 0);
  const totalHours = (totalSeconds / 3600).toFixed(1);
  
  const completedTasks = tasks.filter(t => t.status === 'DONE' || t.status === 'REVIEW').length;
  const upcomingDeadlines = tasks.filter(t => t.priority === 'URGENT' || t.priority === 'HIGH').length;

  const chartData = [
    { day: 'Mon', prod: 40, deep: 20, label: '4h Productive, 2h Deep Work' },
    { day: 'Tue', prod: 60, deep: 30, label: '6h Productive, 3h Deep Work' },
    { day: 'Wed', prod: 30, deep: 20, label: '3h Productive, 2h Deep Work' },
    { day: 'Thu', prod: 80, deep: 40, label: '8h Productive, 4h Deep Work' },
    { day: 'Fri', prod: 70, deep: 10, label: '7h Productive, 1h Deep Work' },
    { day: 'Sat', prod: 15, deep: 0, label: '1.5h Productive' },
    { day: 'Sun', prod: 10, deep: 0, label: '1h Productive' },
  ];

  const activities = [
    { id: 1, type: 'time', text: 'You logged 2h 15m on "API Auth refactoring"', project: 'Core Infrastructure', meta: '24 mins ago', badge: 'PRODUCTIVE', badgeType: 'productive' },
    { id: 2, type: 'status', text: 'Status Change: "Mobile Redesign" moved to Review', project: 'User Feedback', meta: '2 hours ago', badge: null },
    { id: 3, type: 'time', text: 'You logged 45m on "Internal Admin Sprint Planning"', project: 'Ops/Admin', meta: '5 hours ago', badge: 'DEEP WORK', badgeType: 'deep work' },
    { id: 4, type: 'task', text: 'New Task Created: "Refactor Data Grid Engine"', project: 'Core Infrastructure', meta: '1 day ago', badge: 'NEW', badgeType: 'normal' },
    { id: 5, type: 'status', text: 'Status Change: "Design System Documentation" moved to In Progress', project: 'User Feedback', meta: '2 days ago', badge: null }
  ];

  const filteredActivities = selectedProject === 'ALL' ? activities : activities.filter(a => a.project === selectedProject);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "taskflow_pro_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className={styles.title}>Personal Dashboard</h1>
          <p className={styles.subtitle}>Welcome back. You have {upcomingDeadlines} deadlines approaching in the next 48 hours.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => openNewTaskModal('IN PROGRESS')} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--accent-black)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
            ⏱️ Log Time
          </button>
          <button onClick={handleExport} style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
            📥 Export Data
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Total Time Tracked This Week</h2>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={styles.dot} style={{backgroundColor: 'var(--accent-black)'}}></div>
                Productive
              </div>
              <div className={styles.legendItem}>
                <div className={styles.dot} style={{backgroundColor: '#e9ecef'}}></div>
                Deep Work
              </div>
            </div>
          </div>
          
          <div className={styles.barChart}>
            {chartData.map((data, idx) => (
              <div key={idx} className={styles.barColumn} onMouseEnter={() => setHoveredDay(idx)} onMouseLeave={() => setHoveredDay(null)} style={{ position: 'relative' }}>
                <div className={styles.barWrapper}>
                  <div className={styles.barSegment} style={{height: `${data.deep}%`, backgroundColor: '#e9ecef'}}></div>
                  <div className={styles.barSegment} style={{height: `${data.prod}%`, backgroundColor: 'var(--accent-black)'}}></div>
                </div>
                <span className={styles.dayLabel}>{data.day}</span>
                {hoveredDay === idx && (
                  <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent-black)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', whiteSpace: 'nowrap', zIndex: 10, pointerEvents: 'none', marginBottom: '0.5rem' }}>
                    {data.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className={styles.statsCard}>
            <div className={styles.statsIcon}>✓</div>
            <div className={styles.statsBadge}>+12%</div>
            <div>
              <div className={styles.statsValue}>{completedTasks}</div>
              <div className={styles.statsLabel}>Tasks Completed This Week</div>
            </div>
          </div>
          
          <div className={styles.lightStatsCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={styles.statsIcon} style={{backgroundColor: 'var(--bg-secondary)', border: 'none'}}>📅</div>
              <span className={styles.redBadge}>High Priority</span>
            </div>
            <div>
              <div className={styles.lightStatsValue}>{upcomingDeadlines < 10 ? '0'+upcomingDeadlines : upcomingDeadlines}</div>
              <div className={styles.statsLabel} style={{color: 'var(--text-secondary)'}}>Upcoming Deadlines</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className={styles.cardTitle}>Time per Project</h2>
            {selectedProject !== 'ALL' && (
              <button onClick={() => setSelectedProject('ALL')} style={{ border: 'none', background: 'none', color: '#b08d00', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>Reset Filter</button>
            )}
          </div>
          
          <div className={styles.doughnutWrapper}>
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--bg-secondary)" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-black)" strokeWidth="10" strokeDasharray="113 251" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#b08d00" strokeWidth="10" strokeDasharray="75 251" strokeDashoffset="-113" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#dee2e6" strokeWidth="10" strokeDasharray="63 251" strokeDashoffset="-188" />
            </svg>
            <div className={styles.doughnutCenter}>
              <span className={styles.doughnutTotal}>{totalHours}h</span>
              <span className={styles.doughnutLabel}>{selectedProject === 'ALL' ? 'Total' : selectedProject}</span>
            </div>
          </div>

          <div className={styles.projectList}>
            <div className={styles.projectItem} onClick={() => setSelectedProject('Core Infrastructure')} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: selectedProject === 'Core Infrastructure' ? 'var(--bg-secondary)' : 'transparent' }}>
              <div className={styles.projectLeft}>
                <div className={styles.dot} style={{backgroundColor: 'var(--accent-black)'}}></div>
                Core Infrastructure
              </div>
              <div className={styles.projectRight}>45%</div>
            </div>
            <div className={styles.projectItem} onClick={() => setSelectedProject('User Feedback')} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: selectedProject === 'User Feedback' ? 'var(--bg-secondary)' : 'transparent' }}>
              <div className={styles.projectLeft}>
                <div className={styles.dot} style={{backgroundColor: '#b08d00'}}></div>
                User Feedback
              </div>
              <div className={styles.projectRight}>30%</div>
            </div>
            <div className={styles.projectItem} onClick={() => setSelectedProject('Ops/Admin')} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: selectedProject === 'Ops/Admin' ? 'var(--bg-secondary)' : 'transparent' }}>
              <div className={styles.projectLeft}>
                <div className={styles.dot} style={{backgroundColor: '#dee2e6'}}></div>
                Ops/Admin
              </div>
              <div className={styles.projectRight}>25%</div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Activity {selectedProject !== 'ALL' ? `(${selectedProject})` : ''}</h2>
            <span onClick={() => setSelectedProject('ALL')} style={{fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', color: 'var(--text-secondary)'}}>View all activity</span>
          </div>

          <div className={styles.activityList}>
            {filteredActivities.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No recent activity for this project.</div>
            ) : (
              filteredActivities.map(act => (
                <div key={act.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>{act.type === 'time' ? '⏱️' : act.type === 'status' ? '🔄' : '📋'}</div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityText}>
                      {act.text}
                    </div>
                    <div className={styles.activityMeta}>{act.project} • {act.meta}</div>
                  </div>
                  {act.badge && <Badge text={act.badge} type={act.badgeType} />}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
