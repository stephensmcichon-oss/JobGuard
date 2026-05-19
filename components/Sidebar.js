'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import { Home, Kanban, BarChart2, FileText, BookOpen, Database, Lock, Server, Zap, Cpu, Sparkles, Code, Settings, Plus, ChevronDown, ChevronRight, Compass, ShieldCheck, ZapIcon, Users, CheckSquare, Clock } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { openNewTaskModal, currentUser } = useTaskContext();

  const [collapsedSections, setCollapsedSections] = useState({
    products: false,
    modules: false,
    clientLibs: false,
    migration: false,
  });

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
            <span className="text-[10px] font-bold text-base-content/60 mt-1">
              {isAdmin ? 'GLOBAL DISPATCH' : 'TASK EXECUTION'}
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
          <Plus className="w-4 h-4 stroke-[3]" /> {isAdmin ? 'Assign New Task' : 'Log Personal Task'}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-6 px-2 pt-5 overflow-y-auto pb-6 bg-base-200/40">
        <div>
          <div className="menu-title text-[10px] font-extrabold uppercase tracking-widest text-base-content/50 px-4 mb-2 flex items-center justify-between">
            <span>{isAdmin ? 'Admin Management' : 'My Workspace'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <Link href="/" className={getLinkClass('/')}>
              <Home className="w-4 h-4" /> {isAdmin ? 'Admin Control Center' : 'My Assigned Tasks'}
            </Link>
            <Link href="/board" className={getLinkClass('/board')}>
              <Kanban className="w-4 h-4" /> {isAdmin ? 'Global Kanban Board' : 'My Kanban Board'}
            </Link>
            <Link href="/dashboard" className={getLinkClass('/dashboard')}>
              <BarChart2 className="w-4 h-4" /> {isAdmin ? 'Team Analytics Overview' : 'My Time Stats'}
            </Link>
            <Link href="/docs" className={getLinkClass('/docs')}>
              <FileText className="w-4 h-4" /> Supabase Docs
            </Link>
          </div>
        </div>

        {isAdmin && (
          <div>
            <div className="menu-title text-[10px] font-extrabold uppercase tracking-widest text-base-content/50 px-4 mb-2 flex items-center justify-between">
              <span>Team Directory</span>
            </div>
            <div className="flex flex-col gap-1 pl-2 pr-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-base-100/50 border border-base-300 text-xs font-semibold mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success"></span> Employee (EMP)
                </span>
                <span className="badge badge-sm badge-ghost font-mono">Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-base-100/50 border border-base-300 text-xs font-semibold mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success"></span> Alex R. (AR)
                </span>
                <span className="badge badge-sm badge-ghost font-mono">Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-base-100/50 border border-base-300 text-xs font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-warning"></span> Sarah J. (SJ)
                </span>
                <span className="badge badge-sm badge-ghost font-mono">Busy</span>
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="menu-title text-[10px] font-extrabold uppercase tracking-widest text-base-content/50 px-4 mb-2 flex items-center justify-between">
            <span>Getting Started</span>
          </div>
          <div className="flex flex-col gap-1">
            <Link href="/docs" className={getLinkClass('/docs#getting-started')}>
              <Compass className="w-4 h-4" /> Overview & Start
            </Link>
            <Link href="/docs" className={getLinkClass('/docs#ai-prompts')}>
              <BookOpen className="w-4 h-4" /> AI Prompts
            </Link>
          </div>
        </div>

        <div>
          <button 
            onClick={() => toggleSection('products')} 
            className="w-full menu-title text-[10px] font-extrabold uppercase tracking-widest text-base-content/50 px-4 mb-2 flex items-center justify-between hover:text-base-content transition-colors cursor-pointer group"
          >
            <span>Products</span>
            {collapsedSections.products ? <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /> : <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />}
          </button>
          {!collapsedSections.products && (
            <div className="flex flex-col gap-1 pl-1 animate-in fade-in duration-200">
              <Link href="/docs" className={getLinkClass('/docs#database')}>
                <Database className="w-4 h-4" /> Database
              </Link>
              <Link href="/docs" className={getLinkClass('/docs#auth')}>
                <Lock className="w-4 h-4" /> Auth
              </Link>
              <Link href="/docs" className={getLinkClass('/docs#storage')}>
                <Server className="w-4 h-4" /> Storage
              </Link>
              <Link href="/docs" className={getLinkClass('/docs#realtime')}>
                <Zap className="w-4 h-4" /> Realtime
              </Link>
              <Link href="/docs" className={getLinkClass('/docs#functions')}>
                <Cpu className="w-4 h-4" /> Edge Functions
              </Link>
            </div>
          )}
        </div>

        <div>
          <button 
            onClick={() => toggleSection('modules')} 
            className="w-full menu-title text-[10px] font-extrabold uppercase tracking-widest text-base-content/50 px-4 mb-2 flex items-center justify-between hover:text-base-content transition-colors cursor-pointer group"
          >
            <span>Modules</span>
            {collapsedSections.modules ? <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /> : <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />}
          </button>
          {!collapsedSections.modules && (
            <div className="flex flex-col gap-1 pl-1 animate-in fade-in duration-200">
              <Link href="/docs" className={getLinkClass('/docs#ai-vectors')}>
                <Sparkles className="w-4 h-4" /> AI & Vectors
              </Link>
              <Link href="/docs" className={getLinkClass('/docs#cron')}>
                <Code className="w-4 h-4" /> Cron Jobs
              </Link>
              <Link href="/docs" className={getLinkClass('/docs#queues')}>
                <Server className="w-4 h-4" /> Queues
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Professional Upgrade Card */}
      <div className="p-4 bg-base-200/80 border-t border-base-300/80 flex flex-col gap-3 backdrop-blur-md">
        <div className="card bg-gradient-to-br from-primary/10 via-base-100 to-accent/5 border border-primary/20 rounded-2xl p-4 flex flex-col gap-2.5 shadow-lg shadow-primary/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-base-content">
              <ZapIcon className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" /> Professional Plan
            </div>
            <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">82% Used</span>
          </div>
          <p className="text-[11px] text-base-content/60 leading-snug">You have 18 active projects remaining in your current enterprise billing tier.</p>
          <progress className="progress progress-primary w-full h-1.5 shadow-sm" value="82" max="100"></progress>
          <Link href="/docs" className="text-[11px] font-bold text-primary hover:underline self-end mt-0.5 cursor-pointer flex items-center gap-1">
            Upgrade Tier ↗
          </Link>
        </div>

        <Link href="/docs" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-base-content/70 hover:bg-base-300 hover:text-base-content transition-all cursor-pointer mt-1">
          <Settings className="w-4 h-4" /> Project Settings
        </Link>
      </div>
    </aside>
  );
}
