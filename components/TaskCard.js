'use client';
import { useTaskContext } from '@/context/TaskContext';
import Badge from './Badge';
import styles from './TaskCard.module.css';

export default function TaskCard({ task }) {
  const { updateTaskStatus, deleteTask } = useTaskContext();
  const timeInHours = (task.timeLogged / 3600).toFixed(1);

  const statuses = ['BACKLOG', 'TO DO', 'IN PROGRESS', 'REVIEW', 'DONE'];
  const currentIndex = statuses.indexOf(task.status);

  const moveLeft = () => {
    if (currentIndex > 0) updateTaskStatus(task.id, statuses[currentIndex - 1]);
  };

  const moveRight = () => {
    if (currentIndex < statuses.length - 1) updateTaskStatus(task.id, statuses[currentIndex + 1]);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Badge text={task.priority || task.type} type={task.priority || task.type} />
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {currentIndex > 0 && (
            <button onClick={moveLeft} style={{ border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', borderRadius: '4px', padding: '0.1rem 0.3rem', cursor: 'pointer', fontSize: '0.7rem' }} title="Move Left">◀</button>
          )}
          {currentIndex < statuses.length - 1 && (
            <button onClick={moveRight} style={{ border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', borderRadius: '4px', padding: '0.1rem 0.3rem', cursor: 'pointer', fontSize: '0.7rem' }} title="Move Right">▶</button>
          )}
          <button onClick={() => deleteTask(task.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-secondary)' }} title="Delete Task">🗑️</button>
        </div>
      </div>
      
      <div className={styles.title}>{task.name}</div>
      
      <div className={styles.footer}>
        <div className={styles.avatars}>
          {(task.assignees || [{ initials: task.assigneeInitials || 'ET' }]).map((assignee, idx) => (
            <div key={idx} className={styles.avatar}>
              {assignee.initials}
            </div>
          ))}
        </div>
        
        <div className={styles.time}>
          <span>⏱️</span> {timeInHours}h
        </div>
      </div>
    </div>
  );
}
