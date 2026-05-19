'use client';
import { useRouter } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import { CheckCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export default function TaskRow({ task }) {
  const router = useRouter();
  const { updateTaskStatus, currentUser } = useTaskContext();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT': return 'text-error bg-error/15 border-error/30';
      case 'HIGH': return 'text-warning bg-warning/15 border-warning/30';
      case 'NORMAL': return 'text-info bg-info/15 border-info/30';
      case 'LOW': return 'text-success bg-success/15 border-success/30';
      default: return 'text-base-content bg-base-300 border-base-300/80';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TO DO': return 'text-primary bg-primary/20 border-primary/30';
      case 'IN PROGRESS': return 'text-info bg-info/20 border-info/30';
      case 'REVIEW': return 'text-warning bg-warning/20 border-warning/30';
      case 'DONE': return 'text-success bg-success/20 border-success/30';
      case 'BACKLOG': return 'text-base-content/80 bg-base-300 border-base-300/80';
      default: return 'text-base-content/50 bg-transparent border-transparent';
    }
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div 
      className={`group relative grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] items-center px-5 py-4 bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-lg rounded-2xl cursor-pointer transition-all duration-300`}
      onClick={() => router.push(`/task/${task.id}`)}
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
          {task.status === 'DONE' ? <CheckCircle className="w-5 h-5 text-success" /> : <FileText className="w-4 h-4" />}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm text-base-content group-hover:text-primary transition-colors line-clamp-1">{task.name}</span>
          <span className="text-xs text-base-content/50 font-medium">
            {task.id} • {task.status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 font-bold text-xs text-base-content">
        <div className="w-7 h-7 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary shadow-sm">
          {task.assigneeInitials || 'EMP'}
        </div>
        <span className="truncate max-w-[120px]">{task.assignee}</span>
      </div>

      <div className="text-xs font-bold text-base-content/80">
        {task.dueDate || 'No Date'}
      </div>

      <div className="flex items-center justify-between">
        <div className={`px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase border shadow-sm flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
          {task.priority === 'URGENT' ? '🚨 ' : ''}{task.priority}
        </div>
        <ArrowRight className="w-4 h-4 text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  );
}
