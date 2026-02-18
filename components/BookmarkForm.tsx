'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function BookmarkForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('bookmarks').insert([{ title, url, user_id: userId }]);
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <input
        type="text"
        placeholder="Bookmark Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Add Bookmark
      </button>
    </form>
  );
}