'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskCard from '@/components/TaskCard';
import { Filter, Share2, MoreHorizontal, Plus, Sparkles, Kanban } from 'lucide-react';

export default function Board() {
  const { tasks, openNewTaskModal, searchQuery, filterPriority, setFilterPriority, filterAssignee, setFilterAssignee } = useTaskContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'ALL' || task.assigneeInitials === filterAssignee;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const backlog = filteredTasks.filter(t => t.status === 'BACKLOG');
  const todo = filteredTasks.filter(t => t.status === 'TO DO');
  const inProgress = filteredTasks.filter(t => t.status === 'IN PROGRESS');

  const assigneesList = Array.from(new Set(tasks.map(t => t.assigneeInitials)));

  return (
    <div className="p-4 sm:p-8 h-[calc(100vh-5.5rem)] flex flex-col max-w-7xl mx-auto overflow-hidden animate-in fade-in duration-300 font-sans">
      <div className="flex flex-col gap-4 border-b border-base-300 pb-6 mb-8 flex-shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-base-content/60 uppercase tracking-wider">
          <span>Enterprise Workspace</span>
          <span>/</span>
          <span className="text-primary font-extrabold">Kanban Board</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-outfit text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
            Kanban Board <span className="badge badge-primary badge-lg font-extrabold shadow-sm">{filteredTasks.length} active</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="avatar-group -space-x-3 mr-2 hidden sm:flex">
              <div className="avatar placeholder">
                <div className="w-9 h-9 rounded-full bg-base-300 text-base-content font-bold text-xs shadow-sm border border-base-100"><span>AR</span></div>
              </div>
              <div className="avatar placeholder">
                <div className="w-9 h-9 rounded-full bg-base-300 text-base-content font-bold text-xs shadow-sm border border-base-100"><span>SJ</span></div>
              </div>
              <div className="avatar placeholder">
                <div className="w-9 h-9 rounded-full bg-base-300 text-base-content font-bold text-xs shadow-sm border border-base-100"><span>MT</span></div>
              </div>
              <div className="avatar placeholder">
                <div className="w-9 h-9 rounded-full bg-primary text-primary-content font-bold text-xs shadow-sm border border-base-100"><span>+4</span></div>
              </div>
            </div>
            <div className="relative">
              <button 
                className={`btn btn-sm h-11 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer ${filterPriority !== 'ALL' || filterAssignee !== 'ALL' ? 'btn-primary shadow-primary/20' : 'btn-outline border-base-300 hover:bg-base-200'}`} 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="w-4 h-4" /> Filter {filterPriority !== 'ALL' || filterAssignee !== 'ALL' ? '(Active)' : ''}
              </button>
              {isFilterOpen && (
                <div className="absolute top-14 right-0 w-72 bg-base-200/95 backdrop-blur-2xl border border-base-300 rounded-2xl shadow-2xl z-50 p-5 flex flex-col gap-4 text-left animate-in fade-in zoom-in-95 duration-150">
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
            <button className="btn btn-primary btn-sm h-11 px-5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-1 overflow-x-auto pb-6 pt-2 items-start px-1">
        {/* Backlog Column */}
        <div className="w-80 min-w-80 flex flex-col gap-4 bg-base-200/80 backdrop-blur-2xl p-5 rounded-3xl border border-base-300 shadow-xl max-h-full overflow-y-auto flex-shrink-0">
          <div className="flex justify-between items-center px-1 border-b border-base-300/80 pb-3">
            <div className="font-outfit font-black text-base text-base-content flex items-center gap-2.5">
              Backlog <span className="badge badge-neutral font-extrabold shadow-sm py-1.5 px-2.5 bg-base-300 border-base-300/80 text-base-content/80">{backlog.length}</span>
            </div>
            <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-col gap-3">
            {backlog.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          <button 
            onClick={() => openNewTaskModal('BACKLOG')}
            className="btn btn-ghost btn-block h-12 rounded-2xl border border-dashed border-base-300 hover:border-primary hover:text-primary hover:bg-primary/5 text-base-content/60 mt-1 shadow-sm font-bold cursor-pointer transition-all duration-200"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Task / Doc
          </button>
        </div>

        {/* To Do Column */}
        <div className="w-80 min-w-80 flex flex-col gap-4 bg-base-200/80 backdrop-blur-2xl p-5 rounded-3xl border border-base-300 shadow-xl max-h-full overflow-y-auto flex-shrink-0">
          <div className="flex justify-between items-center px-1 border-b border-base-300/80 pb-3">
            <div className="font-outfit font-black text-base text-base-content flex items-center gap-2.5">
              To Do <span className="badge badge-neutral font-extrabold shadow-sm py-1.5 px-2.5 bg-base-300 border-base-300/80 text-base-content/80">{todo.length}</span>
            </div>
            <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-col gap-3">
            {todo.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          <button 
            onClick={() => openNewTaskModal('TO DO')}
            className="btn btn-ghost btn-block h-12 rounded-2xl border border-dashed border-base-300 hover:border-primary hover:text-primary hover:bg-primary/5 text-base-content/60 mt-1 shadow-sm font-bold cursor-pointer transition-all duration-200"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Task / Doc
          </button>
        </div>

        {/* In Progress Column */}
        <div className="w-80 min-w-80 flex flex-col gap-4 bg-base-200/80 backdrop-blur-2xl p-5 rounded-3xl border border-base-300 shadow-xl max-h-full overflow-y-auto flex-shrink-0">
          <div className="flex justify-between items-center px-1 border-b border-base-300/80 pb-3">
            <div className="font-outfit font-black text-base text-base-content flex items-center gap-2.5">
              In Progress <span className="badge badge-primary font-black shadow-sm py-1.5 px-2.5 bg-primary/20 text-primary border border-primary/30">{inProgress.length}</span>
            </div>
            <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-col gap-3">
            {inProgress.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
          <button 
            onClick={() => openNewTaskModal('IN PROGRESS')}
            className="btn btn-ghost btn-block h-12 rounded-2xl border border-dashed border-base-300 hover:border-primary hover:text-primary hover:bg-primary/5 text-base-content/60 mt-1 shadow-sm font-bold cursor-pointer transition-all duration-200"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Task / Doc
          </button>
        </div>
      </div>
    </div>
  );
}
