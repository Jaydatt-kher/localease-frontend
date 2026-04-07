import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import { AdminSidebar } from "./AdminSidebar";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {}
      <Navbar hideSearch={true} title="Admin Dashboard" />

      {}
      <div className="flex" style={{ minHeight: "calc(100vh - 68px)" }}>

        {}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {}
        <main className="flex-1 min-w-0 transition-all duration-300">
          {}
          <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
            {}
            <div className="sticky top-[68px] z-20 px-4 py-2 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border dark:border-border-dark flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen((p) => !p)}
                className="p-1.5 rounded-lg border border-border dark:border-border-dark
                  text-muted dark:text-muted-dark
                  hover:bg-surface-light dark:hover:bg-surface-dark
                  hover:border-primary hover:text-primary dark:hover:text-blue-400
                  transition-colors"
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
              <span className="text-xs font-body text-muted dark:text-muted-dark hidden sm:block">
                {sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              </span>
            </div>

            {}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
