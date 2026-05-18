'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();
  const { openNewTaskModal } = useTaskContext();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>Job Guard</div>
      
      <div className={styles.workspace}>
        <div className={styles.workspaceIcon}>ET</div>
        <div className={styles.workspaceInfo}>
          <span className={styles.workspaceName}>Engineering Team</span>
          <span className={styles.workspaceType}>Product Workspace</span>
        </div>
      </div>

      <button className={styles.newTaskBtn} onClick={openNewTaskModal}>
        <span>+</span> New Task
      </button>

      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
          <span>🏠</span> Home
        </Link>
        <Link href="#" className={styles.navItem}>
          <span>📥</span> Inbox
        </Link>
        
        <div className={styles.navSection}>
          <Link href="#" className={`${styles.navItem} ${styles.active}`}>
            <span>🗂️</span> Spaces
          </Link>
          <div style={{ marginLeft: '1.5rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}>
              <span style={{ color: 'red', fontSize: '0.5rem' }}>●</span> Engineering
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}>
              <span style={{ color: '#b08d00', fontSize: '0.5rem' }}>●</span> Marketing
            </div>
          </div>
        </div>

        <Link href="/board" className={`${styles.navItem} ${pathname === '/board' ? styles.active : ''}`}>
          <span>📋</span> Board
        </Link>

        <Link href="/dashboard" className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
          <span>📊</span> Dashboards
        </Link>
        
        <Link href="#" className={styles.navItem}>
          <span>📄</span> Docs
        </Link>
      </nav>

      <div className={styles.footer}>
        <Link href="#" className={styles.navItem}>
          <span>⚙️</span> Settings
        </Link>
        <Link href="#" className={styles.navItem}>
          <span>🗑️</span> Trash
        </Link>
      </div>
    </aside>
  );
}
