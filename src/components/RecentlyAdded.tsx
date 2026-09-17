"use client";

import { useRef } from "react";

type Animal = {
  name: string;
  description: string;
  image: string;
};

const recentAnimals: Animal[] = [
  {
    name: "Sun Conure",
    description: "Radiant yellow and orange plumage.",
    image: "/images/5.jpg",
  },
  {
    name: "Pygmy Goat",
    description: "Playful and highly sociable.",
    image: "/images/6.jpg",
  },
  {
    name: "Gouldian Finch",
    description: "Spectacular multicolored feathers.",
    image: "/images/7.jpg",
  },
  {
    name: "Chinchilla",
    description: "Ultra-soft fur and nocturnal habits.",
    image: "/images/8.jpg",
  },
];

export function RecentlyAdded() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 px-2 md:px-10 ">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-7xl px-6 lg:px-10">
        <h2 className="font-headline text-5xl font-extrabold text-neutral-50 lg:text-6xl">
          Recently Added
        </h2>
        <p className="font-body mt-3 text-lg text-neutral-400">
          Welcome our newest majestic arrivals to the sanctuary.
        </p>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:px-10"
      >
        {recentAnimals.map((animal) => (
          <div
            key={animal.name}
            className="w-70 shrink-0 snap-start overflow-hidden rounded-2xl border border-neutral-800 bg-[#1D211B]"
          >
            <div className="aspect-4/3 w-full overflow-hidden">
              <img
                src={animal.image}
                alt={animal.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-headline text-xl font-bold text-neutral-50">
                {animal.name}
              </h3>
              <p className="font-body mt-1.5 text-sm text-neutral-400">
                {animal.description}
              </p>
            </div>
          </div>
        ))}

        {/* Spacer so last card can peek/snap properly on small screens */}
        <div className="w-px shrink-0" />
      </div>
    </section>
  );
}