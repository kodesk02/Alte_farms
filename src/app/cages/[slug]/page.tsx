"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { enclosures } from "@/lib/data";

export default function EnclosureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const enclosure = enclosures.find((e) => e.slug === slug);
  if (!enclosure) return notFound();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={() => router.back()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 md:flex-row"
      >
        {/* Close button */}
        <button
          onClick={() => router.back()}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950/70 text-neutral-300 backdrop-blur-md transition-colors hover:bg-neutral-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left half — image */}
        <div className="relative h-64 w-full shrink-0 md:h-auto md:w-1/2">
          <Image
            src={enclosure.image}
            alt={enclosure.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="font-label absolute left-4 top-4 rounded-full border border-primary-500/40 bg-neutral-950/70 px-3 py-1 text-[10px] uppercase tracking-widest text-primary-300 backdrop-blur-sm">
            {enclosure.tag}
          </span>
        </div>

        {/* Right half — info */}
        <div className="flex w-full flex-col overflow-y-auto p-8 md:w-1/2 md:p-10">
          <h2 className="font-headline text-3xl font-extrabold text-neutral-50 lg:text-4xl">
            {enclosure.name}
          </h2>
          <p className="font-body mt-4 text-neutral-300">
            {enclosure.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-neutral-800 pt-6">
            {enclosure.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span className="font-label uppercase tracking-wide text-neutral-500">
                  {spec.label}
                </span>
                <span className="font-body text-right text-neutral-200">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto flex gap-3 pt-8">
            <Button
              className="h-12 flex-1 rounded-full bg-secondary-500 hover:bg-secondary-600"
            >
              <Link href="/contact">Enquire About This Enclosure</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}