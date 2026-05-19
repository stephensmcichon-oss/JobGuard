'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import NewTaskModal from '@/components/NewTaskModal';
import SearchModal from '@/components/SearchModal';

export default function ClientLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative bg-gradient-to-br from-base-100 via-base-200/40 to-base-200 transition-colors duration-300">
        <Header />
        <main className="flex-1 overflow-y-auto relative transition-all duration-300">
          {children}
        </main>
      </div>
      <NewTaskModal />
      <SearchModal />
    </>
  );
}
