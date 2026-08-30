import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  ScanLine,
  ShieldAlert,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import threatlensLogo from "../assets/threatlens-logo.png";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const storedUser =
    localStorage.getItem("threatlens_user") ||
    sessionStorage.getItem("threatlens_user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const navigation = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Scans",
      path: "/new-scan",
      icon: ScanLine,
    },
    {
      name: "Findings",
      path: "/findings",
      icon: ShieldAlert,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-white">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-zinc-800 bg-[#09090B] transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-5">
          <Link
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2.5"
          >

            {/* Custom ThreatLens Logo */}
            <div className="flex h-8 w-8 items-center justify-center">
              <img
                src={threatlensLogo}
                alt="ThreatLens"
                className="h-8 w-8 object-contain"
              />
            </div>

            {/* Brand Name */}
            <span className="text-lg font-semibold tracking-tight">
              Threat<span className="text-blue-500">Lens</span>
            </span>
          </Link>

          {/* Mobile close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-zinc-500 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">

          <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
            Workspace
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`mb-1 flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-sm transition ${
                  active
                    ? "border-blue-500 bg-blue-500/5 font-medium text-blue-400"
                    : "border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <Icon size={17} />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-zinc-800 p-3">
          <div className="flex items-center gap-3 px-2 py-2">

            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
              {user?.name
                ? user.name
                    .split(" ")
                    .map(
                      (part: string) => part[0]
                    )
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "TL"}
            </div>

            {/* User information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-200">
                {user?.name || "ThreatLens User"}
              </p>

              <p className="truncate text-xs text-zinc-600">
                {user?.email || "Security Analyst"}
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.removeItem(
                  "threatlens_token"
                );

                localStorage.removeItem(
                  "threatlens_user"
                );

                sessionStorage.removeItem(
                  "threatlens_token"
                );

                sessionStorage.removeItem(
                  "threatlens_user"
                );

                window.location.href = "/login";
              }}
              title="Sign out"
              className="text-zinc-600 transition hover:text-red-400"
            >
              <LogOut size={16} />
            </button>

          </div>
        </div>

      </aside>

      {/* Main */}
      <main className="lg:ml-60">

        {/* Mobile header */}
        <header className="flex h-16 items-center border-b border-zinc-800 px-5 lg:hidden">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-zinc-400 hover:text-white"
          >
            <Menu size={21} />
          </button>

          {/* Mobile logo */}
          <img
            src={threatlensLogo}
            alt="ThreatLens"
            className="ml-4 h-7 w-7 object-contain"
          />

          <span className="ml-2 text-sm font-semibold">
            ThreatLens
          </span>

        </header>

        {/* Current page */}
        <Outlet />

      </main>

    </div>
  );
};

export default DashboardLayout;