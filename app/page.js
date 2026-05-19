'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import TaskRow from '@/components/TaskRow';
import { List, Kanban, Calendar as CalendarIcon, Filter, ArrowUpDown, ChevronDown, ChevronRight, Play, Pause, Square, ChevronLeft, Sparkles, CheckCircle, Clock } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { tasks, activeTrackingId, isTracking, stopTracking, pauseTracking, searchQuery, filterPriority, setFilterPriority, filterAssignee, setFilterAssignee, sortBy, setSortBy } = useTaskContext();

  const [activeTab, setActiveTab] = useState('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    TODO: false,
    IN_PROGRESS: false,
    REVIEW: false
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter tasks
  let filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'ALL' || task.assigneeInitials === filterAssignee;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  // Sort tasks
  filteredTasks.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityWeight = { URGENT: 4, HIGH: 3, NORMAL: 2, LOW: 1, BUG: 4, SECURITY: 4, FEATURE: 2, REFACTOR: 1 };
      return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    }
    if (sortBy === 'dueDate') {
      return a.dueDate.localeCompare(b.dueDate);
    }
    if (sortBy === 'timeLogged') {
      return b.timeLogged - a.timeLogged;
    }
    return 0; // DEFAULT
  });

  const tasksToDo = filteredTasks.filter(t => t.status === 'TO DO' || t.status === 'BACKLOG');
  const tasksInProgress = filteredTasks.filter(t => t.status === 'IN PROGRESS');
  const tasksReview = filteredTasks.filter(t => t.status === 'REVIEW' || t.status === 'DONE');

  const activeTask = tasks.find(t => t.id === activeTrackingId);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const assigneesList = Array.from(new Set(tasks.map(t => t.assigneeInitials)));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Spectacular Hero Summary Card */}
      <div className="card bg-gradient-to-r from-base-200 via-primary/5 to-base-200 border border-base-300/80 p-8 shadow-2xl rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-base-content/60 uppercase tracking-wider">
            <span>Enterprise Workspace</span>
            <span>/</span>
            <span className="text-primary font-extrabold">Active Sprint</span>
          </div>
          <h1 className="font-outfit text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
            Active Tasks & Docs <span className="badge badge-primary badge-lg font-extrabold shadow-sm">{filteredTasks.length} total</span>
          </h1>
          <p className="text-base-content/70 text-base max-w-xl leading-relaxed font-medium">
            Manage your high-density engineering tasks, documentation blocks, and real-time sprint timers in one unified view.
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch lg:self-auto justify-end">
          <div className="relative">
            <button 
              className={`btn btn-sm h-11 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer ${filterPriority !== 'ALL' || filterAssignee !== 'ALL' ? 'btn-primary shadow-primary/20' : 'btn-outline border-base-300 hover:bg-base-200'}`} 
              onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
            >
              <Filter className="w-4 h-4" /> Filter {filterPriority !== 'ALL' || filterAssignee !== 'ALL' ? '(Active)' : ''}
            </button>
            {isFilterOpen && (
              <div className="absolute top-14 right-0 w-72 bg-base-200/95 backdrop-blur-2xl border border-base-300 shadow-2xl z-50 p-5 rounded-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
                <div className="form-control w-full gap-1.5">
                  <label className="label-text text-xs font-bold text-base-content/60 uppercase tracking-wider">Priority</label>
                  <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="select select-bordered w-full bg-base-100 text-base-content focus:border-primary cursor-pointer font-medium rounded-xl shadow-inner">
                    <option value="ALL">All Priorities</option>
                    <option value="URGENT">Urgent / Bug</option>
                    <option value="HIGH">High</option>
                    <option value="NORMAL">Normal / Feature</option>
                    <option value="LOW">Low / Refactor</option>
                  </select>
                </div>
                <div className="form-control w-full gap-1.5">
                  <label className="label-text text-xs font-bold text-base-content/60 uppercase tracking-wider">Assignee</label>
                  <select value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} className="select select-bordered w-full bg-base-100 text-base-content focus:border-primary cursor-pointer font-medium rounded-xl shadow-inner">
                    <option value="ALL">All Assignees</option>
                    {assigneesList.map(init => (
                      <option key={init} value={init}>{init}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => { setFilterPriority('ALL'); setFilterAssignee('ALL'); }} className="btn btn-outline btn-sm w-full mt-1 cursor-pointer rounded-xl font-bold">Reset Filters</button>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              className={`btn btn-sm h-11 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer ${sortBy !== 'DEFAULT' ? 'btn-primary shadow-primary/20' : 'btn-outline border-base-300 hover:bg-base-200'}`} 
              onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
            >
              <ArrowUpDown className="w-4 h-4" /> Sort {sortBy !== 'DEFAULT' ? `(${sortBy})` : ''}
            </button>
            {isSortOpen && (
              <div className="absolute top-14 right-0 w-56 bg-base-200/95 backdrop-blur-2xl border border-base-300 shadow-2xl z-50 p-4 rounded-2xl flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150">
                <label className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Sort By</label>
                <ul className="menu bg-base-100/90 rounded-xl p-1 gap-1 border border-base-300 shadow-sm">
                  <li><button onClick={() => { setSortBy('DEFAULT'); setIsSortOpen(false); }} className={`font-semibold rounded-lg ${sortBy === 'DEFAULT' ? 'active font-bold text-primary bg-primary/10' : ''}`}>Default</button></li>
                  <li><button onClick={() => { setSortBy('priority'); setIsSortOpen(false); }} className={`font-semibold rounded-lg ${sortBy === 'priority' ? 'active font-bold text-primary bg-primary/10' : ''}`}>Priority (High to Low)</button></li>
                  <li><button onClick={() => { setSortBy('dueDate'); setIsSortOpen(false); }} className={`font-semibold rounded-lg ${sortBy === 'dueDate' ? 'active font-bold text-primary bg-primary/10' : ''}`}>Due Date</button></li>
                  <li><button onClick={() => { setSortBy('timeLogged'); setIsSortOpen(false); }} className={`font-semibold rounded-lg ${sortBy === 'timeLogged' ? 'active font-bold text-primary bg-primary/10' : ''}`}>Time Logged (Most)</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Segmented Controls for Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-base-300/80 pb-6">
        <div className="tabs tabs-boxed bg-base-300/40 p-1.5 rounded-2xl shadow-inner border border-base-300/60">
          <button 
            className={`tab gap-2 font-bold cursor-pointer h-10 px-5 rounded-xl transition-all duration-200 ${activeTab === 'list' ? 'tab-active bg-base-100 text-primary font-black shadow-md border border-base-300/80' : 'text-base-content/70 hover:text-base-content'}`} 
            onClick={() => setActiveTab('list')}
          >
            <List className="w-4 h-4" /> List View
          </button>
          <button 
            className="tab gap-2 font-bold cursor-pointer h-10 px-5 rounded-xl text-base-content/70 hover:text-base-content transition-all duration-200" 
            onClick={() => router.push('/board')}
          >
            <Kanban className="w-4 h-4" /> Kanban Board
          </button>
          <button 
            className={`tab gap-2 font-bold cursor-pointer h-10 px-5 rounded-xl transition-all duration-200 ${activeTab === 'calendar' ? 'tab-active bg-base-100 text-primary font-black shadow-md border border-base-300/80' : 'text-base-content/70 hover:text-base-content'}`} 
            onClick={() => setActiveTab('calendar')}
          >
            <CalendarIcon className="w-4 h-4" /> Calendar View
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-base-content/60">
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-success" /> {tasksReview.length} Completed</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-warning" /> {tasksInProgress.length} In Progress</span>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <div className="p-8 bg-base-100/80 backdrop-blur-xl rounded-3xl border border-base-300 shadow-xl min-h-[500px] flex flex-col gap-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <h2 className="font-outfit text-2xl font-black text-base-content tracking-tight">October 2023</h2>
            <div className="flex items-center gap-2">
              <button className="btn btn-outline btn-sm border-base-300 cursor-pointer rounded-xl shadow-sm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="btn btn-outline btn-sm border-base-300 cursor-pointer font-bold rounded-xl shadow-sm">
                Today
              </button>
              <button className="btn btn-outline btn-sm border-base-300 cursor-pointer rounded-xl shadow-sm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px bg-base-300/80 border border-base-300 rounded-2xl overflow-hidden shadow-inner font-sans">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="py-3.5 bg-base-200/80 font-black text-xs text-base-content/60 text-center uppercase tracking-wider">{d}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const dayTasks = tasks.filter(t => t.dueDate.includes(`${day},`) || (day === 12 && t.dueDate.includes('Oct 12')) || (day === 14 && t.dueDate.includes('Oct 14')) || (day === 20 && t.dueDate.includes('Oct 20')) || (day === 25 && t.dueDate.includes('Oct 25')));
              return (
                <div key={day} className="p-3 bg-base-100/90 min-h-[120px] flex flex-col gap-2 hover:bg-base-200/50 transition-colors border-b border-r border-base-300/50 group">
                  <span className={`text-sm font-black ${dayTasks.length > 0 ? 'text-primary' : 'text-base-content/40'}`}>{day}</span>
                  <div className="flex flex-col gap-1.5 overflow-y-auto max-h-24 pr-1">
                    {dayTasks.map(t => (
                      <div key={t.id} className={`px-2.5 py-1.5 rounded-xl text-xs font-bold truncate shadow-sm border transition-all hover:scale-[1.02] cursor-pointer ${t.priority === 'URGENT' || t.priority === 'HIGH' ? 'bg-error/15 text-error border-error/30' : 'bg-base-200 text-base-content border-base-300'}`}>
                        {t.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 animate-in fade-in duration-200 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-3.5 bg-base-200/60 border border-base-300 rounded-2xl text-[11px] font-extrabold text-base-content/60 uppercase tracking-widest shadow-sm backdrop-blur-md">
            <div>TASK NAME / DOCUMENT</div>
            <div>ASSIGNEE</div>
            <div>DUE DATE</div>
            <div>PRIORITY</div>
            <div>TIME LOGGED</div>
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
              <span className="text-xs font-bold text-base-content/60">{tasksInProgress.length} Task{tasksInProgress.length !== 1 ? 's' : ''}</span>
            </div>
            {!collapsedSections.IN_PROGRESS && (
              <div className="flex flex-col gap-2">
                {tasksInProgress.map((task) => (
                  <TaskRow key={task.id} task={task} activeTracking={activeTrackingId === task.id && isTracking} />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 py-1 cursor-pointer select-none group" onClick={() => toggleSection('REVIEW')}>
              {collapsedSections.REVIEW ? <ChevronRight className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" /> : <ChevronDown className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" />}
              <span className="badge badge-neutral font-black tracking-widest uppercase shadow-sm py-2.5 px-3 bg-base-300 text-base-content/80 border border-base-300/80 rounded-xl">REVIEW / DONE</span>
              <span className="text-xs font-bold text-base-content/60">{tasksReview.length} Task{tasksReview.length !== 1 ? 's' : ''}</span>
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
      )}

      {/* Spectacular Floating Island Active Tracking Banner */}
      {isTracking && activeTask && (
        <div className="alert alert-info shadow-[0_10px_30px_rgba(0,0,0,0.5)] fixed bottom-8 left-1/2 -translate-x-1/2 w-auto min-w-[650px] max-w-3xl flex items-center justify-between gap-12 border border-info/50 rounded-2xl z-50 animate-in slide-in-from-bottom-10 duration-300 bg-info/95 backdrop-blur-2xl text-info-content">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-3 h-3 bg-info-content rounded-full animate-ping flex-shrink-0"></div>
            <span className="text-xs font-black tracking-widest text-info-content uppercase flex-shrink-0">ACTIVE TRACKING</span>
            <span className="font-bold text-base truncate text-info-content">{activeTask.name}</span>
          </div>
          <div className="flex items-center gap-6 flex-shrink-0">
            <span className="font-mono text-2xl font-black text-info-content tracking-tight">{formatTime(activeTask.timeLogged)}</span>
            <div className="flex items-center gap-2">
              <button 
                className="btn btn-error btn-circle btn-sm shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer" 
                onClick={stopTracking}
                title="Stop Tracking"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
              <button 
                className="btn btn-ghost btn-circle btn-sm bg-base-100 text-base-content hover:bg-base-200 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer border border-base-300" 
                onClick={pauseTracking}
                title="Pause Tracking"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
