'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import { Search, Timer, Bell, X, AlertTriangle, Square, Sun, Moon, Globe, Command, ExternalLink, Palette, Sparkles, LogOut, ShieldCheck, User } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { searchQuery, setSearchQuery, isNotificationsOpen, toggleNotifications, tasks, isTracking, startTracking, stopTracking, setIsSearchModalOpen, theme, setTheme, currentUser, logout } = useTaskContext();

  const handleQuickTimer = () => {
    if (isTracking) {
      stopTracking();
    } else {
      const firstTask = tasks.find(t => t.status !== 'DONE') || tasks[0];
      if (firstTask) startTracking(firstTask.id);
    }
  };

  const upcomingDeadlines = tasks.filter(t => t.priority === 'URGENT' || t.priority === 'HIGH');

  const themes = [
    { id: 'dark', name: 'Dark Mode', icon: Moon },
    { id: 'light', name: 'Light Mode', icon: Sun },
    { id: 'emerald', name: 'Emerald SaaS', icon: Palette },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: Palette },
    { id: 'dracula', name: 'Dracula', icon: Palette },
    { id: 'sunset', name: 'Sunset Glow', icon: Palette },
  ];

  return (
    <header className="navbar sticky top-4 mx-6 my-2 rounded-2xl bg-base-100/80 backdrop-blur-2xl border border-base-300/80 shadow-[0_10px_30px_rgba(0,0,0,0.2)] z-40 px-6 min-h-[4.5rem] transition-all duration-300 font-sans">
      <div className="navbar-start flex items-center gap-6 w-auto">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-content font-black text-base shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-black text-xl tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">TaskFlow</span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-base-content/60 -mt-1">Enterprise</span>
          </div>
        </Link>

        {currentUser && (
          <div className="hidden sm:flex items-center gap-2 bg-base-200/80 border border-base-300 px-3 py-1.5 rounded-xl shadow-inner">
            {currentUser.role === 'admin' ? (
              <>
                <ShieldCheck className="w-4 h-4 text-error animate-pulse" />
                <span className="text-xs font-black text-base-content tracking-tight">👑 Admin Mode</span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-info animate-pulse" />
                <span className="text-xs font-black text-base-content tracking-tight">💼 Employee Portal</span>
              </>
            )}
          </div>
        )}

        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium ml-2">
          <Link href="/docs" className={`btn btn-ghost btn-sm font-medium hover:bg-base-200/60 rounded-lg transition-all ${pathname === '/docs' ? 'bg-primary/10 text-primary font-bold shadow-sm border border-primary/20' : 'text-base-content/70'}`}>Guides</Link>
          <Link href="/docs" className="btn btn-ghost btn-sm font-medium hover:bg-base-200/60 rounded-lg text-base-content/70 transition-all">Reference</Link>
        </nav>
      </div>

      <div className="navbar-center flex-1 max-w-lg mx-8 hidden lg:flex">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="btn btn-outline border-base-300/80 bg-base-200/50 hover:bg-base-200 hover:border-primary/40 text-base-content/70 hover:text-base-content btn-sm w-full h-10 px-4.5 flex items-center justify-between font-normal shadow-inner rounded-xl cursor-pointer group transition-all duration-300"
        >
          <span className="flex items-center gap-3">
            <Search className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors" />
            <span className="text-sm">Search enterprise tasks, docs, & guides...</span>
          </span>
          <span className="flex items-center gap-1.5 bg-base-100 border border-base-300/80 px-2.5 py-1 rounded-lg text-[11px] font-bold text-base-content/70 shadow-sm group-hover:border-primary/30 transition-colors font-mono">
            <Command className="w-3 h-3" /> K
          </span>
        </button>
      </div>

      <div className="navbar-end flex items-center gap-3.5 w-auto">
        <button 
          className={`btn btn-sm h-10 px-4 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-all duration-300 cursor-pointer ${isTracking ? 'btn-error shadow-error/20 animate-pulse' : 'btn-primary shadow-primary/20 hover:scale-105 active:scale-95'}`} 
          onClick={handleQuickTimer}
        >
          {isTracking ? <Square className="w-4 h-4 fill-current" /> : <Timer className="w-4 h-4" />} 
          {isTracking ? 'Stop Timer' : 'Quick Timer'}
        </button>

        <div className="h-5 w-[1px] bg-base-300 mx-0.5 hidden sm:block"></div>

        {/* DaisyUI Theme Selector Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm h-10 px-3 rounded-xl gap-2 normal-case font-semibold text-base-content/80 hover:text-base-content hover:bg-base-200/60 cursor-pointer transition-all duration-300" title="Select Theme">
            <Palette className="w-4 h-4 text-primary animate-bounce" />
            <span className="hidden lg:inline capitalize font-medium">{theme}</span>
          </div>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-200/95 backdrop-blur-2xl rounded-2xl w-56 z-[1] border border-base-300/80 gap-1 mt-3">
            <li className="menu-title px-3 py-1.5 text-[10px] font-extrabold text-base-content/50 uppercase tracking-wider">Design Themes</li>
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${theme === t.id ? 'bg-primary text-primary-content font-bold shadow-md shadow-primary/20' : 'hover:bg-base-300/60 text-base-content/80 hover:text-base-content'}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" /> {t.name}
                    </span>
                    {theme === t.id && <span className="badge badge-sm badge-ghost font-extrabold text-[10px]">ACTIVE</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Notifications Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm h-10 w-10 hover:bg-base-200/60 cursor-pointer transition-all duration-300" onClick={toggleNotifications}>
            <div className="indicator">
              <Bell className="w-4 h-4 text-base-content/80" />
              {upcomingDeadlines.length > 0 && (
                <span className="badge badge-error badge-xs indicator-item font-black shadow-lg shadow-error/30 animate-pulse w-4 h-4 flex items-center justify-center text-[10px]">
                  {upcomingDeadlines.length}
                </span>
              )}
            </div>
          </div>

          {isNotificationsOpen && (
            <div tabIndex={0} className="dropdown-content mt-3 w-80 bg-base-200/95 backdrop-blur-2xl border border-base-300/80 rounded-2xl shadow-2xl z-50 p-4 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center border-b border-base-300/80 pb-3">
                <strong className="text-sm font-extrabold text-base-content font-outfit tracking-tight">Notifications</strong>
                <span className="text-xs text-primary hover:underline cursor-pointer font-semibold" onClick={toggleNotifications}>Mark all read</span>
              </div>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                {upcomingDeadlines.length === 0 ? (
                  <div className="text-xs text-base-content/60 text-center py-6 font-medium">No pending urgent notifications</div>
                ) : (
                  upcomingDeadlines.map(t => (
                    <div key={t.id} className="flex items-start gap-3 text-xs p-3 bg-base-100/80 rounded-xl border border-base-300 shadow-sm hover:border-warning/40 transition-all duration-200 group">
                      <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col gap-1">
                        <strong className="text-base-content font-bold text-xs leading-snug">{t.name}</strong>
                        <span className="text-[11px] text-base-content/60 font-medium">Priority: <span className="text-warning font-semibold">{t.priority}</span> • Due: {t.dueDate}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-[1px] bg-base-300 mx-0.5 hidden sm:block"></div>

        {/* Sleek Logout Button */}
        <button 
          onClick={logout} 
          className="btn btn-outline btn-sm h-10 px-4 rounded-xl border-base-300 hover:bg-error hover:border-error hover:text-error-content text-base-content font-bold shadow-sm cursor-pointer transition-all duration-300 flex items-center gap-1.5"
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
