"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Habitat & Cages", href: "/cages" },
  // { label: "Organic Diets", href: "/diets" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const transparentPages = ["/cages", "/diets"];
  const isPageNoNav = transparentPages.includes(pathname);

  return (
    <header
      className={`sticky top-0 z-50 ${
        isPageNoNav ? "bg-transparent border-0" : "border-b border-neutral-800 bg-neutral-950/90"
      } backdrop-blur-xs`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="font-headline text-2xl font-extrabold tracking-tight text-primary-400"
          onClick={() => setIsOpen(false)}
        >
          MOFARMS
        </Link>

        {/* Links (desktop) */}
        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-body relative pb-1 text-sm transition-colors ${
                    isActive
                      ? "text-primary-400"
                      : "text-neutral-300 hover:text-neutral-50"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-px left-0 h-0.5 w-full bg-primary-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side (desktop) */}
        <div className="hidden items-center gap-4 md:flex">
          <Button className="rounded-full bg-secondary-500 px-6 text-white hover:bg-secondary-600">
            Contact Us
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-full p-2 text-neutral-200 hover:bg-neutral-800/60 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xs transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-body block rounded-lg px-3 py-3 text-base transition-colors ${
                    isActive
                      ? "bg-neutral-800/60 text-primary-400"
                      : "text-neutral-300 hover:bg-neutral-800/40 hover:text-neutral-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <Button
              className="w-full rounded-full bg-secondary-500 text-white hover:bg-secondary-600"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}