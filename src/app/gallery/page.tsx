"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Category = "all" | "birds" | "small-mammals" | "poultry" | "rare-breeds";

type Animal = {
  id: string;
  name: string;
  location: string;
  spec: string;
  image: string;
  category: Exclude<Category, "all">;
  rare?: boolean;
  tall?: boolean;
};

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Birds", value: "birds" },
  { label: "Small Mammals", value: "small-mammals" },
  { label: "Poultry", value: "poultry" },
  { label: "Rare Breeds", value: "rare-breeds" },
];

const animals: Animal[] = [
  {
    id: "scarlet-macaw",
    name: "Scarlet Macaw",
    location: "AVIARY",
    spec: "A01",
    image: "/images/parrot.jpg",
    category: "birds",
  },
  {
    id: "angora-rabbit",
    name: "Angora Rabbit",
    location: "MEADOW",
    spec: "M14",
    image: "/images/rabbit.jpg",
    category: "small-mammals",
  },
  {
    id: "nigerian-dwarf-goat",
    name: "Nigerian Dwarf Goat",
    location: "HIGHLANDS",
    spec: "G07",
    image: "/images/dwarf-goat.jpg",
    category: "rare-breeds",
    rare: true,
    tall: true,
  },
  {
    id: "ayam-cemani",
    name: "Ayam Cemani",
    location: "COOP",
    spec: "C99",
    image: "/images/black-chicken.jpg",
    category: "poultry",
  },
  {
    id: "golden-pheasant",
    name: "Golden Pheasant",
    location: "AVIARY",
    spec: "A22",
    image: "/images/golden-phesant.jpg",
    category: "birds",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filteredAnimals = useMemo(() => {
    if (activeFilter === "all") return animals;
    return animals.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

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
              onClick={() => setActiveFilter(filter.value)}
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
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </AnimatePresence>
      </div>

      {filteredAnimals.length === 0 && (
        <p className="font-body mt-16 text-center text-neutral-500">
          No animals found in this category yet.
        </p>
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
      className={`group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 ${
        animal.tall ? "md:row-span-2" : ""
      }`}
    >
      <div
        className={`group relative w-full overflow-hidden rounded-2xl ${animal.tall ? "aspect-3/4 md:h-full" : "aspect-4/3"}`}
      >
        {/* Animal Image */}
        <Image
          src={animal.image}
          alt={animal.name}
          fill
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overall Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Bottom Card Wrapper */}
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
    </motion.div>
  );
}
