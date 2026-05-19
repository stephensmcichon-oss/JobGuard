'use client';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import { X, Edit3, Plus, Smile, Paperclip, Send, Info, User, AlertCircle, Calendar, Pause, Play, Square, Tag, Sparkles, CheckCircle, Clock } from 'lucide-react';

export default function TaskDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  
  const { tasks, startTracking, stopTracking, pauseTracking, isTracking, activeTrackingId, updateTaskStatus, currentUser } = useTaskContext();
  
  const [comment, setComment] = useState('');
  const [manualTime, setManualTime] = useState('');

  // Find the requested task
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 font-sans animate-in fade-in zoom-in duration-300">
        <AlertCircle className="w-16 h-16 text-error/80" />
        <h1 className="text-2xl font-black text-base-content font-outfit">Task Not Found</h1>
        <p className="text-base-content/60">The task you are looking for does not exist or has been deleted.</p>
        <button onClick={() => router.push('/')} className="btn btn-primary shadow-lg rounded-xl mt-4">Return to Dashboard</button>
      </div>
    );
  }

  const isCurrentTaskTracking = isTracking && activeTrackingId === task.id;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimerAction = () => {
    if (isCurrentTaskTracking) {
      pauseTracking();
    } else {
      startTracking(task.id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT':
      case 'BUG': return 'text-error bg-error/15 border-error/30';
      case 'HIGH': return 'text-warning bg-warning/15 border-warning/30';
      case 'NORMAL':
      case 'FEATURE': return 'text-info bg-info/15 border-info/30';
      case 'LOW':
      case 'REFACTOR': return 'text-success bg-success/15 border-success/30';
      default: return 'text-base-content bg-base-300 border-base-300/80';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TO DO': return 'badge-primary bg-primary/20 text-primary border-primary/30';
      case 'IN PROGRESS': return 'badge-info bg-info/20 text-info border-info/30';
      case 'REVIEW': return 'badge-warning bg-warning/20 text-warning border-warning/30';
      case 'DONE': return 'badge-success bg-success/20 text-success border-success/30';
      case 'BACKLOG': return 'badge-neutral bg-base-300 text-base-content/80 border-base-300/80';
      default: return 'badge-ghost';
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start animate-in fade-in duration-300 font-sans">
      <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-3xl p-8 flex flex-col shadow-2xl">
        {/* DaisyUI Breadcrumbs */}
        <div className="breadcrumbs text-xs font-bold text-base-content/60 uppercase tracking-widest mb-6 border-b border-base-300/80 pb-4">
          <ul>
            <li><button onClick={() => router.push('/')} className="hover:text-primary transition-colors cursor-pointer">Enterprise Workspace</button></li>
            <li><span className="opacity-70">Task Detail</span></li>
            <li className="text-primary font-black"><span>{task.id}</span></li>
          </ul>
        </div>
        
        <div className="flex justify-between items-start mb-8 gap-4">
          <h1 className="font-outfit text-4xl font-black text-base-content leading-tight tracking-tight max-w-[85%]">{task.name}</h1>
          <button onClick={() => router.back()} className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-base-content cursor-pointer shadow-sm bg-base-100/50 hover:bg-error hover:text-error-content transition-all" title="Close Task">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-10 p-6 bg-base-100/60 rounded-2xl border border-base-300/60 shadow-inner">
          <div className="flex justify-between items-center border-b border-base-300/80 pb-3 mb-4 text-xs font-extrabold text-base-content/60 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Info className="w-4 h-4 text-primary" /> Description / Documentation Content</span>
            <button className="btn btn-ghost btn-xs text-primary hover:bg-base-300 font-bold flex items-center gap-1 cursor-pointer rounded-lg"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
          </div>
          <p className="text-base leading-relaxed text-base-content/90 font-medium whitespace-pre-wrap">
            {task.description || "No description provided for this task."}
          </p>
        </div>

        <div className="mb-10 p-6 bg-base-100/60 rounded-2xl border border-base-300/60 shadow-inner">
          <div className="flex justify-between items-center border-b border-base-300/80 pb-3 mb-6 text-xs font-extrabold text-base-content/60 uppercase tracking-widest">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Subtasks / Action Items (0)</span>
            <span className="badge badge-primary font-black tracking-widest shadow-sm py-1.5 px-2.5 bg-primary/20 text-primary border border-primary/30 rounded-xl">0% COMPLETE</span>
          </div>
          <div className="flex flex-col gap-3.5 mb-6 text-center py-6 text-base-content/50 text-sm font-medium border border-dashed border-base-300 rounded-xl">
            No subtasks have been added to this task yet.
          </div>
          <button className="btn btn-outline btn-sm border-base-300 hover:border-primary text-base-content hover:text-primary font-bold flex items-center gap-1.5 cursor-pointer self-start rounded-xl shadow-sm transition-colors">
            <Plus className="w-4 h-4 stroke-[3]" /> Add a subtask
          </button>
        </div>

        <div className="flex items-center bg-base-100/90 border border-base-300 rounded-2xl px-4 py-2.5 gap-3 focus-within:border-primary/60 transition-colors shadow-md">
          <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content"><Smile className="w-4 h-4" /></button>
          <input 
            type="text" 
            placeholder="Write a comment or AI prompt..." 
            className="input w-full bg-transparent border-none text-sm text-base-content focus:outline-none px-1 h-10 font-medium" 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content"><Paperclip className="w-4 h-4" /></button>
          <button 
            className="btn btn-primary btn-sm btn-circle shadow-lg shadow-primary/30 cursor-pointer hover:scale-105 active:scale-95 transition-transform w-10 h-10 flex items-center justify-center"
            disabled={!comment.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Status Summary Card */}
        <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><Info className="w-4 h-4 text-primary" /> Status</span>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className={`badge font-black tracking-widest shadow-sm py-3 px-3 cursor-pointer hover:scale-105 transition-transform rounded-xl ${getStatusColor(task.status)}`}>
                {task.status} <Edit3 className="w-3 h-3 ml-1.5 opacity-60" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-2xl w-48 z-[1] border border-base-300 gap-1 mt-2">
                {['TO DO', 'IN PROGRESS', 'REVIEW', 'DONE', 'BACKLOG'].map(s => (
                  <li key={s}>
                    <button 
                      onClick={() => updateTaskStatus(task.id, s)}
                      className={`text-xs font-bold rounded-xl ${task.status === s ? 'active bg-primary/10 text-primary' : ''}`}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><User className="w-4 h-4 text-primary" /> Assignee</span>
            <span className="font-bold text-sm text-base-content flex items-center gap-2.5">
              {task.assignee}
              <div className="w-7 h-7 bg-primary rounded-xl shadow-sm shadow-primary/30 flex items-center justify-center text-[10px] font-black text-primary-content">
                {task.assigneeInitials || 'EMP'}
              </div>
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><AlertCircle className="w-4 h-4 text-primary" /> Priority</span>
            <span className={`font-black text-xs flex items-center gap-1 px-3 py-1 rounded-xl border shadow-sm ${getPriorityColor(task.priority)}`}>
              {task.priority === 'URGENT' || task.priority === 'BUG' ? '🚨' : '📌'} {task.priority}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><Calendar className="w-4 h-4 text-primary" /> Due Date</span>
            <span className="font-bold text-sm text-base-content">{task.dueDate}</span>
          </div>
        </div>

        {/* Breathtaking Live Tracking Panel */}
        <div className={`card ${isCurrentTaskTracking ? 'bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-content shadow-[0_20px_50px_rgba(16,185,129,0.3)]' : 'bg-base-200/90 text-base-content border border-base-300 shadow-2xl'} rounded-3xl p-8 flex flex-col relative overflow-hidden transition-all duration-500`}>
          {isCurrentTaskTracking && (
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
          )}
          
          <div className={`flex justify-between items-center mb-8 border-b pb-4 ${isCurrentTaskTracking ? 'border-white/10' : 'border-base-300'}`}>
            <span className={`text-xs uppercase tracking-widest font-black flex items-center gap-2 ${isCurrentTaskTracking ? 'opacity-90' : 'text-base-content/60'}`}>
              {isCurrentTaskTracking ? <Sparkles className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />} 
              {isCurrentTaskTracking ? 'Live Time Tracking' : 'Time Tracker'}
            </span>
            <span className={`badge font-black tracking-widest py-1.5 px-3 rounded-xl shadow-sm ${isCurrentTaskTracking ? 'badge-ghost bg-white/20 border-white/30 text-white animate-pulse' : 'badge-neutral bg-base-300 text-base-content/80'}`}>
              {isCurrentTaskTracking ? 'IN PROGRESS' : 'PAUSED'}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-10">
            <span className="font-outfit text-5xl font-black font-mono tracking-tight drop-shadow-md">
              {formatTime(task.timeLogged)}
            </span>
            <div className="flex gap-2">
              {isCurrentTaskTracking && (
                <button 
                  onClick={stopTracking}
                  className="btn btn-circle bg-error text-error-content border-none hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer w-14 h-14 flex items-center justify-center"
                  title="Stop and Reset"
                >
                  <Square className="w-5 h-5 fill-current" />
                </button>
              )}
              <button 
                onClick={handleTimerAction}
                className={`btn btn-circle ${isCurrentTaskTracking ? 'bg-base-100 text-base-content' : 'bg-primary text-primary-content'} border-none hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer w-14 h-14 flex items-center justify-center`}
                title={isCurrentTaskTracking ? "Pause Tracking" : "Start Tracking"}
              >
                {isCurrentTaskTracking ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
            </div>
          </div>

          <div className={`card ${isCurrentTaskTracking ? 'bg-base-100 text-base-content border-none shadow-2xl' : 'bg-base-100/50 text-base-content border border-base-300 shadow-inner'} rounded-2xl p-6 flex flex-col gap-6 transition-colors duration-300`}>
            <div>
              <div className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest mb-2.5">Manual Entry</div>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="e.g. 1h 30m" 
                  value={manualTime}
                  onChange={(e) => setManualTime(e.target.value)}
                  className="input input-bordered w-full bg-base-200/80 text-sm focus:border-primary text-base-content h-12 rounded-xl shadow-inner font-medium" 
                />
                <button className="btn btn-primary h-12 px-6 font-bold shadow-lg shadow-primary/20 cursor-pointer rounded-xl">LOG</button>
              </div>
            </div>

            <div>
              <div className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest mb-4">Team Contribution</div>
              <div className="flex flex-col gap-3.5">
                <div className="flex justify-between items-center text-sm font-medium p-2.5 bg-base-200/50 rounded-xl border border-base-300/60">
                  <div className="flex items-center gap-3 font-bold text-base-content">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-black shadow-sm text-primary">
                      {task.assigneeInitials || 'EMP'}
                    </div>
                    {task.assignee}
                  </div>
                  <div className="font-black text-base-content font-mono">{formatTime(task.timeLogged)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Labels Card */}
        <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-3xl p-6 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-5 border-b border-base-300/80 pb-3">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><Tag className="w-4 h-4 text-primary" /> Labels</span>
            <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content cursor-pointer shadow-sm bg-base-100/50"><Plus className="w-4 h-4 stroke-[3]" /></button>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <span className="badge badge-neutral font-black tracking-widest py-3 px-3.5 bg-base-300 border-base-300/80 text-base-content shadow-sm rounded-xl text-[10px]">
              {task.id.split('-')[0]}
            </span>
            <span className="badge badge-neutral font-black tracking-widest py-3 px-3.5 bg-base-300 border-base-300/80 text-base-content shadow-sm rounded-xl text-[10px]">
              {task.priority}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
