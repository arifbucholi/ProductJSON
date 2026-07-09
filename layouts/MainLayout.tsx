import { Link, NavLink, Outlet } from "react-router-dom";
import { Moon, ShoppingCart, Heart } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  // { label: "Wishlist", path: "/wishlist" },
  { label: <span><ShoppingCart size={18} /></span>, path: "/cart" },
  { label: <span><Heart size={18} /></span>, path: "/favorite" },
];

function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight transition hover:opacity-70"
          >
            <Moon size={22} strokeWidth={1.75} className="text-zinc-900" />
            <span>MoonStore</span>
          </Link>

          <nav className="flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive ? "text-black" : "text-zinc-500 hover:text-black"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
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
