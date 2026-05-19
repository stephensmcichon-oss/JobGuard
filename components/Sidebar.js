'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import { List, CheckSquare, MessageSquare, Users, Plus } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { openNewTaskModal, currentUser } = useTaskContext();

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 px-3.5 py-2.5 rounded-r-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-l-4 border-primary text-primary font-black shadow-sm'
        : 'text-base-content/70 hover:bg-base-300/60 hover:text-base-content border-l-4 border-transparent'
    }`;
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <aside className="w-[260px] h-screen border-r border-base-300/80 flex flex-col bg-base-200/90 backdrop-blur-2xl flex-shrink-0 transition-all duration-300 select-none shadow-[10px_0_30px_rgba(0,0,0,0.1)] z-30 font-sans">
      <div className="h-20 flex items-center justify-between px-6 border-b border-base-300/80 bg-base-100/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-content font-black text-xs shadow-md shadow-primary/20">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-black text-sm tracking-tight text-base-content leading-none">
              {isAdmin ? 'Admin Studio' : 'Employee Portal'}
            </span>
          </div>
        </div>
        <span className={`badge badge-xs uppercase font-extrabold tracking-widest shadow-sm py-2 px-2 ${isAdmin ? 'badge-error bg-error/20 text-error border-error/30' : 'badge-info bg-info/20 text-info border-info/30'}`}>
          {isAdmin ? 'ADMIN' : 'EMP'}
        </span>
      </div>

      <div className="p-4 bg-base-200/40 border-b border-base-300/60">
        <button 
          className="btn btn-primary btn-sm h-10 w-full rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer" 
          onClick={() => openNewTaskModal(isAdmin ? 'TO DO' : 'IN PROGRESS')}
        >
          <Plus className="w-4 h-4 stroke-[3]" /> {isAdmin ? 'Create Task' : 'Log Task'}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-6 px-2 pt-5 overflow-y-auto pb-6 bg-base-200/40">
        <div>
          <div className="menu-title text-[10px] font-extrabold uppercase tracking-widest text-base-content/50 px-4 mb-2 flex items-center justify-between">
            <span>Workspace</span>
          </div>
          <div className="flex flex-col gap-1">
            <Link href="/" className={getLinkClass('/')}>
              <List className="w-4 h-4" /> Tasks
            </Link>
            <Link href="/my-tasks" className={getLinkClass('/my-tasks')}>
              <CheckSquare className="w-4 h-4" /> My Tasks
            </Link>
            <Link href="/activity" className={getLinkClass('/activity')}>
              <MessageSquare className="w-4 h-4" /> Comments / Activity
            </Link>
            
            {isAdmin && (
              <Link href="/team" className={getLinkClass('/team')}>
                <Users className="w-4 h-4" /> Team Management
              </Link>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
