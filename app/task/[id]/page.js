'use client';
import { useRouter } from 'next/navigation';
import { X, Edit3, Plus, Smile, Paperclip, Send, Info, User, AlertCircle, Calendar, Pause, Tag, Sparkles, CheckCircle } from 'lucide-react';

export default function TaskDetail({ params }) {
  const router = useRouter();
  
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start animate-in fade-in duration-300 font-sans">
      <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-3xl p-8 flex flex-col shadow-2xl">
        {/* DaisyUI Breadcrumbs */}
        <div className="breadcrumbs text-xs font-bold text-base-content/60 uppercase tracking-widest mb-6 border-b border-base-300/80 pb-4">
          <ul>
            <li><span>Enterprise Workspace</span></li>
            <li><span>Core Infrastructure</span></li>
            <li className="text-primary font-black"><span>Task & Document Review</span></li>
          </ul>
        </div>
        
        <div className="flex justify-between items-start mb-8 gap-4">
          <h1 className="font-outfit text-4xl font-black text-base-content leading-tight tracking-tight max-w-[85%]">Architectural Review of Data Migration Pipeline v2</h1>
          <button onClick={() => router.back()} className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-base-content cursor-pointer shadow-sm bg-base-100/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-10 p-6 bg-base-100/60 rounded-2xl border border-base-300/60 shadow-inner">
          <div className="flex justify-between items-center border-b border-base-300/80 pb-3 mb-4 text-xs font-extrabold text-base-content/60 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Info className="w-4 h-4 text-primary" /> Description / Documentation Content</span>
            <button className="btn btn-ghost btn-xs text-primary hover:bg-base-300 font-bold flex items-center gap-1 cursor-pointer rounded-lg"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
          </div>
          <p className="text-base leading-relaxed text-base-content/90 font-medium">
            The current data pipeline handles approximately 50k events per second. We need to evaluate the transition to the new stream-processing engine to handle peak loads of 150k. This review should cover data consistency protocols, latency overhead, and cost projections for the AWS Kinesis scaling.
          </p>
        </div>

        <div className="mb-10 p-6 bg-base-100/60 rounded-2xl border border-base-300/60 shadow-inner">
          <div className="flex justify-between items-center border-b border-base-300/80 pb-3 mb-6 text-xs font-extrabold text-base-content/60 uppercase tracking-widest">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Subtasks / Action Items (4)</span>
            <span className="badge badge-primary font-black tracking-widest shadow-sm py-1.5 px-2.5 bg-primary/20 text-primary border border-primary/30 rounded-xl">50% COMPLETE</span>
          </div>
          <div className="flex flex-col gap-3.5 mb-6">
            <label className="form-control flex flex-row items-center gap-4 cursor-pointer p-3 rounded-xl hover:bg-base-200/50 transition-colors border border-transparent hover:border-base-300/60">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded-lg shadow-sm" defaultChecked />
              <span className="label-text text-base text-base-content/50 line-through font-medium">Analyze existing latency bottlenecks</span>
            </label>
            <label className="form-control flex flex-row items-center gap-4 cursor-pointer p-3 rounded-xl hover:bg-base-200/50 transition-colors border border-transparent hover:border-base-300/60">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded-lg shadow-sm" defaultChecked />
              <span className="label-text text-base text-base-content/50 line-through font-medium">Draft new shard mapping strategy</span>
            </label>
            <label className="form-control flex flex-row items-center gap-4 cursor-pointer p-3 rounded-xl hover:bg-base-200/50 transition-colors border border-transparent hover:border-base-300/60">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded-lg shadow-sm" />
              <span className="label-text text-base text-base-content font-bold">Conduct load test in staging environment</span>
            </label>
            <label className="form-control flex flex-row items-center gap-4 cursor-pointer p-3 rounded-xl hover:bg-base-200/50 transition-colors border border-transparent hover:border-base-300/60">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded-lg shadow-sm" />
              <span className="label-text text-base text-base-content font-bold">Finalize cost estimation spreadsheet</span>
            </label>
          </div>
          <button className="btn btn-outline btn-sm border-base-300 hover:border-primary text-base-content hover:text-primary font-bold flex items-center gap-1.5 cursor-pointer self-start rounded-xl shadow-sm">
            <Plus className="w-4 h-4 stroke-[3]" /> Add a subtask
          </button>
        </div>

        <div className="flex items-center bg-base-100/90 border border-base-300 rounded-2xl px-4 py-2.5 gap-3 focus-within:border-primary/60 transition-colors shadow-md">
          <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content"><Smile className="w-4 h-4" /></button>
          <input type="text" placeholder="Write a comment or AI prompt..." className="input w-full bg-transparent border-none text-sm text-base-content focus:outline-none px-1 h-10 font-medium" />
          <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content"><Paperclip className="w-4 h-4" /></button>
          <button className="btn btn-primary btn-sm btn-circle shadow-lg shadow-primary/30 cursor-pointer hover:scale-105 active:scale-95 transition-transform w-10 h-10 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Status Summary Card */}
        <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><Info className="w-4 h-4 text-primary" /> Status</span>
            <span className="badge badge-neutral font-black tracking-widest shadow-sm py-2 px-3 bg-base-300 border-base-300 text-base-content/80 rounded-xl">IN REVIEW</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><User className="w-4 h-4 text-primary" /> Assignee</span>
            <span className="font-bold text-sm text-base-content flex items-center gap-2.5">Alex Miller <div className="w-7 h-7 bg-primary rounded-xl shadow-sm shadow-primary/30 flex items-center justify-center text-[10px] font-black text-primary-content">AM</div></span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><AlertCircle className="w-4 h-4 text-primary" /> Priority</span>
            <span className="font-black text-xs text-error flex items-center gap-1 bg-error/15 px-3 py-1 rounded-xl border border-error/30 shadow-sm">🚨 URGENT</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-base-300 last:border-none">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><Calendar className="w-4 h-4 text-primary" /> Due Date</span>
            <span className="font-bold text-sm text-base-content">Oct 24, 2023</span>
          </div>
        </div>

        {/* Breathtaking Live Tracking Panel */}
        <div className="card bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-content rounded-3xl p-8 flex flex-col shadow-[0_20px_50px_rgba(16,185,129,0.3)] relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-widest font-black opacity-90 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" /> Live Time Tracking
            </span>
            <span className="badge badge-ghost font-black tracking-widest py-1.5 px-3 bg-white/20 border-white/30 text-white rounded-xl shadow-sm">IN PROGRESS</span>
          </div>
          
          <div className="flex justify-between items-center mb-10">
            <span className="font-outfit text-5xl font-black font-mono tracking-tight drop-shadow-md">04:12:45</span>
            <button className="btn btn-circle bg-base-100 text-base-content border-none hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer w-14 h-14 flex items-center justify-center">
              <Pause className="w-6 h-6 fill-current" />
            </button>
          </div>

          <div className="card bg-base-100 text-base-content rounded-2xl p-6 flex flex-col gap-6 shadow-2xl border border-base-300">
            <div>
              <div className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest mb-2.5">Manual Entry</div>
              <div className="flex gap-3">
                <input type="text" placeholder="0h 00m" className="input input-bordered w-full bg-base-200/80 text-sm focus:border-primary text-base-content h-12 rounded-xl shadow-inner font-medium" />
                <button className="btn btn-primary h-12 px-6 font-bold shadow-lg shadow-primary/20 cursor-pointer rounded-xl">LOG</button>
              </div>
            </div>

            <div>
              <div className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest mb-4">Team Contribution</div>
              <div className="flex flex-col gap-3.5">
                <div className="flex justify-between items-center text-sm font-medium p-2.5 bg-base-200/50 rounded-xl border border-base-300/60">
                  <div className="flex items-center gap-3 font-bold text-base-content">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-black shadow-sm text-primary">AM</div>
                    Alex M.
                  </div>
                  <div className="font-black text-base-content">12.5h</div>
                </div>
                <div className="flex justify-between items-center text-sm font-medium p-2.5 bg-base-200/50 rounded-xl border border-base-300/60">
                  <div className="flex items-center gap-3 font-bold text-base-content">
                    <div className="w-8 h-8 rounded-xl bg-info/10 border border-info/20 flex items-center justify-center text-[11px] font-black shadow-sm text-info">SJ</div>
                    Sarah J.
                  </div>
                  <div className="font-black text-base-content">4.2h</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-base-300/80 font-black uppercase text-xs tracking-widest">
              <span className="text-base-content/60">Total Spent</span>
              <span className="font-outfit text-xl text-primary font-black">19.5h</span>
            </div>
          </div>
        </div>
        
        {/* Labels Card */}
        <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-3xl p-6 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-5 border-b border-base-300/80 pb-3">
            <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest flex items-center gap-2.5"><Tag className="w-4 h-4 text-primary" /> Labels</span>
            <button className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content cursor-pointer shadow-sm bg-base-100/50"><Plus className="w-4 h-4 stroke-[3]" /></button>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <span className="badge badge-neutral font-black tracking-widest py-3 px-3.5 bg-base-300 border-base-300/80 text-base-content shadow-sm rounded-xl text-[10px]">INFRASTRUCTURE</span>
            <span className="badge badge-neutral font-black tracking-widest py-3 px-3.5 bg-base-300 border-base-300/80 text-base-content shadow-sm rounded-xl text-[10px]">BACKEND</span>
          </div>
        </div>
      </div>
    </div>
  );
}
