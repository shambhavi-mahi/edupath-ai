"use client";

import Link from "next/link";
import { useApp } from "@/contexts/AppContext";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { darkMode, toggleDarkMode } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/assessment", label: "Assessment" },
    { href: "/exams",      label: "Exams" },
    { href: "/colleges",   label: "Colleges" },
    { href: "/careers",    label: "Careers" },
    { href: "/dashboard",  label: "Dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-soft">
              <span className="text-white font-poppins font-bold text-sm">EP</span>
            </div>
            <span className="font-poppins font-bold text-xl text-text">
              EduPath <span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-dmsans text-sm text-text-muted hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-cream transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode
                ? <Sun  className="w-5 h-5 text-amber-500" />
                : <Moon className="w-5 h-5 text-text-muted" />}
            </button>

            <Link
              href="/auth/signin"
              className="hidden sm:inline-flex font-dmsans text-sm text-text-muted hover:text-primary transition-colors px-3 py-2"
            >
              Login
            </Link>

            <Link
              href="/assessment"
              className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5"
            >
              Get Started
            </Link>

            <button
              className="md:hidden p-2 rounded-xl hover:bg-cream transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height:0, opacity:0 }}
            animate={{ height:"auto", opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.25 }}
            className="md:hidden border-t border-border bg-white overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-dmsans text-text-muted hover:text-primary py-2.5 px-3 rounded-xl hover:bg-cream transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/assessment" className="btn-primary text-center mt-2" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
