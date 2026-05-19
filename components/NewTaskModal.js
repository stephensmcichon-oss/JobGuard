'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Plus, X, Calendar, User, AlertCircle, FileText, CheckCircle, Sparkles } from 'lucide-react';

export default function NewTaskModal() {
  const { isNewTaskModalOpen, closeNewTaskModal, addTask, initialStatus, currentUser, employees } = useTaskContext();
  const isAdmin = currentUser?.role === 'admin';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('NORMAL');
  const [status, setStatus] = useState(initialStatus || 'TO DO');

  if (!isNewTaskModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    let finalAssignee = 'Unassigned';
    let finalInitials = 'UN';

    if (isAdmin) {
      if (assignee) {
        const emp = employees.find(e => e.id === assignee);
        if (emp) {
          finalAssignee = emp.fullName;
          finalInitials = emp.initials;
        }
      }
    } else {
      finalAssignee = currentUser?.name || 'Employee';
      finalInitials = currentUser?.initials || 'EMP';
    }

    addTask({
      name,
      description,
      assignee: finalAssignee,
      assigneeInitials: finalInitials,
      dueDate: dueDate || 'No due date',
      priority,
      status: status || initialStatus || 'TO DO',
    });

    setName('');
    setDescription('');
    setAssignee('');
    setDueDate('');
    setPriority('NORMAL');
    setStatus(initialStatus || 'TO DO');
    closeNewTaskModal();
  };

  return (
    <div className="modal modal-open backdrop-blur-sm bg-base-100/40">
      <div className="modal-box bg-base-200/95 backdrop-blur-3xl border border-base-300/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-w-lg rounded-3xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center border-b border-base-300 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-content font-black shadow-lg shadow-primary/20">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h3 className="font-outfit font-black text-xl text-base-content tracking-tight">Create Task / Doc</h3>
              <p className="text-xs text-base-content/60 mt-0.5">Add a new item to your enterprise workspace</p>
            </div>
          </div>
          <button 
            onClick={closeNewTaskModal} 
            className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-base-content cursor-pointer shadow-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="form-control w-full gap-1.5">
            <label className="label-text text-xs font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" /> Task Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Architectural Review of Data Migration Pipeline v2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full bg-base-100/80 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 rounded-xl font-medium shadow-inner"
              required
            />
          </div>

          <div className="form-control w-full gap-1.5">
            <label className="label-text text-xs font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-info" /> Description / Content
            </label>
            <textarea
              placeholder="Provide a detailed description, prompt, or documentation notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full bg-base-100/80 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 h-24 rounded-2xl font-medium shadow-inner p-4"
            ></textarea>
          </div>

          {isAdmin && (
            <div className="form-control w-full gap-1.5">
              <label className="label-text text-xs font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-warning" /> Assignee Name
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="select select-bordered w-full bg-base-100/80 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 rounded-xl font-medium cursor-pointer shadow-inner"
              >
                <option value="">Unassigned</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.fullName}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control w-full gap-1.5">
              <label className="label-text text-xs font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-success" /> Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input input-bordered w-full bg-base-100/80 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 rounded-xl font-medium shadow-inner"
              />
            </div>

            <div className="form-control w-full gap-1.5">
              <label className="label-text text-xs font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-error" /> Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="select select-bordered w-full bg-base-100/80 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 rounded-xl font-bold cursor-pointer shadow-inner"
              >
                <option value="URGENT">🚨 URGENT / BUG</option>
                <option value="HIGH">⚡ HIGH</option>
                <option value="NORMAL">📌 NORMAL / FEATURE</option>
                <option value="LOW">🌱 LOW / REFACTOR</option>
              </select>
            </div>
          </div>

          <div className="form-control w-full gap-1.5">
            <label className="label-text text-xs font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-primary" /> Initial Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full bg-base-100/80 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 rounded-xl font-bold cursor-pointer shadow-inner"
            >
              <option value="BACKLOG">📦 BACKLOG</option>
              <option value="TO DO">📝 TO DO</option>
              <option value="IN PROGRESS">⏳ IN PROGRESS</option>
              <option value="REVIEW">🧐 REVIEW / DONE</option>
            </select>
          </div>

          <div className="modal-action flex items-center justify-end gap-3 mt-6 border-t border-base-300 pt-6">
            <button 
              type="button" 
              onClick={closeNewTaskModal} 
              className="btn btn-ghost h-12 px-6 rounded-xl font-bold hover:bg-base-300 text-base-content/70 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-5 h-5 stroke-[3]" /> Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
