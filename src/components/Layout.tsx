import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Strona główna" },
  { to: "/o-nas", label: "O nas" },
  { to: "/oferta", label: "Oferta" },
  { to: "/wycena", label: "Wycena" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-border ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft"
          : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="InvestMax" className="h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
                activeProps={{ className: "px-4 py-2 text-sm font-medium text-foreground relative group" }}
              >
                {item.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
            <Link
              to="/kontakt"
              className="ml-4 inline-flex items-center rounded-md bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Skontaktuj się
            </Link>
          </nav>

          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="lg:hidden pb-6 flex flex-col gap-1 border-t border-border pt-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-secondary rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img src={logo} alt="InvestMax" className="h-12 w-auto mb-4" />
            <p className="text-sm text-dark-muted leading-relaxed">
              Profesjonalne zarządzanie nieruchomościami od 2009 roku.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Nawigacja</h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-dark-muted hover:text-brand-red transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-dark-muted">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-brand-red" /> ul. Trudna 2, Bochnia</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-brand-red" /> <a href="tel:792790263" className="hover:text-dark-foreground">792 790 263</a></li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-brand-red" /> <a href="mailto:biuro@invest-max.pl" className="hover:text-dark-foreground">biuro@invest-max.pl</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-dark-muted text-center">
          © {new Date().getFullYear()} InvestMax — mgr inż. Joanna Przetakiewicz. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}

function MobileCallButton() {
  return (
    <a
      href="tel:792790263"
      className="lg:hidden fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-red text-white shadow-elegant hover:scale-105 transition-transform"
      aria-label="Zadzwoń"
    >
      <Phone size={22} />
    </a>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileCallButton />
    </div>
  );
}
