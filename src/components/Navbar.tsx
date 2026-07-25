import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "leadership", label: "Leadership" },
  { id: "awards", label: "Awards" },
  { id: "teaching", label: "Teaching" },
  { id: "talks", label: "Talks" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Samkit<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                className={cn(
                  "text-sm transition-colors duration-300",
                  active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </a>
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 right-0 h-px bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors duration-300 hover:border-accent/60 hover:text-accent md:inline-flex"
          >
            Get in touch
          </a>
          <button onClick={() => setOpen(true)} className="text-foreground md:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-display text-lg font-semibold">
                Samkit<span className="text-accent">.</span>
              </span>
              <button onClick={() => setOpen(false)} className="text-foreground" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-1 px-6 pt-8">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-3xl font-medium text-foreground"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
