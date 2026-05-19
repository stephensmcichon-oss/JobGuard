'use client';
import { useRouter } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import Badge from '@/components/Badge';
import { Play, Square, Pause, Clock, CheckCircle, FileText, Sparkles } from 'lucide-react';

export default function TaskCard({ task }) {
  const router = useRouter();
  const { activeTrackingId, isTracking, startTracking, stopTracking, pauseTracking } = useTaskContext();

  const isActive = activeTrackingId === task.id && isTracking;

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    router.push(`/task/${task.id}`);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`card bg-base-100 border p-5 shadow-sm hover:shadow-2xl hover:bg-base-100 hover:-translate-y-1 transition-all duration-300 rounded-2xl cursor-pointer group ${isActive ? 'border-info/80 shadow-info/20 ring-2 ring-info/20' : 'border-base-300/80 hover:border-primary/50'}`}
    >
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm transition-transform group-hover:scale-110 ${task.status === 'DONE' ? 'bg-success/10 text-success border border-success/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
            {task.status === 'DONE' ? <CheckCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          </div>
          <span className={`font-bold text-sm text-base-content leading-snug group-hover:text-primary transition-colors line-clamp-2 ${task.status === 'DONE' ? 'line-through text-base-content/50' : ''}`}>
            {task.name}
          </span>
        </div>

        <div className="flex-shrink-0">
          <Badge text={task.priority} type={task.priority === 'URGENT' ? 'urgent' : task.priority === 'HIGH' ? 'high' : 'normal'} />
        </div>
      </div>

      <p className="text-xs text-base-content/60 line-clamp-2 mb-4 font-medium leading-relaxed">
        {task.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-base-300/60 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-base-300 flex items-center justify-center text-[10px] font-bold text-base-content shadow-sm">
            {task.assigneeInitials}
          </div>
          <span className="text-xs font-semibold text-base-content/70 truncate max-w-[90px]">{task.assignee}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono font-extrabold text-[11px] text-base-content bg-base-200/80 px-2 py-0.5 rounded-lg border border-base-300 shadow-inner">
            {formatTime(task.timeLogged)}
          </span>

          <div className="opacity-80 group-hover:opacity-100 transition-opacity">
            {isActive ? (
              <div className="flex items-center gap-1">
                <button 
                  onClick={stopTracking} 
                  className="btn btn-error btn-circle btn-xs shadow-md hover:scale-110 transition-transform cursor-pointer" 
                  title="Stop Timer"
                >
                  <Square className="w-2.5 h-2.5 fill-current" />
                </button>
                <button 
                  onClick={pauseTracking} 
                  className="btn btn-warning btn-circle btn-xs shadow-md hover:scale-110 transition-transform cursor-pointer" 
                  title="Pause Timer"
                >
                  <Pause className="w-2.5 h-2.5 fill-current" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => startTracking(task.id)} 
                className="btn btn-primary btn-circle btn-xs shadow-md hover:scale-110 transition-transform cursor-pointer" 
                title="Start Timer"
              >
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
