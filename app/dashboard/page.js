'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import Badge from '@/components/Badge';
import { Timer, Download, CheckCircle, Calendar, Clock, RefreshCw, FileText, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { tasks, selectedProject, setSelectedProject, openNewTaskModal } = useTaskContext();
  const [hoveredDay, setHoveredDay] = useState(null);

  const totalSeconds = tasks.reduce((acc, t) => acc + t.timeLogged, 0);
  const totalHours = (totalSeconds / 3600).toFixed(1);
  
  const completedTasks = tasks.filter(t => t.status === 'DONE' || t.status === 'REVIEW').length;
  const upcomingDeadlines = tasks.filter(t => t.priority === 'URGENT' || t.priority === 'HIGH').length;

  const chartData = [
    { day: 'Mon', prod: 40, deep: 20, label: '4h Productive, 2h Deep Work' },
    { day: 'Tue', prod: 60, deep: 30, label: '6h Productive, 3h Deep Work' },
    { day: 'Wed', prod: 30, deep: 20, label: '3h Productive, 2h Deep Work' },
    { day: 'Thu', prod: 80, deep: 40, label: '8h Productive, 4h Deep Work' },
    { day: 'Fri', prod: 70, deep: 10, label: '7h Productive, 1h Deep Work' },
    { day: 'Sat', prod: 15, deep: 0, label: '1.5h Productive' },
    { day: 'Sun', prod: 10, deep: 0, label: '1h Productive' },
  ];

  const activities = [
    { id: 1, type: 'time', text: 'You logged 2h 15m on "API Auth refactoring"', project: 'Core Infrastructure', meta: '24 mins ago', badge: 'PRODUCTIVE', badgeType: 'productive' },
    { id: 2, type: 'status', text: 'Status Change: "Mobile Redesign" moved to Review', project: 'User Feedback', meta: '2 hours ago', badge: null },
    { id: 3, type: 'time', text: 'You logged 45m on "Internal Admin Sprint Planning"', project: 'Ops/Admin', meta: '5 hours ago', badge: 'DEEP WORK', badgeType: 'deep work' },
    { id: 4, type: 'task', text: 'New Task Created: "Refactor Data Grid Engine"', project: 'Core Infrastructure', meta: '1 day ago', badge: 'NEW', badgeType: 'normal' },
    { id: 5, type: 'status', text: 'Status Change: "Design System Documentation" moved to In Progress', project: 'User Feedback', meta: '2 days ago', badge: null }
  ];

  const filteredActivities = selectedProject === 'ALL' ? activities : activities.filter(a => a.project === selectedProject);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "taskflow_pro_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in duration-300 font-sans">
      <div className="flex flex-col gap-4 border-b border-base-300 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-base-content/60 uppercase tracking-wider">
          <span>Enterprise Workspace</span>
          <span>/</span>
          <span className="text-primary font-extrabold">Analytics & Dashboard</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-outfit text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
              Analytics & Dashboard <span className="badge badge-primary badge-lg font-extrabold shadow-sm py-1.5 px-3 bg-primary/20 text-primary border border-primary/30">Live</span>
            </h1>
            <p className="text-base-content/70 text-base font-medium">Welcome back. You have <span className="font-bold text-primary">{upcomingDeadlines}</span> deadlines approaching in the next 48 hours.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => openNewTaskModal('IN PROGRESS')} 
              className="btn btn-primary btn-sm h-11 px-5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Timer className="w-4 h-4" /> Log Time / Doc
            </button>
            <button 
              onClick={handleExport} 
              className="btn btn-outline btn-sm h-11 px-5 rounded-xl font-bold border-base-300 shadow-sm hover:bg-base-200 cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Spectacular Executive Stats Overview */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-2xl bg-base-200/90 backdrop-blur-2xl border border-base-300 w-full rounded-3xl overflow-hidden p-2">
        <div className="stat p-6 flex flex-col justify-center">
          <div className="stat-figure text-primary p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-sm">
            <Clock className="w-8 h-8" />
          </div>
          <div className="stat-title text-base-content/60 font-extrabold uppercase text-xs tracking-widest mb-1">Total Time Tracked</div>
          <div className="stat-value font-outfit text-primary font-black text-4xl tracking-tight">{totalHours}h</div>
          <div className="stat-desc text-base-content/60 font-semibold mt-2">Across all active projects & modules</div>
        </div>
        
        <div className="stat p-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-base-300/80">
          <div className="stat-figure text-success p-4 bg-success/10 rounded-2xl border border-success/20 shadow-sm">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="stat-title text-base-content/60 font-extrabold uppercase text-xs tracking-widest mb-1">Tasks / Docs Completed</div>
          <div className="stat-value font-outfit text-success font-black text-4xl tracking-tight">{completedTasks}</div>
          <div className="stat-desc text-success font-bold mt-2 flex items-center gap-1">↗︎ 12% more than last week</div>
        </div>
        
        <div className="stat p-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-base-300/80">
          <div className="stat-figure text-warning p-4 bg-warning/10 rounded-2xl border border-warning/20 shadow-sm">
            <Calendar className="w-8 h-8" />
          </div>
          <div className="stat-title text-base-content/60 font-extrabold uppercase text-xs tracking-widest mb-1">Upcoming Deadlines</div>
          <div className="stat-value font-outfit text-warning font-black text-4xl tracking-tight">{upcomingDeadlines}</div>
          <div className="stat-desc text-warning font-bold mt-2 flex items-center gap-1">Requires immediate attention</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Weekly Tracking Breakdown Card */}
        <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 shadow-2xl p-8 rounded-3xl flex flex-col">
          <div className="flex justify-between items-center mb-8 border-b border-base-300/80 pb-4">
            <h2 className="font-outfit text-xl font-black text-base-content tracking-tight">Weekly Tracking Breakdown</h2>
            <div className="flex items-center gap-6 text-xs font-bold text-base-content/70">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary shadow-sm shadow-primary/30"></div>
                Productive
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-base-300 border border-base-300/80"></div>
                Deep Work
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-end h-64 mt-auto gap-4 pt-8">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-3 relative group cursor-pointer" onMouseEnter={() => setHoveredDay(idx)} onMouseLeave={() => setHoveredDay(null)}>
                <div className="w-full max-w-[56px] h-52 flex flex-col justify-end rounded-2xl overflow-hidden bg-base-100/80 border border-base-300/80 shadow-inner">
                  <div className="w-full transition-all duration-500 bg-base-300/80 group-hover:bg-base-300" style={{height: `${data.deep}%`}}></div>
                  <div className="w-full transition-all duration-500 bg-primary group-hover:opacity-85 shadow-lg shadow-primary/20" style={{height: `${data.prod}%`}}></div>
                </div>
                <span className="text-xs font-extrabold text-base-content/60 group-hover:text-primary transition-colors">{data.day}</span>
                {hoveredDay === idx && (
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-base-100 border border-base-300 text-base-content px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap z-20 shadow-2xl animate-in fade-in zoom-in-95 duration-150 border-primary/20">
                    {data.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time per Project Card */}
        <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 shadow-2xl p-8 rounded-3xl flex flex-col">
          <div className="flex justify-between items-center mb-8 border-b border-base-300/80 pb-4">
            <h2 className="font-outfit text-xl font-black text-base-content tracking-tight">Time per Project / Module</h2>
            {selectedProject !== 'ALL' && (
              <button onClick={() => setSelectedProject('ALL')} className="text-primary hover:underline text-xs font-bold cursor-pointer">Reset Filter</button>
            )}
          </div>
          
          <div className="relative w-52 h-52 mx-auto mb-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 filter drop-shadow-lg">
              <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-base-300/60" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-primary" strokeWidth="12" strokeDasharray="113 251" strokeDashoffset="0" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-info" strokeWidth="12" strokeDasharray="75 251" strokeDashoffset="-113" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="transparent" className="stroke-warning" strokeWidth="12" strokeDasharray="63 251" strokeDashoffset="-188" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-outfit text-3xl font-black text-base-content tracking-tight">{totalHours}h</span>
              <span className="text-[10px] text-base-content/60 uppercase tracking-widest font-extrabold mt-0.5">{selectedProject === 'ALL' ? 'Total' : selectedProject}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className={`flex justify-between items-center p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${selectedProject === 'Core Infrastructure' ? 'bg-base-100 border border-primary/40 font-bold shadow-md shadow-primary/5' : 'hover:bg-base-100/60 border border-transparent'}`} onClick={() => setSelectedProject('Core Infrastructure')}>
              <div className="flex items-center gap-3 text-sm text-base-content font-bold">
                <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-sm shadow-primary/30 flex-shrink-0"></div>
                Core Infrastructure
              </div>
              <div className="text-sm font-black text-base-content">45%</div>
            </div>
            <div className={`flex justify-between items-center p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${selectedProject === 'User Feedback' ? 'bg-base-100 border border-info/40 font-bold shadow-md shadow-info/5' : 'hover:bg-base-100/60 border border-transparent'}`} onClick={() => setSelectedProject('User Feedback')}>
              <div className="flex items-center gap-3 text-sm text-base-content font-bold">
                <div className="w-3.5 h-3.5 rounded-full bg-info shadow-sm shadow-info/30 flex-shrink-0"></div>
                User Feedback
              </div>
              <div className="text-sm font-black text-base-content">30%</div>
            </div>
            <div className={`flex justify-between items-center p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${selectedProject === 'Ops/Admin' ? 'bg-base-100 border border-warning/40 font-bold shadow-md shadow-warning/5' : 'hover:bg-base-100/60 border border-transparent'}`} onClick={() => setSelectedProject('Ops/Admin')}>
              <div className="flex items-center gap-3 text-sm text-base-content font-bold">
                <div className="w-3.5 h-3.5 rounded-full bg-warning shadow-sm shadow-warning/30 flex-shrink-0"></div>
                Ops/Admin
              </div>
              <div className="text-sm font-black text-base-content">25%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 shadow-2xl p-8 rounded-3xl flex flex-col">
        <div className="flex justify-between items-center mb-8 border-b border-base-300/80 pb-4">
          <h2 className="font-outfit text-xl font-black text-base-content tracking-tight">Recent Activity {selectedProject !== 'ALL' ? `(${selectedProject})` : ''}</h2>
          <button onClick={() => setSelectedProject('ALL')} className="btn btn-ghost btn-xs font-bold text-base-content/60 hover:text-base-content cursor-pointer">View all</button>
        </div>

        <div className="flex flex-col gap-6 overflow-y-auto pr-1 max-h-96">
          {filteredActivities.length === 0 ? (
            <div className="py-12 text-center text-base-content/60 text-sm font-semibold">No recent activity for this project.</div>
          ) : (
            filteredActivities.map(act => (
              <div key={act.id} className="flex items-start gap-4 p-4 bg-base-100/60 rounded-2xl border border-base-300/60 hover:border-primary/40 hover:bg-base-100 shadow-sm transition-all duration-200 group">
                <div className="w-12 h-12 rounded-2xl bg-base-100 border border-base-300 flex items-center justify-center text-base-content flex-shrink-0 shadow-sm group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                  {act.type === 'time' ? <Clock className="w-5 h-5 text-primary" /> : act.type === 'status' ? <RefreshCw className="w-5 h-5 text-info" /> : <FileText className="w-5 h-5 text-warning" />}
                </div>
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="text-sm font-bold text-base-content leading-snug group-hover:text-primary transition-colors truncate">
                    {act.text}
                  </div>
                  <div className="text-xs text-base-content/60 font-medium">{act.project} • {act.meta}</div>
                </div>
                {act.badge && (
                  <div className="flex-shrink-0 ml-2">
                    <Badge text={act.badge} type={act.badgeType} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
