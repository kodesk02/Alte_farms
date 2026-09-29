"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Animal, animals, Category } from "@/lib/data";

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Birds", value: "birds" },
  { label: "Small Mammals", value: "small-mammals" },
  { label: "Poultry", value: "poultry" },
  { label: "Rare Breeds", value: "rare-breeds" },
];

const PAGE_SIZE = 5;

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredAnimals = useMemo(() => {
    if (activeFilter === "all") return animals;
    return animals.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

  const visibleAnimals = useMemo(
    () => filteredAnimals.slice(0, visibleCount),
    [filteredAnimals, visibleCount],
  );

  const hasMore = visibleCount < filteredAnimals.length;

  const handleFilterChange = (value: Category) => {
    setActiveFilter(value);
    setVisibleCount(PAGE_SIZE); // reset to the first 10 when the filter changes
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + PAGE_SIZE);

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-headline text-6xl font-extrabold text-primary-400 lg:text-7xl">
          Our Sanctuary Gallery
        </h1>
        <p className="font-body mt-6 text-lg leading-relaxed text-neutral-300">
          Explore the majestic beauty of our exotic residents. Each photograph
          captures the vibrant essence and unique personality of the animals
          under our care, set against the backdrop of their carefully curated
          natural habitats.
        </p>
      </div>

      {/* Filter pills */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`font-label rounded-full border px-5 py-2 text-xs tracking-wide transition-colors ${
                isActive
                  ? "border-primary-500 text-primary-400"
                  : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200"
              }`}
            >
              {filter.label.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </AnimatePresence>
      </div>

      {filteredAnimals.length === 0 && (
        <p className="font-body mt-16 text-center text-neutral-500">
          No animals found in this category yet.
        </p>
      )}

      {/* Load more */}
      {hasMore ? (
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="font-label text-xs tracking-wider text-neutral-400">
            SHOWING {visibleAnimals.length} OF {filteredAnimals.length}
          </p>
          <button
            onClick={handleLoadMore}
            className="font-label rounded-full bg-primary-500 px-10 py-4 text-sm font-bold tracking-widest text-neutral-950 shadow-lg shadow-primary-500/30 transition-all hover:scale-105 hover:bg-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            LOAD MORE
          </button>
        </div>
      ) : (
        filteredAnimals.length > 0 && (
          <p className="font-label mt-16 text-center text-xs tracking-wider text-neutral-500">
            THIS IS EVERYTHING FOR NOW
          </p>
        )
      )}
    </main>
  );
}

function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={animal.tall ? "md:row-span-2" : ""}
    >
      <Link
        href={`/gallery/${animal.id}`}
        className="group relative block overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900"
      >
        <div
          className={`group relative w-full overflow-hidden rounded-2xl ${animal.tall ? "aspect-3/4 md:h-full" : "aspect-4/3"}`}
        >
          <Image
            src={animal.image}
            alt={animal.name}
            fill
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="rounded-2xl border border-primary-500/40 bg-primary-500/10 p-5 backdrop-blur-md">
              {animal.rare && (
                <span className="font-label mb-2 inline-block rounded-full border border-tertiary-500/40 bg-tertiary-900/60 px-3 py-1 text-xs text-tertiary-300">
                  Rare
                </span>
              )}
              <h3 className="font-headline text-3xl font-bold text-primary-400">
                {animal.name}
              </h3>
              <p className="font-label mt-1.5 text-xs tracking-wider text-neutral-300">
                {animal.location} \ SPEC. {animal.spec}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
