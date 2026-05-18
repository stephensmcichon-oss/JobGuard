'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import NewTaskModal from '@/components/NewTaskModal';

export default function ClientLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
          {children}
        </main>
      </div>
      <NewTaskModal />
    </>
  );
}
