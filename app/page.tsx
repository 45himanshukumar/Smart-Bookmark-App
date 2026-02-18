import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import BookmarkForm from '@/components/BookmarkForm';
import BookmarkList from '@/components/BookmarkList';
import Header from '@/components/Header'; //

export default async function Dashboard() {
  // Await the async createClient call
  const supabase = await createClient(); 
  const { data: { user } } = await supabase.auth.getUser();

  // Protect the route
  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Use the Client Component for the header and sign-out logic */}
        <Header /> 

        <BookmarkForm userId={user.id} />
        <BookmarkList userId={user.id} />
      </div>
    </main>
  );
}