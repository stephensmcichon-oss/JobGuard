'use client';
import { usePathname } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, isNotificationsOpen, toggleNotifications, tasks, isTracking, startTracking, stopTracking } = useTaskContext();

  const getBreadcrumb = () => {
    if (pathname === '/') return 'Active Tasks';
    if (pathname === '/board') return 'Development Board';
    if (pathname === '/dashboard') return 'Personal Dashboard';
    if (pathname.startsWith('/task/')) return 'Task Details';
    return 'Overview';
  };

  const handleQuickTimer = () => {
    if (isTracking) {
      stopTracking();
    } else {
      const firstTask = tasks.find(t => t.status !== 'DONE') || tasks[0];
      if (firstTask) startTracking(firstTask.id);
    }
  };

  const upcomingDeadlines = tasks.filter(t => t.priority === 'URGENT' || t.priority === 'HIGH');

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', marginRight: '0.5rem' }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.timerBtn} onClick={handleQuickTimer}>
          <span>{isTracking ? '⏹️' : '⏱️'}</span> {isTracking ? 'Stop Timer' : 'Quick Start Timer'}
        </button>
        <div style={{ position: 'relative' }}>
          <button className={styles.iconBtn} onClick={toggleNotifications}>
            🔔
            {upcomingDeadlines.length > 0 && (
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: 'red', color: 'white', fontSize: '0.6rem', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {upcomingDeadlines.length}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div style={{ position: 'absolute', top: '120%', right: 0, width: '320px', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 1000, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.95rem' }}>Notifications</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={toggleNotifications}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto' }}>
                {upcomingDeadlines.length === 0 ? (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem 0' }}>No pending urgent notifications</div>
                ) : (
                  upcomingDeadlines.map(t => (
                    <div key={t.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', padding: '0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '1rem' }}>⚠️</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{t.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Priority: {t.priority} • Due: {t.dueDate}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <button className={styles.iconBtn}>❓</button>
        <button className={styles.iconBtn}>🎛️</button>
        <div className={styles.avatar}>
          <div style={{width: '100%', height: '100%', backgroundColor: '#2b8a3e'}}></div>
        </div>
      </div>
    </header>
  );
}
