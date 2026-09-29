"use client";

import { useRouter, notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { animals } from "@/lib/data";

export default function AnimalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const animal = animals.find((a) => a.id === id);
  if (!animal) return notFound();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={() => router.back()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900"
      >
        {/* Close button */}
        <button
          onClick={() => router.back()}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950/70 text-neutral-300 backdrop-blur-md transition-colors hover:bg-neutral-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-4/5 max-h-[85vh] w-full">
          <Image
            src={animal.image}
            alt={animal.name}
            fill
            sizes="(max-width: 768px) 100vw, 42rem"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}