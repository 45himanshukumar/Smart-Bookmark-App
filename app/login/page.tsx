'use client';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const supabase = createClient();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/auth/callback`,
        // ADD THIS LINE BELOW to force the account picker every time
        queryParams: {
          prompt: 'select_account',
        },
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-slate-950">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/20 blur-[100px]" />
      </div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md p-1 bg-gradient-to-b from-white/10 to-transparent rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="p-10 bg-slate-900/80 rounded-[calc(1.5rem-1px)] text-center border border-white/5">
          {/* Logo Placeholder */}
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>

          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white">
            Smart Bookmark
          </h1>
          <p className="mb-10 text-slate-400 font-medium">
            The intelligent way to manage and sync your digital world.
          </p>

          <button 
            onClick={handleLogin}
            className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              className="w-5 h-5 transition-transform group-hover:rotate-12" 
              alt="Google" 
            />
            Continue with Google
          </button>

          <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-bold">
            Google OAuth Only
          </p>
        </div>
      </div>
      
      {/* Footer Branding */}
      <p className="relative z-10 mt-8 text-sm text-slate-500">
        Privacy first. Each bookmark is private to you.
      </p>
    </div>
  );
}