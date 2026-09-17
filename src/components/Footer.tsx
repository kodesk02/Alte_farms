import Link from "next/link";

const footerLinks = [
  { label: "Conservation", href: "/conservation" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
        {/* Logo */}
        <h2 className="font-headline bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text text-4xl font-extrabold text-transparent lg:text-5xl">
          MOFARMS
        </h2>

        {/* Tagline */}
        <p className="font-body mx-auto mt-4 max-w-md text-neutral-400">
          Preserving the extraordinary. A premier sanctuary for nature&apos;s
          most vibrant and majestic creations.
        </p>

        {/* Links */}
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-neutral-400 transition-colors hover:text-neutral-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-auto mt-14 h-px w-full max-w-7xl bg-neutral-800" />

        {/* Copyright */}
        <p className="font-label mt-8 text-xs tracking-wide text-neutral-600">
          © 2024 MOFARMS Exotic Sanctuary. All rights reserved.
        </p>
      </div>
    </footer>
  );
}