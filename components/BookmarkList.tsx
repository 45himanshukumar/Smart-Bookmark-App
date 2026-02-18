'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Trash2, ExternalLink } from 'lucide-react';

export default function BookmarkList({ userId }: { userId: string }) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setBookmarks(data || []);
  };
  fetchBookmarks();

    // 2. Real-time Subscription
    // Note: We handle the user filtering inside the callback to ensure reliability
   const channel = supabase
    .channel('realtime-bookmarks')
    .on('postgres_changes', 
      { 
        event: '*', // Listen for INSERT, UPDATE, and DELETE
        schema: 'public', 
        table: 'bookmarks',
        filter: `user_id=eq.${userId}` // Only listen for this user's data
      }, 
      (payload) => {
        if (payload.eventType === 'INSERT') {
          // Add the new bookmark to the top of the list instantly
          setBookmarks((prev) => [payload.new, ...prev]);
        } else if (payload.eventType === 'DELETE') {
          // Remove the deleted bookmark instantly
          setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
        }
      }
    )
    .subscribe();

    return () => { 
      supabase.removeChannel(channel); 
    };
  }, [userId, supabase]);

  // Function to handle manual deletion
  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting bookmark:', error.message);
    }
  };

  return (
    <div className="space-y-3">
      {bookmarks.length === 0 ? (
        <p className="text-center text-slate-500 py-10">No bookmarks yet.</p>
      ) : (
        bookmarks.map((bookmark) => (
          <div 
            key={bookmark.id} 
            className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md group"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900">{bookmark.title}</span>
              <a 
                href={bookmark.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1"
              >
                {bookmark.url} <ExternalLink size={12} />
              </a>
            </div>
            <button 
              onClick={() => deleteBookmark(bookmark.id)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Bookmark"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}