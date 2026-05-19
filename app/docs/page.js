'use client';
import Link from 'next/link';
import { useTaskContext } from '@/context/TaskContext';
import { BookOpen, Database, Lock, Server, Cpu, Zap, Sparkles, Code, Terminal, ArrowRight, ExternalLink, Compass, ShieldCheck, HardDrive, RefreshCw } from 'lucide-react';

export default function Docs() {
  const { openNewTaskModal } = useTaskContext();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start animate-in fade-in duration-300 font-sans">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5 border-b border-base-300/80 pb-10">
          {/* DaisyUI Breadcrumbs */}
          <div className="breadcrumbs text-xs font-bold text-base-content/60 uppercase tracking-widest mb-1">
            <ul>
              <li><span>Enterprise Docs</span></li>
              <li><span>Guides</span></li>
              <li className="text-primary font-black"><span>Getting Started</span></li>
            </ul>
          </div>
          <h1 className="font-outfit text-6xl font-black text-base-content tracking-tight leading-none">Supabase Documentation</h1>
          <p className="text-xl text-base-content/70 font-normal max-w-2xl leading-relaxed">
            Explore our comprehensive guides and examples to build fully functional, secure, and highly scalable applications with Supabase.
          </p>
        </div>

        {/* Getting Started Section */}
        <section id="getting-started" className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2 border-b border-base-300/80 pb-4">
            <h2 className="font-outfit text-3xl font-black text-base-content tracking-tight">Getting Started</h2>
            <p className="text-base-content/70 text-base font-medium">Quickly set up your project or use our AI assistant to generate database schemas and serverless functions.</p>
          </div>
          <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-2xl hover:border-primary/60 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-300 group cursor-pointer" onClick={() => openNewTaskModal('TO DO')}>
            <div className="flex justify-between items-start gap-4 mb-8 border-b border-base-300/80 pb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md shadow-primary/10">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-outfit text-xl font-black text-base-content group-hover:text-primary transition-colors">Generate with AI Prompt</h3>
                  <p className="text-sm text-base-content/60 font-medium mt-0.5">Describe your project requirements and let AI build your schema, policies, and API endpoints instantly.</p>
                </div>
              </div>
              <span className="badge badge-primary font-black tracking-widest shadow-sm py-2 px-3 bg-primary/20 text-primary border border-primary/30 rounded-xl text-[10px]">RECOMMENDED</span>
            </div>
            <div className="bg-base-100/90 p-5 rounded-2xl border border-base-300 text-sm font-mono text-base-content/80 flex items-center justify-between shadow-inner gap-4">
              <span className="truncate">&quot;Create a task management system with urgent status tracking and assignee initials...&quot;</span>
              <span className="btn btn-primary btn-sm font-bold shadow-lg shadow-primary/20 h-10 px-5 rounded-xl flex-shrink-0">Generate</span>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2 border-b border-base-300/80 pb-4">
            <h2 className="font-outfit text-3xl font-black text-base-content tracking-tight">Products</h2>
            <p className="text-base-content/70 text-base font-medium">Explore the core building blocks of the Supabase open source Firebase alternative architecture.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
              <div>
                <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-primary mb-6 group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-sm shadow-primary/10">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-primary transition-colors">Database</h3>
                <p className="text-sm text-base-content/60 mb-8 leading-relaxed font-medium">Dedicated, fully managed Postgres database with auto-scaling, pgvector for AI, and automated backups.</p>
              </div>
              <div className="flex items-center text-xs font-black text-primary gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
                Explore Database <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-info/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
              <div>
                <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-info mb-6 group-hover:border-info group-hover:scale-110 transition-all duration-300 shadow-sm shadow-info/10">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-info transition-colors">Authentication</h3>
                <p className="text-sm text-base-content/60 mb-8 leading-relaxed font-medium">Add user signups, logins, enterprise SAML SSO, and Row Level Security authorization seamlessly.</p>
              </div>
              <div className="flex items-center text-xs font-black text-info gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
                Explore Auth <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-warning/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
              <div>
                <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-warning mb-6 group-hover:border-warning group-hover:scale-110 transition-all duration-300 shadow-sm shadow-warning/10">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-warning transition-colors">Storage</h3>
                <p className="text-sm text-base-content/60 mb-8 leading-relaxed font-medium">Store, organize, and serve large files and media assets with high availability and global CDN distribution.</p>
              </div>
              <div className="flex items-center text-xs font-black text-warning gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
                Explore Storage <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-success/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
              <div>
                <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-success mb-6 group-hover:border-success group-hover:scale-110 transition-all duration-300 shadow-sm shadow-success/10">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-success transition-colors">Realtime</h3>
                <p className="text-sm text-base-content/60 mb-8 leading-relaxed font-medium">Listen to database changes in realtime, broadcast live cursor positions, and synchronize application state.</p>
              </div>
              <div className="flex items-center text-xs font-black text-success gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
                Explore Realtime <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer md:col-span-2 flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
              <div>
                <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-primary mb-6 group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-sm shadow-primary/10">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-primary transition-colors">Edge Functions</h3>
                <p className="text-sm text-base-content/60 mb-8 leading-relaxed font-medium max-w-2xl">Globally distributed TypeScript functions executed at the edge with ultra-low latency and instant cold starts.</p>
              </div>
              <div className="flex items-center text-xs font-black text-primary gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
                Explore Edge Functions <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section id="modules" className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2 border-b border-base-300/80 pb-4">
            <h2 className="font-outfit text-3xl font-black text-base-content tracking-tight">Modules & Extensions</h2>
            <p className="text-base-content/70 text-base font-medium">Extend your Supabase project with powerful open-source database extensions and serverless workflows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
              <div>
                <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-primary mb-6 group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-sm shadow-primary/10">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-primary transition-colors">AI & Vectors (pgvector)</h3>
                <p className="text-xs text-base-content/60 mb-8 leading-relaxed font-medium">Store vector embeddings and build semantic search and generative AI applications directly in Postgres.</p>
              </div>
              <div className="flex items-center text-xs font-black text-primary gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
                Documentation <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-warning/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
              <div>
                <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-warning mb-6 group-hover:border-warning group-hover:scale-110 transition-all duration-300 shadow-sm shadow-warning/10">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-warning transition-colors">Cron Jobs (pg_cron)</h3>
                <p className="text-xs text-base-content/60 mb-8 leading-relaxed font-medium">Schedule periodic database maintenance tasks, automated reporting, and background workflows inside Postgres.</p>
              </div>
              <div className="flex items-center text-xs font-black text-warning gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
                Documentation <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-info/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
              <div>
                <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-info mb-6 group-hover:border-info group-hover:scale-110 transition-all duration-300 shadow-sm shadow-info/10">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-info transition-colors">Queues (pgmq)</h3>
                <p className="text-xs text-base-content/60 mb-8 leading-relaxed font-medium">High-performance, lightweight message queues built directly on Postgres tables for robust event processing.</p>
              </div>
              <div className="flex items-center text-xs font-black text-info gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
                Documentation <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* Client Libraries Section */}
        <section id="client-libraries" className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2 border-b border-base-300/80 pb-4">
            <h2 className="font-outfit text-3xl font-black text-base-content tracking-tight">Client Libraries</h2>
            <p className="text-base-content/70 text-base font-medium">Official and community-supported client libraries for integrating Supabase into your tech stack.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center gap-4" onClick={() => openNewTaskModal('TO DO')}>
              <span className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl bg-warning/20 text-warning border border-warning/30 shadow-md group-hover:scale-110 transition-transform">JS</span>
              <h3 className="font-outfit text-lg font-black text-base-content group-hover:text-primary transition-colors">JavaScript / TypeScript</h3>
              <p className="text-xs text-base-content/60 font-mono">@supabase/supabase-js</p>
            </div>
            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center gap-4" onClick={() => openNewTaskModal('TO DO')}>
              <span className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl bg-info/20 text-info border border-info/30 shadow-md group-hover:scale-110 transition-transform">FL</span>
              <h3 className="font-outfit text-lg font-black text-base-content group-hover:text-primary transition-colors">Flutter</h3>
              <p className="text-xs text-base-content/60 font-mono">supabase_flutter</p>
            </div>
            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center gap-4" onClick={() => openNewTaskModal('TO DO')}>
              <span className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl bg-secondary/20 text-secondary border border-secondary/30 shadow-md group-hover:scale-110 transition-transform">PY</span>
              <h3 className="font-outfit text-lg font-black text-base-content group-hover:text-primary transition-colors">Python</h3>
              <p className="text-xs text-base-content/60 font-mono">supabase-py</p>
            </div>
            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center gap-4" onClick={() => openNewTaskModal('TO DO')}>
              <span className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl bg-accent/20 text-accent border border-accent/30 shadow-md group-hover:scale-110 transition-transform">C#</span>
              <h3 className="font-outfit text-lg font-black text-base-content group-hover:text-primary transition-colors">C#</h3>
              <p className="text-xs text-base-content/60 font-mono">supabase-csharp</p>
            </div>
            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center gap-4" onClick={() => openNewTaskModal('TO DO')}>
              <span className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl bg-error/20 text-error border border-error/30 shadow-md group-hover:scale-110 transition-transform">SW</span>
              <h3 className="font-outfit text-lg font-black text-base-content group-hover:text-primary transition-colors">Swift</h3>
              <p className="text-xs text-base-content/60 font-mono">supabase-swift</p>
            </div>
            <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center gap-4" onClick={() => openNewTaskModal('TO DO')}>
              <span className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl bg-primary/20 text-primary border border-primary/30 shadow-md group-hover:scale-110 transition-transform">KT</span>
              <h3 className="font-outfit text-lg font-black text-base-content group-hover:text-primary transition-colors">Kotlin</h3>
              <p className="text-xs text-base-content/60 font-mono">supabase-kt</p>
            </div>
          </div>
        </section>

        {/* Migration Guides Section */}
        <section id="migration-guides" className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2 border-b border-base-300/80 pb-4">
            <h2 className="font-outfit text-3xl font-black text-base-content tracking-tight">Migration Guides</h2>
            <p className="text-base-content/70 text-base font-medium">Step-by-step documentation for migrating your existing database and authentication to Supabase.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Amazon RDS', 'Auth0', 'Firebase', 'Heroku', 'Neon', 'Vercel Postgres'].map((platform, idx) => (
              <div key={idx} className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 flex flex-row items-center justify-between group cursor-pointer" onClick={() => openNewTaskModal('TO DO')}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-base-100 border border-base-300 rounded-2xl text-base-content group-hover:border-primary group-hover:text-primary group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="font-outfit text-base font-black text-base-content group-hover:text-primary transition-colors">Migrate from {platform}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-base-content/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </section>

        {/* Self-Hosting Section */}
        <section id="self-hosting" className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex flex-col gap-2 border-b border-base-300/80 pb-4">
            <h2 className="font-outfit text-3xl font-black text-base-content tracking-tight">Self-Hosting</h2>
            <p className="text-base-content/70 text-base font-medium">Supabase is fully open source. Learn how to deploy and manage the entire stack on your own infrastructure.</p>
          </div>
          <div className="card bg-base-200/90 backdrop-blur-2xl border border-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between" onClick={() => openNewTaskModal('TO DO')}>
            <div>
              <div className="p-3.5 bg-base-100 border border-base-300 rounded-2xl w-fit text-primary mb-6 group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-sm shadow-primary/10">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="font-outfit text-xl font-black text-base-content mb-3 group-hover:text-primary transition-colors">Docker Compose Deployment</h3>
              <p className="text-sm text-base-content/60 mb-8 leading-relaxed font-medium max-w-2xl">Deploy Kong, GoTrue, PostgREST, Realtime, and Storage locally or on your cloud provider using Docker.</p>
            </div>
            <div className="flex items-center text-xs font-black text-primary gap-1.5 group-hover:translate-x-2 transition-transform uppercase tracking-wider pt-4 border-t border-base-300/60">
              View Self-Hosting Instructions <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Table of Contents */}
      <div className="sticky top-28 hidden lg:flex flex-col gap-5 bg-base-200/90 backdrop-blur-2xl border border-base-300 rounded-3xl p-6 shadow-2xl">
        <span className="text-xs font-extrabold text-base-content/60 uppercase tracking-widest px-2 mb-1 border-b border-base-300/80 pb-3">On this page</span>
        <ul className="menu bg-base-100/80 rounded-2xl p-2 gap-1.5 border border-base-300 shadow-inner text-xs font-bold">
          <li><button onClick={() => scrollTo('getting-started')} className="hover:bg-base-200 text-base-content/80 hover:text-base-content py-2.5 cursor-pointer rounded-xl">Getting Started</button></li>
          <li><button onClick={() => scrollTo('products')} className="hover:bg-base-200 text-base-content/80 hover:text-base-content py-2.5 cursor-pointer rounded-xl">Products</button></li>
          <li><button onClick={() => scrollTo('modules')} className="hover:bg-base-200 text-base-content/80 hover:text-base-content py-2.5 cursor-pointer rounded-xl">Modules & Extensions</button></li>
          <li><button onClick={() => scrollTo('client-libraries')} className="hover:bg-base-200 text-base-content/80 hover:text-base-content py-2.5 cursor-pointer rounded-xl">Client Libraries</button></li>
          <li><button onClick={() => scrollTo('migration-guides')} className="hover:bg-base-200 text-base-content/80 hover:text-base-content py-2.5 cursor-pointer rounded-xl">Migration Guides</button></li>
          <li><button onClick={() => scrollTo('self-hosting')} className="hover:bg-base-200 text-base-content/80 hover:text-base-content py-2.5 cursor-pointer rounded-xl">Self-Hosting</button></li>
        </ul>
        <div className="border-t border-base-300/80 pt-5 mt-2 flex flex-col gap-3 px-2">
          <Link href="https://github.com/supabase/supabase" target="_blank" className="flex items-center justify-between text-xs font-extrabold text-base-content/70 hover:text-base-content transition-colors cursor-pointer py-1 group">
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link href="https://github.com/supabase/supabase/discussions" target="_blank" className="flex items-center justify-between text-xs font-extrabold text-base-content/70 hover:text-base-content transition-colors cursor-pointer py-1 group">
            <span>Community Discussions</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
