'use client'; // This is required for interactivity

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Header() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refresh to trigger the redirect in page.tsx
  };

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Smart Bookmarks</h1>
      <button 
        onClick={handleSignOut}
        className="text-sm text-red-600 hover:underline cursor-pointer"
      >
        Sign Out
      </button>
    </header>
  );
}