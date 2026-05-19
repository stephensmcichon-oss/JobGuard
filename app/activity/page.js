'use client';
import { MessageSquare, Bell } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';

export default function ActivityFeed() {
  const { tasks } = useTaskContext();

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in duration-300 font-sans">
      <div className={`card bg-gradient-to-r from-base-200 via-secondary/10 to-base-200 border-secondary/30 border p-8 shadow-2xl rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden backdrop-blur-2xl`}>
        <div className={`absolute -top-12 -right-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none`}></div>
        <div className="flex flex-col gap-2">
          <h1 className="font-outfit text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-secondary" /> Global Activity
          </h1>
          <p className="text-base-content/70 text-base max-w-xl leading-relaxed font-medium">
            Recent comments, status changes, and task updates across the workspace.
          </p>
        </div>
      </div>

      <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-3xl p-6 flex flex-col shadow-2xl min-h-[400px] justify-center items-center gap-4 text-center">
        <Bell className="w-12 h-12 text-base-content/20" />
        <h3 className="text-xl font-bold text-base-content/70">No Recent Activity</h3>
        <p className="text-sm text-base-content/50 max-w-md">
          When team members add comments or update statuses on tasks, they will appear here in the global feed. Currently, all task-level comments are visible directly within the individual task pages.
        </p>
      </div>
    </div>
  );
}
