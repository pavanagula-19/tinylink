"use client";

import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <aside className="w-64">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1">
        <header className="h-24">
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
        <Toaster richColors position="top-right" />
      </div>
    </div>
  );
}
