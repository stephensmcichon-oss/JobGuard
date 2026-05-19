'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskRow from '@/components/TaskRow';
import { Filter, ArrowUpDown, ChevronDown, ChevronRight, CheckCircle, Clock } from 'lucide-react';

export default function Home() {
  const { tasks, searchQuery, filterPriority, setFilterPriority, filterAssignee, setFilterAssignee, sortBy, setSortBy, currentUser, employees } = useTaskContext();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    TODO: false,
    IN_PROGRESS: false,
    REVIEW: false
  });

  const isAdmin = currentUser?.role === 'admin';

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter tasks based on role & search
  let filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'ALL' || task.assigneeInitials === filterAssignee;

    if (!isAdmin) {
      // Employee logic: can view only tasks assigned to them? No, "Tasks" (this page) usually means all public tasks. 
      // But wait! The prompt said "View only tasks assigned to me (Employee)" as a broken function.
      // So on the main page, employees should only see their tasks. 
      // Wait, if they ONLY see their tasks, then what's the difference between /tasks and /my-tasks?
      // I'll make /tasks show their tasks too if they are an employee.
      const myInitials = currentUser?.initials || 'EMP';
      const myEmailName = currentUser?.username?.split('@')[0] || 'employee';
      const matchesEmp = task.assigneeInitials === myInitials || 
                         task.assigneeInitials === 'EMP' || 
                         task.assignee.toLowerCase().includes('employee') ||
                         task.assignee.toLowerCase().includes(myEmailName);
      return matchesSearch && matchesPriority && matchesAssignee && matchesEmp;
    }

    return matchesSearch && matchesPriority && matchesAssignee;
  });

  // Sort tasks
  filteredTasks.sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityWeight = { URGENT: 4, HIGH: 3, NORMAL: 2, LOW: 1, BUG: 4, SECURITY: 4, FEATURE: 2, REFACTOR: 1 };
      return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    }
    if (sortBy === 'dueDate') {
      return (a.dueDate || '').localeCompare(b.dueDate || '');
    }
    return 0; // DEFAULT
  });

  const tasksToDo = filteredTasks.filter(t => t.status === 'TO DO' || t.status === 'BACKLOG');
  const tasksInProgress = filteredTasks.filter(t => t.status === 'IN PROGRESS');
  const tasksReview = filteredTasks.filter(t => t.status === 'REVIEW' || t.status === 'DONE');

  const assigneesList = Array.from(new Set(employees.map(emp => emp.initials)));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in duration-300 font-sans">
      <div className={`card bg-gradient-to-r ${isAdmin ? 'from-base-200 via-error/10 to-base-200 border-error/30' : 'from-base-200 via-info/10 to-base-200 border-info/30'} border p-8 shadow-2xl rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden backdrop-blur-2xl`}>
        <div className={`absolute -top-12 -right-12 w-48 h-48 ${isAdmin ? 'bg-error/10' : 'bg-info/10'} rounded-full blur-3xl pointer-events-none`}></div>
        <div className="flex flex-col gap-2">
          <h1 className="font-outfit text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
            {isAdmin ? 'All Tasks' : 'My Tasks'} 
            <span className={`badge ${isAdmin ? 'badge-error' : 'badge-info'} badge-lg font-extrabold shadow-sm`}>{filteredTasks.length} total</span>
          </h1>
          <p className="text-base-content/70 text-base max-w-xl leading-relaxed font-medium">
            {isAdmin 
              ? 'Global view of all tasks across the workspace.'
              : 'Tasks currently assigned to you.'}
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
                    <option value="URGENT">Urgent</option>
                    <option value="HIGH">High</option>
                    <option value="NORMAL">Normal</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
                {isAdmin && (
                  <div className="form-control w-full gap-1.5">
                    <label className="label-text text-xs font-bold text-base-content/60 uppercase tracking-wider">Assignee</label>
                    <select value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} className="select select-bordered w-full bg-base-100 text-base-content focus:border-primary cursor-pointer font-medium rounded-xl shadow-inner">
                      <option value="ALL">All Assignees</option>
                      {assigneesList.map(init => (
                        <option key={init} value={init}>{init}</option>
                      ))}
                    </select>
                  </div>
                )}
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
                </ul>
              </div>
            )}
          </div>
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
            <span className="text-xs font-bold text-base-content/60">{tasksInProgress.length} Task{tasksInProgress.length !== 1 ? 's' : ''}</span>
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
    </div>
  );
}
