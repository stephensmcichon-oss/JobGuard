'use client';
import Badge from './Badge';
import { useTaskContext } from '@/context/TaskContext';
import styles from '../app/TaskList.module.css';

export default function TaskRow({ task, activeTracking }) {
  const { startTracking, stopTracking } = useTaskContext();

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`${styles.tableRow} ${activeTracking ? styles.activeTracking : ''}`}>
      <div className={styles.cell}>
        <input type="checkbox" style={{ width: '16px', height: '16px' }} />
        <div className={styles.taskInfo}>
          <div className={styles.taskName}>
            {task.name}
            {activeTracking && <span style={{ fontSize: '0.8rem' }}>⏱️</span>}
          </div>
          <div className={styles.taskMeta}>
            {task.id} • {task.description}
          </div>
        </div>
      </div>
      <div className={styles.cell}>
        <div className={styles.avatar}>{task.assigneeInitials}</div>
        <span>{task.assignee}</span>
      </div>
      <div className={styles.cell}>{task.dueDate}</div>
      <div className={styles.cell}>
        <Badge text={task.priority} type={task.priority} />
      </div>
      <div className={styles.cell} style={{ justifyContent: 'space-between', paddingRight: '1rem' }}>
        <span className={`${styles.timeText} ${activeTracking ? styles.active : ''}`}>
          {formatTime(task.timeLogged)}
        </span>
        <button 
          onClick={() => activeTracking ? stopTracking() : startTracking(task.id)}
          style={{ cursor: 'pointer', padding: '0.2rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
        >
          {activeTracking ? '⏹' : '▶'}
        </button>
      </div>
    </div>
  );
}
