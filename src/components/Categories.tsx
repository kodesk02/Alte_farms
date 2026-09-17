"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, PawPrint, Rabbit, Egg, Star } from "lucide-react";

type SubItem = { label: string };

type Category = {
  id: string;
  label: string;
  icon: React.ElementType;
  iconBg: string;
  items: SubItem[];
};

const categories: Category[] = [
  {
    id: "exotic-birds",
    label: "Exotic Birds",
    icon: PawPrint,
    iconBg: "bg-primary-500",
    items: [{ label: "Macaws" }, { label: "Toucans" }, { label: "Cockatoos" }],
  },
  {
    id: "small-mammals",
    label: "Small Mammals",
    icon: Rabbit,
    iconBg: "bg-primary-700",
    items: [{ label: "Rabbits" }, { label: "Chinchillas" }, { label: "Hamsters" }],
  },
  {
    id: "poultry",
    label: "Poultry",
    icon: Egg,
    iconBg: "bg-primary-800",
    items: [{ label: "Chickens" }, { label: "Ducks" }, { label: "Geese" }],
  },
  {
    id: "rare-breeds",
    label: "Rare Breeds",
    icon: Star,
    iconBg: "bg-tertiary-800",
    items: [{ label: "Leucistic" }, { label: "Albino" }, { label: "Hybrids" }],
  },
];

export function Categories() {
  const [openId, setOpenId] = useState<string | null>("exotic-birds");

  return (
    <section className="relative border-l-2 border-primary-500/40 px-6 py-24 lg:px-10">
      {/* Eyebrow + heading */}
      <div className="mb-10 pl-6">
        <span className="font-label text-sm tracking-widest text-primary-400">
          CURATION
        </span>
        <h2 className="font-headline mt-2 text-4xl font-extrabold text-neutral-50">
          Categories
        </h2>
      </div>

      {/* Accordion list */}
      <div className="flex max-w-md flex-col gap-4 pl-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isOpen={openId === category.id}
            onOpen={() => setOpenId(category.id)}
            onClose={() => setOpenId((prev) => (prev === category.id ? null : prev))}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  isOpen,
  onOpen,
  onClose,
}: {
  category: Category;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const Icon = category.icon;

  return (
    <div
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 transition-colors hover:border-neutral-700"
    >
      {/* Header row */}
      <div className="flex cursor-pointer items-center justify-between px-5 py-4">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${category.iconBg}`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className="font-headline text-lg font-semibold text-neutral-50">
            {category.label}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ChevronDown className="h-5 w-5 text-neutral-400" />
        </motion.div>
      </div>

      {/* Expandable sub-items */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col px-5 pb-4">
              {category.items.map((item) => (
                <li key={item.label}>
                  <button className="font-body group flex w-full items-center justify-between py-2 text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                    {item.label}
                    <ChevronDown className="h-4 w-4 -rotate-90 text-neutral-600 transition-colors group-hover:text-neutral-300" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}