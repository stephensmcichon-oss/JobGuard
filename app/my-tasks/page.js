'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskRow from '@/components/TaskRow';
import { ChevronDown, ChevronRight, CheckSquare } from 'lucide-react';

export default function MyTasks() {
  const { tasks, currentUser } = useTaskContext();

  const [collapsedSections, setCollapsedSections] = useState({
    TODO: false,
    IN_PROGRESS: false,
    REVIEW: false
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter tasks to only those assigned to the current user
  let filteredTasks = tasks.filter(task => {
    const myInitials = currentUser?.initials || 'EMP';
    const myEmailName = currentUser?.username?.split('@')[0] || 'employee';
    return task.assigneeInitials === myInitials || 
           task.assigneeInitials === 'EMP' || 
           task.assignee.toLowerCase().includes('employee') ||
           task.assignee.toLowerCase().includes(myEmailName);
  });

  const tasksToDo = filteredTasks.filter(t => t.status === 'TO DO' || t.status === 'BACKLOG');
  const tasksInProgress = filteredTasks.filter(t => t.status === 'IN PROGRESS');
  const tasksReview = filteredTasks.filter(t => t.status === 'REVIEW' || t.status === 'DONE');

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in duration-300 font-sans">
      <div className={`card bg-gradient-to-r from-base-200 via-primary/10 to-base-200 border-primary/30 border p-8 shadow-2xl rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden backdrop-blur-2xl`}>
        <div className={`absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none`}></div>
        <div className="flex flex-col gap-2">
          <h1 className="font-outfit text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-primary" /> My Tasks 
            <span className={`badge badge-primary badge-lg font-extrabold shadow-sm`}>{filteredTasks.length} total</span>
          </h1>
          <p className="text-base-content/70 text-base max-w-xl leading-relaxed font-medium">
            These are the tasks currently assigned specifically to you.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 animate-in fade-in duration-200 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] px-5 py-3.5 bg-base-200/60 border border-base-300 rounded-2xl text-[11px] font-extrabold text-base-content/60 uppercase tracking-widest shadow-sm backdrop-blur-md">
          <div>TASK NAME</div>
          <div>ASSIGNEE</div>
          <div>DUE DATE</div>
          <div>PRIORITY</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 py-1 cursor-pointer select-none group" onClick={() => toggleSection('TODO')}>
            {collapsedSections.TODO ? <ChevronRight className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" /> : <ChevronDown className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" />}
            <span className="badge badge-primary font-black tracking-widest uppercase shadow-sm py-2.5 px-3 bg-primary/20 text-primary border border-primary/30 rounded-xl">TO DO / BACKLOG</span>
            <span className="text-xs font-bold text-base-content/60">{tasksToDo.length} Tasks</span>
          </div>
          {!collapsedSections.TODO && (
            <div className="flex flex-col gap-2">
              {tasksToDo.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 py-1 cursor-pointer select-none group" onClick={() => toggleSection('IN_PROGRESS')}>
            {collapsedSections.IN_PROGRESS ? <ChevronRight className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" /> : <ChevronDown className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" />}
            <span className="badge badge-info font-black tracking-widest uppercase shadow-sm py-2.5 px-3 bg-info/20 text-info border border-info/30 rounded-xl">IN PROGRESS</span>
            <span className="text-xs font-bold text-base-content/60">{tasksInProgress.length} Tasks</span>
          </div>
          {!collapsedSections.IN_PROGRESS && (
            <div className="flex flex-col gap-2">
              {tasksInProgress.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 py-1 cursor-pointer select-none group" onClick={() => toggleSection('REVIEW')}>
            {collapsedSections.REVIEW ? <ChevronRight className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" /> : <ChevronDown className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" />}
            <span className="badge badge-neutral font-black tracking-widest uppercase shadow-sm py-2.5 px-3 bg-base-300 text-base-content/80 border border-base-300/80 rounded-xl">DONE</span>
            <span className="text-xs font-bold text-base-content/60">{tasksReview.length} Tasks</span>
          </div>
          {!collapsedSections.REVIEW && (
            <div className="flex flex-col gap-2 opacity-75 hover:opacity-100 transition-opacity duration-300">
              {tasksReview.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
