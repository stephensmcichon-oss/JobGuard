'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import { X, Edit3, MessageSquare, Paperclip, Send, Info, User, AlertCircle, Calendar, Tag, CheckCircle } from 'lucide-react';

export default function TaskDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  
  const { tasks, updateTaskStatus, currentUser } = useTaskContext();
  
  const [comment, setComment] = useState('');
  const [taskComments, setTaskComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Find the requested task
  const task = tasks.find(t => t.id === id);

  useEffect(() => {
    // Load local comments for demo
    if (id) {
      const saved = localStorage.getItem(`comments_${id}`);
      if (saved) setTaskComments(JSON.parse(saved));
    }
  }, [id]);

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

  const isAdmin = currentUser?.role === 'admin';
  const isAssignee = task.assigneeInitials === (currentUser?.initials || 'EMP');
  const canEdit = isAdmin || isAssignee;

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      text: comment,
      author: currentUser?.name || 'Employee',
      initials: currentUser?.initials || 'EMP',
      date: new Date().toLocaleString()
    };
    const updated = [...taskComments, newComment];
    setTaskComments(updated);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
    setComment('');
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
        <div className="breadcrumbs text-xs font-bold text-base-content/60 uppercase tracking-widest mb-6 border-b border-base-300/80 pb-4">
          <ul>
            <li><button onClick={() => router.push('/')} className="hover:text-primary transition-colors cursor-pointer">Workspace</button></li>
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
            <span className="flex items-center gap-2"><Info className="w-4 h-4 text-primary" /> Description</span>
            {canEdit && (
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className="btn btn-ghost btn-xs text-primary hover:bg-base-300 font-bold flex items-center gap-1 cursor-pointer rounded-lg"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            )}
          </div>
          {isEditing ? (
            <textarea 
              className="textarea textarea-bordered w-full h-32" 
              defaultValue={task.description}
              placeholder="Task description..."
            />
          ) : (
            <p className="text-base leading-relaxed text-base-content/90 font-medium whitespace-pre-wrap">
              {task.description || "No description provided for this task."}
            </p>
          )}
        </div>

        {/* Comments Section */}
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Comments & Activity</h3>
          
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto mb-4 p-2">
            {taskComments.length === 0 ? (
              <div className="text-center py-6 text-base-content/50 text-sm font-medium border border-dashed border-base-300 rounded-xl">
                No comments yet. Start the conversation!
              </div>
            ) : (
              taskComments.map(c => (
                <div key={c.id} className="flex gap-3 bg-base-100/80 p-4 rounded-xl border border-base-300 shadow-sm animate-in fade-in duration-200">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                    {c.initials}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-base-content">{c.author}</span>
                      <span className="text-[10px] text-base-content/50 font-medium">{c.date}</span>
                    </div>
                    <p className="text-sm text-base-content/80">{c.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center bg-base-100/90 border border-base-300 rounded-2xl px-4 py-2.5 gap-3 focus-within:border-primary/60 transition-colors shadow-md">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="input w-full bg-transparent border-none text-sm text-base-content focus:outline-none px-1 h-10 font-medium" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content"><Paperclip className="w-4 h-4" /></button>
            <button 
              className="btn btn-primary btn-sm btn-circle shadow-lg shadow-primary/30 cursor-pointer hover:scale-105 active:scale-95 transition-transform w-10 h-10 flex items-center justify-center"
              disabled={!comment.trim()}
              onClick={handleAddComment}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
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
              {task.priority}
            </span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><Calendar className="w-4 h-4 text-primary" /> Due Date</span>
            <span className="font-bold text-sm text-base-content">{task.dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
