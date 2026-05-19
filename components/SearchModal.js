'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import { Search as SearchIcon, Command, ArrowRight, FileText, CheckCircle, Clock } from 'lucide-react';

export default function SearchModal() {
  const router = useRouter();
  const { isSearchModalOpen, setIsSearchModalOpen, searchQuery, setSearchQuery, tasks } = useTaskContext();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  useEffect(() => {
    if (isSearchModalOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (taskId) => {
    setIsSearchModalOpen(false);
    router.push(`/task/${taskId}`);
  };

  return (
    <div className="modal modal-open backdrop-blur-sm bg-base-100/40">
      <div className="modal-box bg-base-200/95 backdrop-blur-3xl border border-base-300/80 p-0 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-w-2xl rounded-3xl animate-in fade-in zoom-in-95 duration-200">
        <div className="relative border-b border-base-300/80 bg-base-100/50 flex items-center">
          <SearchIcon className="w-6 h-6 text-primary absolute left-5 pointer-events-none animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search enterprise tasks, docs, & guides (Cmd + K)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full bg-transparent h-16 pl-16 pr-16 text-lg text-base-content border-none focus:outline-none focus:ring-0 placeholder:text-base-content/40 font-medium"
          />
          <button 
            onClick={() => setIsSearchModalOpen(false)} 
            className="btn btn-ghost btn-sm btn-circle absolute right-4 text-base-content/50 hover:text-base-content cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 max-h-[400px] overflow-y-auto flex flex-col gap-2">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center text-base-content/50 text-sm font-medium">
              No results found for &quot;<span className="text-primary font-bold">{searchQuery}</span>&quot;
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleSelect(task.id)}
                className="flex items-center justify-between p-4 rounded-2xl bg-base-100/60 border border-base-300/60 hover:border-primary/50 hover:bg-base-100 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                    {task.status === 'DONE' ? <CheckCircle className="w-5 h-5 text-success" /> : <FileText className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-base-content group-hover:text-primary transition-colors">{task.name}</span>
                    <span className="text-xs text-base-content/60 line-clamp-1">{task.description}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`badge badge-sm font-bold ${task.priority === 'URGENT' ? 'badge-error' : 'badge-ghost'}`}>
                    {task.priority}
                  </span>
                  <ArrowRight className="w-4 h-4 text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-base-300/40 px-6 py-3 border-t border-base-300/80 flex items-center justify-between text-xs text-base-content/60 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><kbd className="kbd kbd-xs shadow-sm font-mono">↑</kbd><kbd className="kbd kbd-xs shadow-sm font-mono">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1.5"><kbd className="kbd kbd-xs shadow-sm font-mono">esc</kbd> to close</span>
          </div>
          <span className="font-bold text-[10px] uppercase tracking-wider text-primary">Enterprise Global Search</span>
        </div>
      </div>
    </div>
  );
}
