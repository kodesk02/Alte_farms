import { Leaf, Utensils, Heart } from "lucide-react";

export const stats = [
  {
    icon: Leaf,
    label: "Habitat",
    value: "Savannas, scrublands, and semi-arid desert regions",
  },
  {
    icon: Utensils,
    label: "Diet",
    value:
      "Omnivorous (primarily seeds, shrubs, grasses, and fruits, supplemented by insects and small reptiles)",
  },
  {
    icon: Heart,
    label: "Care Level",
    value:
      "Advanced (requires substantial pasture ground, high fencing, and large-animal handling skills)",
  },
];

export type Enclosure = {
  slug: string;
  name: string;
  description: string;
  tag: string;
  image: string;
  specs: { label: string; value: string }[];
};

export const enclosures: Enclosure[] = [
  {
    slug: "bird-aviary-pagoda",
    name: "Architectural Pagoda Bird Aviary",
    description:
      "Multi-tier house-style avian enclosure with rolling caster base, dual-roof accents, and integrated feeding stations.",
    tag: "INDOOR BIOTOPE",
    image: "/images/1.jpeg",
    specs: [
      { label: "Material", value: "Non-toxic powder coated steel" },
      { label: "Sizing", value: "150cm x 75cm x 60cm" },
      { label: "Biome", value: "Domestic / Indoor Avian" },
      { label: "Lead Time", value: "8–10 weeks" },
    ],
  },
  {
    slug: "crown-top-parrot-flight-cage",
    name: "Compact Crown-Top Parrot Cage",
    description:
      "Medium-sized white wire cage with a arched top, dual wooden perches, integrated feeder cups, and a removable base tray.",
    tag: "INDOOR BIOTOPE",
    image: "/images/2.jpeg",
    specs: [
      {
        label: "Material",
        value: "Powder-coated steel wire & durable ABS plastic base",
      },
      { label: "Sizing", value: "85cm x 55cm x 45cm" },
      { label: "Biome", value: "Domestic / Indoor Avian" },
      { label: "Lead Time", value: "6–8 weeks" },
    ],
  },
  {
    slug: "illuminated-walk-in-aviary-structure",
    name: "Illuminated Walk-In Aviary Structure",
    description:
      "Walk-in metallic aviary enclosure equipped with ambient overhead bulb lighting, central branch perch, hanging feature cage, and integrated access doors.",
    tag: "ARCHITECTURAL BIOTOPE",
    image: "/images/3.jpeg",
    specs: [
      {
        label: "Material",
        value:
          "Industrial welded steel, fine wire mesh, & integrated lighting fixture",
      },
      { label: "Sizing", value: "210cm x 120cm x 90cm" },
      { label: "Biome", value: "Indoor / Custom Aviary Sanctuary" },
      { label: "Lead Time", value: "10–12 weeks" },
    ],
  },
  {
    slug: "rabbit-hutch-commercial-4-tier",
    name: "Commercial 4-Tier Rabbit Hutch",
    description:
      "High-density commercial breeding unit with automated watering channels, plastic comfort flooring, and sliding waste trays.",
    tag: "AGRICULTURAL BIOTOPE",
    image: "/images/4.jpeg",
    specs: [
      { label: "Material", value: "Galvanized steel & food-grade PVC" },
      { label: "Sizing", value: "200cm x 180cm x 60cm" },
      { label: "Biome", value: "Domestic / Commercial Farm" },
      { label: "Lead Time", value: "5–7 weeks" },
    ],
  },
  {
    slug: "playtop-parrot-tower",
    name: "Executive Playtop Parrot Tower",
    description:
      "Heavy-duty wrought iron parrot cage featuring an overhead playtop perch, integrated ladders, locking feed doors, and a rolling base with storage shelf.",
    tag: "INDOOR BIOTOPE",
    image: "/images/5.jpeg",
    specs: [
      {
        label: "Material",
        value:
          "Heavy-duty powder-coated wrought iron & natural hardwood perches",
      },
      { label: "Sizing", value: "175cm x 80cm x 60cm" },
      { label: "Biome", value: "Domestic / Large Avian Habitat" },
      { label: "Lead Time", value: "12–14 weeks" },
    ],
  },
];

export type Category =
  | "all"
  | "birds"
  | "small-mammals"
  | "poultry"
  | "rare-breeds";

export type Animal = {
  id: string;
  name: string;
  location: string;
  spec: string;
  image: string;
  category: Exclude<Category, "all">;
  rare?: boolean;
  tall?: boolean;
};

export const animals: Animal[] = [
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
  {
    id: "silkie-chicken",
    name: "Silkie Chicken",
    location: "COOP",
    spec: "C88",
    image: "/images/hair.jpg",
    category: "poultry",
  },
  {
    id: "ostrich",
    name: "Ostrich",
    location: "SAVANNA",
    spec: "S01",
    image: "/images/ostrich.jpg",
    category: "birds",
  },
  {
    id: "cockatoo",
    name: "White Cockatoo",
    location: "AVIARY",
    spec: "A33",
    image: "/images/white.jpg",
    category: "birds",
    // rare: true,
    // tall: true,
  },
  {
    id: "peafowl",
    name: "Indian peafowl",
    location: "COOP",
    spec: "C99",
    image: "/images/pea.jpg",
    category: "poultry",
  },
  {
    id: "chinese-goose",
    name: "Chinese Goose",
    location: "AVIARY",
    spec: "A22",
    image: "/images/goose.jpg",
    category: "birds",
  },
  {
    id: "brahma-chicken",
    name: "Brahma Chicken",
    location: "COOP",
    spec: "C88",
    image: "/images/brahma_chicken.jpg",
    category: "poultry",
  },
  {
    id: "crowned-crane",
    name: "Crowned Crane",
    location: "AVIARY",
    spec: "A22",
    image: "/images/crowned_crane.jpg",
    category: "birds",
  },
  {
    id: "eclectus-parrot",
    name: "Eclectus Parrot",
    location: "AVIARY",
    spec: "A22",
    image: "/images/eclectus.jpg",
    category: "birds",
  },
  {
    id: "galah-cockatoo",
    name: "Galah Cockatoo",
    location: "AVIARY",
    spec: "A22",
    image: "/images/galah_cockt.jpg",
    category: "birds",
  },
  {
    id: "rosella-parakeet",
    name: "Rosella Parakeet",
    location: "AVIARY",
    spec: "A22",
    image: "/images/rosella.jpg",
    category: "birds",
  },
];
