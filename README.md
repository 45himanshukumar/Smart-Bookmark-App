# 📚 Smart Bookmark App

A modern, full-stack bookmark manager built with **Next.js 16**, **Supabase**, and **Tailwind CSS**. This application allows users to save, manage, and sync their bookmarks in real-time across devices, with strict data privacy.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_16_%7C_Supabase_%7C_Tailwind-blue)

## ✨ Features

* **🔐 Secure Authentication**: Google OAuth login (Glassmorphism UI).
* **🛡️ Data Privacy**: Row Level Security (RLS) ensures users can *only* see and manage their own bookmarks.
* **⚡ Real-time Sync**: Instant updates across multiple tabs/windows when adding or deleting bookmarks (no refresh required).
* **🗑️ Instant Deletion**: Real-time removal of bookmarks using PostgreSQL Replica Identity.
* **📱 Responsive Design**: Built with Tailwind CSS for a seamless mobile and desktop experience.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Language**: TypeScript
* **Database & Auth**: [Supabase](https://supabase.com/)
* **Styling**: Tailwind CSS
* **Icons**: Lucide React

---

## 🧠 Challenges & Solutions (Assessment Requirements)

During the development of this 72-hour challenge, I encountered and solved the following technical hurdles:

### 1. Interactivity in Server Components
* **Problem**: When adding the "Sign Out" button to the main dashboard, I received the error: `Event handlers cannot be passed to Client Component props`. This happened because `page.tsx` is a Server Component and cannot handle `onClick` events.
* **Solution**: I extracted the header and sign-out logic into a dedicated Client Component (`components/Header.tsx`) using the `'use client'` directive. This allowed the button to function interactively while keeping the main page server-rendered.

### 2. Real-time Deletions Not Updating
* **Problem**: While `INSERT` events updated the UI instantly, `DELETE` events did not remove the bookmark from the screen without a manual page refresh.
* **Solution**: I discovered that Supabase/PostgreSQL does not send the `old` record data (the deleted ID) by default. I ran the SQL command `ALTER TABLE bookmarks REPLICA IDENTITY FULL;`, which forced the database to send the deleted row's ID to the frontend, allowing the UI to update instantly.

### 3. Real-time Publication Issues
* **Problem**: Initially, the app was not receiving any real-time events despite correct code.
* **Solution**: The table was not correctly added to the `supabase_realtime` publication. I reset the publication using:
    ```sql
    ALTER PUBLICATION supabase_realtime DROP TABLE bookmarks;
    ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;
    ```

---

## 🗄️ Database Schema

The application uses a single table `bookmarks` in Supabase:

```sql
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  title text not null,
  url text not null,
  user_id uuid references auth.users(id) on delete cascade not null
);
