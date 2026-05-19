'use client';
import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { UserPlus, CheckCircle, Users } from 'lucide-react';

export default function TeamManagement() {
  const { employees, addEmployee, currentUser } = useTaskContext();
  const isAdmin = currentUser?.role === 'admin';

  // Admin Add Employee Form State
  const [empFullName, setEmpFullName] = useState('');
  const [empEmailAddress, setEmpEmailAddress] = useState('');
  const [empPassword, setEmpPassword] = useState('');
  const [showEmpSuccess, setShowEmpSuccess] = useState(false);

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
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
            {employees.map(emp => (
              <div key={emp.id} className="flex items-center justify-between p-3 rounded-xl bg-base-100/50 border border-base-300 text-sm font-semibold">
                <div className="flex flex-col">
                  <span className="text-base-content">{emp.fullName}</span>
                  <span className="text-xs text-base-content/60 font-medium">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-sm badge-ghost font-mono">{emp.status}</span>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {emp.initials}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
