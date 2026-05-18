'use client';
import { useTaskContext } from '@/context/TaskContext';
import styles from './Board.module.css';
import TaskCard from '@/components/TaskCard';

export default function Board() {
  const { tasks } = useTaskContext();

  const backlog = tasks.filter(t => t.status === 'BACKLOG');
  const todo = tasks.filter(t => t.status === 'TO DO');
  const inProgress = tasks.filter(t => t.status === 'IN PROGRESS');

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
          <button className={styles.actionBtn}>
            <span>≡</span> Filter
          </button>
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
            {backlog.map((task, idx) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>
              To Do <span className={styles.count}>{todo.length}</span>
            </div>
            <span className={styles.colOptions}>•••</span>
          </div>
          <div className={styles.cards}>
            {todo.map((task, idx) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.colHeader}>
            <div className={styles.colTitle}>
              In Progress <span className={`${styles.count} ${styles.activeCount}`} style={{backgroundColor: 'var(--accent-black)', color: 'white'}}>{inProgress.length}</span>
            </div>
            <span className={styles.colOptions}>•••</span>
          </div>
          <div className={styles.cards}>
            {inProgress.map((task, idx) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
