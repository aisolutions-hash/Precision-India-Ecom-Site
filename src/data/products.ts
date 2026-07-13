export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  inStock: boolean;
  moq: number;
  leadTime: string;
  specs: Record<string, string>;
  features: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Precision Splined Shaft (Heavy Duty)",
    slug: "precision-splined-shaft",
    category: "Shafts",
    price: 2450,
    rating: 4.8,
    reviews: 124,
    image: "/Shaft.jpeg",
    images: ["/Shaft.jpeg", "/shaft 2.jpeg", "/shaft 3.jpeg"],
    description: "High-torque transmission splined shafts, hardened and ground for industrial applications. Ideal for heavy machinery and gearboxes.",
    inStock: true,
    moq: 10,
    leadTime: "2-3 Weeks",
    specs: {
      "Material": "EN8 / EN353",
      "Hardness": "58-62 HRC",
      "Tolerance": "h6",
      "Surface Finish": "0.4 Ra"
    },
    features: ["High torque capacity", "Induction hardened", "Precision ground"],
    isBestSeller: true
  },
  {
    id: "p2",
    name: "Hardened Guide Pins",
    slug: "hardened-guide-pins",
    category: "Pins & Rods",
    price: 450,
    rating: 4.9,
    reviews: 89,
    image: "/shaft 2.jpeg",
    images: ["/shaft 2.jpeg"],
    description: "Precision ground guide pins for mold and die assemblies. Heat-treated for maximum durability.",
    inStock: true,
    moq: 50,
    leadTime: "In Stock (1-2 Days)",
    specs: {
      "Material": "HDS",
      "Hardness": "60 HRC",
      "Tolerance": "m6"
    },
    features: ["Wear resistant", "High dimensional stability"]
  },
  {
    id: "p3",
    name: "Stepped Transmission Shaft",
    slug: "stepped-transmission-shaft",
    category: "Shafts",
    price: 3200,
    rating: 4.7,
    reviews: 45,
    image: "/Shaft with varying size.jpeg",
    images: ["/Shaft with varying size.jpeg"],
    description: "Multi-stepped transmission shaft engineered for complex gearbox assemblies.",
    inStock: false,
    moq: 20,
    leadTime: "4 Weeks",
    specs: {
      "Material": "EN24T",
      "Hardness": "45 HRC",
      "Tolerance": "h7"
    },
    features: ["Dynamic balancing", "Multiple keyways"],
    isNew: true
  },
  {
    id: "p4",
    name: "Flanged Drill Jigs",
    slug: "flanged-drill-jigs",
    category: "Jigs & Fixtures",
    price: 4500,
    rating: 5.0,
    reviews: 31,
    image: "/Forging die.jpeg",
    images: ["/Forging die.jpeg"],
    description: "Precision machined flanged drill jigs for accurate hole placement. Essential for repeatable drilling operations.",
    inStock: true,
    moq: 1,
    leadTime: "1 Week",
    specs: {
      "Material": "Cast Iron / Steel",
      "Tolerance": "+/- 0.01mm"
    },
    features: ["High repeatability", "Quick clamping"]
  },
  {
    id: "p5",
    name: "Precision Extrusion Die",
    slug: "precision-extrusion-die",
    category: "Dies",
    price: 12000,
    rating: 4.8,
    reviews: 12,
    image: "/Extrusion die.jpeg",
    images: ["/Extrusion die.jpeg"],
    description: "Custom engineered extrusion dies for aluminum and plastic manufacturing.",
    inStock: true,
    moq: 1,
    leadTime: "3-5 Weeks",
    specs: {
      "Material": "H13 Tool Steel",
      "Hardness": "52-54 HRC"
    },
    features: ["Optimized flow", "Nitrided surface"]
  }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
