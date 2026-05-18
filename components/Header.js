'use client';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (pathname === '/') return 'Active Tasks';
    if (pathname === '/board') return 'Development Board';
    if (pathname === '/dashboard') return 'Personal Dashboard';
    if (pathname.startsWith('/task/')) return 'Task Details';
    return 'Overview';
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span>Engineering</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span>Sprint 24</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.currentPath}>{getBreadcrumb()}</span>
      </div>

      <div className={styles.center}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Search tasks, spaces..." 
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.timerBtn}>
          <span>⏱️</span> Quick Start Timer
        </button>
        <button className={styles.iconBtn}>🔔</button>
        <button className={styles.iconBtn}>❓</button>
        <button className={styles.iconBtn}>🎛️</button>
        <div className={styles.avatar}>
          <div style={{width: '100%', height: '100%', backgroundColor: '#2b8a3e'}}></div>
        </div>
      </div>
    </header>
  );
}
