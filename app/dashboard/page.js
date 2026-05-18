'use client';
import { useTaskContext } from '@/context/TaskContext';
import styles from './Dashboard.module.css';
import Badge from '@/components/Badge';

export default function Dashboard() {
  const { tasks } = useTaskContext();

  const totalSeconds = tasks.reduce((acc, t) => acc + t.timeLogged, 0);
  const totalHours = (totalSeconds / 3600).toFixed(1);
  
  const completedTasks = tasks.filter(t => t.status === 'DONE' || t.status === 'REVIEW').length;
  
  // Just some mock logic for "upcoming deadlines" - anything with priority URGENT or HIGH
  const upcomingDeadlines = tasks.filter(t => t.priority === 'URGENT' || t.priority === 'HIGH').length;

  const chartData = [
    { day: 'Mon', prod: 40, deep: 20 },
    { day: 'Tue', prod: 60, deep: 30 },
    { day: 'Wed', prod: 30, deep: 20 },
    { day: 'Thu', prod: 80, deep: 40 },
    { day: 'Fri', prod: 70, deep: 10 },
    { day: 'Sat', prod: 15, deep: 0 },
    { day: 'Sun', prod: 10, deep: 0 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Personal Dashboard</h1>
        <p className={styles.subtitle}>Welcome back. You have {upcomingDeadlines} deadlines approaching in the next 48 hours.</p>
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
              <div key={idx} className={styles.barColumn}>
                <div className={styles.barWrapper}>
                  <div className={styles.barSegment} style={{height: `${data.deep}%`, backgroundColor: '#e9ecef'}}></div>
                  <div className={styles.barSegment} style={{height: `${data.prod}%`, backgroundColor: 'var(--accent-black)'}}></div>
                </div>
                <span className={styles.dayLabel}>{data.day}</span>
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
          <h2 className={styles.cardTitle}>Time per Project</h2>
          
          <div className={styles.doughnutWrapper}>
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--bg-secondary)" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-black)" strokeWidth="10" strokeDasharray="113 251" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#b08d00" strokeWidth="10" strokeDasharray="75 251" strokeDashoffset="-113" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#dee2e6" strokeWidth="10" strokeDasharray="63 251" strokeDashoffset="-188" />
            </svg>
            <div className={styles.doughnutCenter}>
              <span className={styles.doughnutTotal}>{totalHours}h</span>
              <span className={styles.doughnutLabel}>Total</span>
            </div>
          </div>

          <div className={styles.projectList}>
            <div className={styles.projectItem}>
              <div className={styles.projectLeft}>
                <div className={styles.dot} style={{backgroundColor: 'var(--accent-black)'}}></div>
                Core Infrastructure
              </div>
              <div className={styles.projectRight}>45%</div>
            </div>
            <div className={styles.projectItem}>
              <div className={styles.projectLeft}>
                <div className={styles.dot} style={{backgroundColor: '#b08d00'}}></div>
                User Feedback
              </div>
              <div className={styles.projectRight}>30%</div>
            </div>
            <div className={styles.projectItem}>
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
            <h2 className={styles.cardTitle}>Recent Activity</h2>
            <span style={{fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer'}}>View all activity</span>
          </div>

          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>⏱️</div>
              <div className={styles.activityContent}>
                <div className={styles.activityText}>
                  <strong>You logged 2h 15m</strong> on &quot;API Auth refactoring&quot;
                </div>
                <div className={styles.activityMeta}>Core Infrastructure • 24 mins ago</div>
              </div>
              <Badge text="PRODUCTIVE" type="productive" />
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>🔄</div>
              <div className={styles.activityContent}>
                <div className={styles.activityText}>
                  <strong>Status Change:</strong> &quot;Mobile Redesign&quot; moved to <span style={{color: '#b08d00', fontWeight: 600}}>Review</span>
                </div>
                <div className={styles.activityMeta}>User Feedback • 2 hours ago</div>
              </div>
              <div style={{color: 'var(--text-tertiary)', cursor: 'pointer'}}>⋮</div>
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>⏱️</div>
              <div className={styles.activityContent}>
                <div className={styles.activityText}>
                  <strong>You logged 45m</strong> on &quot;Internal Admin Sprint Planning&quot;
                </div>
                <div className={styles.activityMeta}>Ops/Admin • 5 hours ago</div>
              </div>
              <Badge text="DEEP WORK" type="deep work" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
