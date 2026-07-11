import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Moon, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Cart", path: "/cart" },
  { label: "Favorite", path: "/favorite" },
];

function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight transition hover:opacity-70"
          >
            <Moon size={22} strokeWidth={1.75} />
            <span>MoonStore</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive
                      ? "text-black"
                      : "text-zinc-500 hover:text-black"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 transition hover:bg-zinc-100 md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            open ? "max-h-80 border-t border-zinc-200" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col bg-white px-6 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="min-h-[calc(100vh-64px-120px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 MoonStore.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="transition hover:text-black">
              Privacy
            </a>

            <a href="#" className="transition hover:text-black">
              Terms
            </a>

            <a href="#" className="transition hover:text-black">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;