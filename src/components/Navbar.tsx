"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Habitat & Cages", href: "/cages" },
  // { label: "Organic Diets", href: "/diets" },
];

export function Navbar() {
  const pathname = usePathname();

  const transparentPages = ["/cages", "/diets"];
  const isPageNoNav = transparentPages.includes(pathname);

  return (
    <header className={`sticky top-0 z-50  ${isPageNoNav ? "bg-transparent border-0" : "border-b border-neutral-800 bg-neutral-950/90"} backdrop-blur-xs`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="font-headline text-2xl font-extrabold tracking-tight text-primary-400"
        >
          MOFARMS
        </Link>

        {/* Links */}
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

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Button className="rounded-full bg-secondary-500 px-6 text-white hover:bg-secondary-600">
            Contact Us
          </Button>
      
        </div>
      </nav>
    </header>
  );
}