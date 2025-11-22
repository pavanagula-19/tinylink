"use client";

import Header from "@/components/header";
import { Toaster } from "sonner";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center">
          <Header />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto mt-2 px-3 sm:px-6 lg:px-8 pb-10">
        {children}
      </main>

      <Toaster richColors position="top-right" />
    </div>
  );
}
