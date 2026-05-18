'use client';
import Badge from './Badge';
import { useTaskContext } from '@/context/TaskContext';
import styles from '../app/TaskList.module.css';

export default function TaskRow({ task, activeTracking }) {
  const { startTracking, stopTracking, updateTaskStatus, deleteTask } = useTaskContext();

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={() => activeTracking ? stopTracking() : startTracking(task.id)}
            style={{ cursor: 'pointer', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: activeTracking ? '#ffe3e3' : 'var(--bg-secondary)', color: activeTracking ? '#c92a2a' : 'inherit' }}
            title={activeTracking ? "Stop Timer" : "Start Timer"}
          >
            {activeTracking ? '⏹' : '▶'}
          </button>
          <select 
            value={task.status} 
            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
            style={{ padding: '0.2rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            <option value="BACKLOG">BACKLOG</option>
            <option value="TO DO">TO DO</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="REVIEW">REVIEW</option>
            <option value="DONE">DONE</option>
          </select>
          <button 
            onClick={() => deleteTask(task.id)}
            style={{ cursor: 'pointer', padding: '0.2rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'none', color: 'var(--text-secondary)' }}
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
