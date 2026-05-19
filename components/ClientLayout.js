'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import NewTaskModal from '@/components/NewTaskModal';
import SearchModal from '@/components/SearchModal';
import { useTaskContext } from '@/context/TaskContext';
import { Lock, User, Key, ShieldCheck, Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function ClientLayout({ children }) {
  const { currentUser, login, isLoaded } = useTaskContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary animate-spin"></span>
      </div>
    );
  }

  if (!currentUser) {
    const handleManualLogin = (e) => {
      e.preventDefault();
      setError('');
      const success = login(username.trim().toLowerCase(), password.trim().toLowerCase());
      if (!success) {
        setError('Invalid username or password. Use admin/admin or employee/employee.');
      }
    };

    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-base-300 via-base-100 to-base-200 p-4 font-sans selection:bg-primary selection:text-primary-content relative overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="card w-full max-w-md bg-base-200/90 backdrop-blur-3xl border border-base-300 shadow-[0_20px_70px_rgba(0,0,0,0.5)] rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-300 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-content font-black shadow-lg shadow-primary/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-outfit text-2xl font-black text-base-content tracking-tight">Enterprise Portal</h2>
              <p className="text-xs text-base-content/60 font-medium mt-0.5">Role-based authentication & secure dispatch</p>
            </div>
          </div>

          {error && (
            <div className="alert alert-error shadow-lg mb-6 rounded-2xl text-xs font-bold py-3 animate-in shake duration-200">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleManualLogin} className="flex flex-col gap-4 mb-6">
            <div className="form-control w-full gap-1.5">
              <label className="label-text text-xs font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-primary" /> Username
              </label>
              <input
                type="text"
                placeholder="admin OR employee"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full bg-base-100/80 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 rounded-xl font-medium shadow-inner"
                required
              />
            </div>

            <div className="form-control w-full gap-1.5">
              <label className="label-text text-xs font-bold text-base-content/70 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-info" /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full bg-base-100/80 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 rounded-xl font-medium shadow-inner"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary h-12 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer mt-2 flex items-center justify-center gap-2"
            >
              Log In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-base-300"></div>
            <span className="flex-shrink mx-4 text-[10px] font-extrabold text-base-content/50 uppercase tracking-widest font-mono">⚡ Instant Demo Logins</span>
            <div className="flex-grow border-t border-base-300"></div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => login('admin', 'admin')}
              type="button"
              className="btn btn-outline border-base-300 bg-base-100/50 hover:bg-base-100 hover:border-primary text-base-content font-bold h-12 rounded-xl flex items-center justify-between px-4 shadow-sm group transition-all duration-200 cursor-pointer"
            >
              <span className="flex items-center gap-2.5 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                Login as Administrator
              </span>
              <span className="badge badge-error badge-sm font-mono font-extrabold text-[10px]">admin / admin</span>
            </button>

            <button
              onClick={() => login('employee', 'employee')}
              type="button"
              className="btn btn-outline border-base-300 bg-base-100/50 hover:bg-base-100 hover:border-info text-base-content font-bold h-12 rounded-xl flex items-center justify-between px-4 shadow-sm group transition-all duration-200 cursor-pointer"
            >
              <span className="flex items-center gap-2.5 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-info animate-pulse"></span>
                Login as Employee
              </span>
              <span className="badge badge-info badge-sm font-mono font-extrabold text-[10px]">employee / employee</span>
            </button>
          </div>

          <div className="text-center mt-8 text-xs text-base-content/40 font-medium">
            TaskFlow Pro Enterprise SaaS • Secure Dispatch Architecture
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative bg-gradient-to-br from-base-100 via-base-200/40 to-base-200 transition-colors duration-300">
        <Header />
        <main className="flex-1 overflow-y-auto relative transition-all duration-300">
          {children}
        </main>
      </div>
      <NewTaskModal />
      <SearchModal />
    </>
  );
}
