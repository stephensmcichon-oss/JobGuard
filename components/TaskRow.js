'use client';
import { useRouter } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import Badge from '@/components/Badge';
import { Play, Square, Pause, MoreHorizontal, Clock, CheckCircle, FileText, Sparkles } from 'lucide-react';

export default function TaskRow({ task, activeTracking }) {
  const router = useRouter();
  const { startTracking, stopTracking, pauseTracking, updateTaskStatus } = useTaskContext();

  const handleRowClick = (e) => {
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.dropdown')) {
      return; 
    }
    router.push(`/task/${task.id}`);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const handleCheckboxChange = (e) => {
    const newStatus = e.target.checked ? 'DONE' : 'TO DO';
    updateTaskStatus(task.id, newStatus);
  };

  return (
    <div 
      onClick={handleRowClick}
      className={`grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-4 bg-base-100/90 border rounded-2xl items-center text-sm shadow-sm hover:shadow-xl hover:bg-base-100 hover:-translate-y-0.5 transition-all duration-300 mb-3 group cursor-pointer ${activeTracking ? 'border-info/80 shadow-info/20 ring-2 ring-info/20' : 'border-base-300/80 hover:border-primary/50'}`}
    >
      <div className="flex items-center gap-4">
        <input 
          type="checkbox" 
          checked={task.status === 'DONE' || task.status === 'REVIEW'} 
          onChange={handleCheckboxChange} 
          className="checkbox checkbox-primary checkbox-sm rounded-lg shadow-sm" 
        />
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0 transition-transform group-hover:scale-110 ${task.status === 'DONE' ? 'bg-success/10 text-success border border-success/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
            {task.status === 'DONE' ? <CheckCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className={`font-bold text-base-content truncate group-hover:text-primary transition-colors ${task.status === 'DONE' ? 'line-through text-base-content/50' : ''}`}>
              {task.name}
            </span>
            <span className="text-xs text-base-content/60 truncate max-w-md">
              {task.description}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 font-semibold text-base-content/80">
        <div className="w-6 h-6 rounded-full bg-base-300 flex items-center justify-center text-[10px] font-bold text-base-content shadow-sm">
          {task.assigneeInitials}
        </div>
        <span className="truncate">{task.assignee}</span>
      </div>

      <div className="text-xs font-semibold text-base-content/70 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-base-content/40 group-hover:text-primary transition-colors" />
        {task.dueDate}
      </div>

      <div>
        <Badge text={task.priority} type={task.priority === 'URGENT' ? 'urgent' : task.priority === 'HIGH' ? 'high' : 'normal'} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono font-extrabold text-xs text-base-content bg-base-200/80 px-2.5 py-1 rounded-lg border border-base-300 shadow-inner">
          {formatTime(task.timeLogged)}
        </span>
        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          {activeTracking ? (
            <>
              <button 
                onClick={stopTracking} 
                className="btn btn-error btn-circle btn-xs shadow-md hover:scale-110 transition-transform cursor-pointer" 
                title="Stop Timer"
              >
                <Square className="w-3 h-3 fill-current" />
              </button>
              <button 
                onClick={pauseTracking} 
                className="btn btn-warning btn-circle btn-xs shadow-md hover:scale-110 transition-transform cursor-pointer" 
                title="Pause Timer"
              >
                <Pause className="w-3 h-3 fill-current" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => startTracking(task.id)} 
              className="btn btn-primary btn-circle btn-xs shadow-md hover:scale-110 transition-transform cursor-pointer" 
              title="Start Timer"
            >
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </button>
          )}

          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle btn-xs text-base-content/60 hover:text-base-content cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-200/95 backdrop-blur-xl rounded-2xl w-48 z-50 border border-base-300/80 gap-1 mt-2">
              <li className="menu-title px-3 py-1 text-[10px] font-extrabold text-base-content/50 uppercase tracking-wider">Quick Actions</li>
              <li><button onClick={() => updateTaskStatus(task.id, 'TO DO')} className="text-xs font-semibold hover:bg-base-300/60 py-2">Move to To Do</button></li>
              <li><button onClick={() => updateTaskStatus(task.id, 'IN PROGRESS')} className="text-xs font-semibold hover:bg-base-300/60 py-2">Move to In Progress</button></li>
              <li><button onClick={() => updateTaskStatus(task.id, 'REVIEW')} className="text-xs font-semibold hover:bg-base-300/60 py-2">Move to Review / Done</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
