'use client';
import Badge from './Badge';
import styles from './TaskCard.module.css';

export default function TaskCard({ task }) {
  const timeInHours = (task.timeLogged / 3600).toFixed(1);
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Badge text={task.type} type={task.type} />
      </div>
      
      <div className={styles.title}>{task.name}</div>
      
      <div className={styles.footer}>
        <div className={styles.avatars}>
          {task.assignees.map((assignee, idx) => (
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
