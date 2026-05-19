'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { UserPlus, CheckCircle, Users, Edit3, Save, X } from 'lucide-react';

export default function TeamManagement() {
  const { employees, addEmployee, updateEmployee, currentUser } = useTaskContext();
  const isAdmin = currentUser?.role === 'admin';

  // Admin Add Employee Form State
  const [empFullName, setEmpFullName] = useState('');
  const [empEmailAddress, setEmpEmailAddress] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const [showEmpSuccess, setShowEmpSuccess] = useState(false);

  // Edit Employee State
  const [editingEmpId, setEditingEmpId] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-error font-bold">
        Access Denied. You must be an administrator to view this page.
      </div>
    );
  }

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!empFullName.trim() || !empEmailAddress.trim() || !empPassword.trim()) return;

    await addEmployee({
      fullName: empFullName,
      email: empEmailAddress,
      password: empPassword
    });

    setEmpFullName('');
    setEmpEmailAddress('');
    setEmpPassword('');
    setShowEmpSuccess(true);
    setTimeout(() => setShowEmpSuccess(false), 4000);
  };

  const startEditing = (emp) => {
    setEditingEmpId(emp.id);
    setEditEmail(emp.email);
    setEditPassword(emp.password || '');
  };

  const handleSaveEdit = async (empId) => {
    await updateEmployee(empId, editEmail, editPassword);
    setEditingEmpId(null);
  };

  const cancelEdit = () => {
    setEditingEmpId(null);
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in duration-300 font-sans">
      <div className={`card bg-gradient-to-r from-base-200 via-success/10 to-base-200 border-success/30 border p-8 shadow-2xl rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative overflow-hidden backdrop-blur-2xl`}>
        <div className={`absolute -top-12 -right-12 w-48 h-48 bg-success/10 rounded-full blur-3xl pointer-events-none`}></div>
        <div className="flex flex-col gap-2">
          <h1 className="font-outfit text-4xl font-black text-base-content tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-success" /> Team Management
          </h1>
          <p className="text-base-content/70 text-base max-w-xl leading-relaxed font-medium">
            Onboard new employees and manage your organization's directory.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card bg-base-200/90 backdrop-blur-2xl border border-success/30 p-6 rounded-3xl shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-base-300 pb-3">
            <div className="flex items-center gap-2.5 font-outfit font-black text-lg text-base-content tracking-tight">
              <UserPlus className="w-5 h-5 text-success" /> Add New Employee
            </div>
            <span className="badge badge-success badge-sm font-bold uppercase tracking-wider text-[10px]">Admin Only</span>
          </div>

          {showEmpSuccess && (
            <div className="alert alert-success shadow-lg rounded-2xl text-xs font-bold py-3 animate-in fade-in duration-200">
              <CheckCircle className="w-4 h-4" />
              <span>Employee successfully added to Enterprise Directory!</span>
            </div>
          )}

          <form onSubmit={handleAddEmployee} className="flex flex-col gap-4">
            <div className="form-control w-full gap-1">
              <label className="label-text text-[11px] font-bold text-base-content/70 uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. David Beckham"
                value={empFullName}
                onChange={(e) => setEmpFullName(e.target.value)}
                className="input input-bordered w-full bg-base-100/80 text-sm focus:border-success h-11 rounded-xl font-medium shadow-inner"
                required
              />
            </div>

            <div className="form-control w-full gap-1">
              <label className="label-text text-[11px] font-bold text-base-content/70 uppercase tracking-wider">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. david@taskflow.com"
                value={empEmailAddress}
                onChange={(e) => setEmpEmailAddress(e.target.value)}
                className="input input-bordered w-full bg-base-100/80 text-sm focus:border-success h-11 rounded-xl font-medium shadow-inner"
                required
              />
            </div>

            <div className="form-control w-full gap-1">
              <label className="label-text text-[11px] font-bold text-base-content/70 uppercase tracking-wider">Temporary Password *</label>
              <input
                type="text"
                placeholder="e.g. tempPass123"
                value={empPassword}
                onChange={(e) => setEmpPassword(e.target.value)}
                className="input input-bordered w-full bg-base-100/80 text-sm focus:border-success h-11 rounded-xl font-medium shadow-inner"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success h-11 rounded-xl font-bold shadow-lg shadow-success/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer w-full flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus className="w-4 h-4" /> Onboard Employee
            </button>
          </form>
        </div>

        <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-6 rounded-3xl shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-base-300 pb-3">
            <div className="flex items-center gap-2.5 font-outfit font-black text-lg text-base-content tracking-tight">
              Directory ({employees.length})
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-2">
            {employees.map(emp => (
              <div key={emp.id} className="flex flex-col p-4 rounded-2xl bg-base-100/50 border border-base-300 shadow-sm gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-sm font-black text-primary shadow-inner">
                      {emp.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base-content font-bold">{emp.fullName}</span>
                      <span className="badge badge-sm badge-ghost font-mono mt-1 text-[10px]">{emp.status}</span>
                    </div>
                  </div>
                  
                  {editingEmpId === emp.id ? (
                    <div className="flex gap-2">
                      <button onClick={cancelEdit} className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content hover:bg-base-200">
                        <X className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleSaveEdit(emp.id)} className="btn btn-success btn-xs btn-circle text-success-content shadow-sm hover:scale-110 transition-transform">
                        <Save className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => startEditing(emp)} className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 flex items-center gap-1.5 rounded-xl font-bold text-xs">
                      <Edit3 className="w-3.5 h-3.5" /> Edit Access
                    </button>
                  )}
                </div>

                {editingEmpId === emp.id ? (
                  <div className="bg-base-200/50 p-3 rounded-xl border border-base-300 flex flex-col gap-2.5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="form-control w-full gap-1">
                      <label className="label-text text-[10px] font-bold text-base-content/60 uppercase tracking-wider">Edit Email</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="input input-bordered input-sm w-full bg-base-100 focus:border-primary font-medium"
                      />
                    </div>
                    <div className="form-control w-full gap-1">
                      <label className="label-text text-[10px] font-bold text-base-content/60 uppercase tracking-wider">Edit Password</label>
                      <input
                        type="text"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        placeholder="Set new password"
                        className="input input-bordered input-sm w-full bg-base-100 focus:border-primary font-medium"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5 bg-base-200/30 p-3 rounded-xl border border-base-300/50">
                    <div className="flex items-center justify-between text-xs font-medium text-base-content/70">
                      <span>Email:</span>
                      <span className="text-base-content">{emp.email}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium text-base-content/70">
                      <span>Password:</span>
                      <span className="font-mono text-base-content/40 italic">
                        {emp.password ? '••••••••' : 'Not set'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
