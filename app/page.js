'use client';
import { useTaskContext } from '@/context/TaskContext';
import styles from './TaskList.module.css';
import TaskRow from '@/components/TaskRow';

export default function Home() {
  const { tasks, activeTrackingId, isTracking, stopTracking, pauseTracking } = useTaskContext();

  const tasksToDo = tasks.filter(t => t.status === 'TO DO');
  const tasksInProgress = tasks.filter(t => t.status === 'IN PROGRESS');
  const tasksReview = tasks.filter(t => t.status === 'REVIEW');

  const activeTask = tasks.find(t => t.id === activeTrackingId);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.viewTabs}>
          <div className={`${styles.tab} ${styles.active}`}>
            <span>🔠</span> List
          </div>
          <div className={styles.tab}>
            <span>📋</span> Board
          </div>
          <div className={styles.tab}>
            <span>📅</span> Calendar
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className={styles.tab}>
            <span>🔍</span> Filter
          </div>
          <div className={styles.tab}>
            <span>⇅</span> Sort
          </div>
        </div>
      </div>

      <div className={styles.tableHeader}>
        <div>TASK NAME</div>
        <div>ASSIGNEE</div>
        <div>DUE DATE</div>
        <div>PRIORITY</div>
        <div>TIME LOGGED</div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.collapseIcon}>▼</span>
          <span className={styles.statusLabel}>TO DO</span>
          <span className={styles.taskCount}>{tasksToDo.length} Tasks</span>
        </div>
        <div>
          {tasksToDo.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.collapseIcon}>▼</span>
          <span className={`${styles.statusLabel} ${styles.inProgress}`}>IN PROGRESS</span>
          <span className={styles.taskCount}>{tasksInProgress.length} Task{tasksInProgress.length !== 1 ? 's' : ''}</span>
        </div>
        <div>
          {tasksInProgress.map((task) => (
            <TaskRow key={task.id} task={task} activeTracking={activeTrackingId === task.id && isTracking} />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.collapseIcon}>▼</span>
          <span className={`${styles.statusLabel} ${styles.review}`}>REVIEW</span>
          <span className={styles.taskCount}>{tasksReview.length} Task{tasksReview.length !== 1 ? 's' : ''}</span>
        </div>
        <div style={{ opacity: 0.6 }}>
          {tasksReview.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </div>

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
