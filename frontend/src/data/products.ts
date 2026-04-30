export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  gallery: string[];
};

const img = (seed: string, w = 800) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&q=80`;

export const categories = [
  { slug: "audio", name: "Audio", emoji: "🎧" },
  { slug: "wearables", name: "Wearables", emoji: "⌚" },
  { slug: "home", name: "Home", emoji: "🏠" },
  { slug: "lighting", name: "Lighting", emoji: "💡" },
  { slug: "accessories", name: "Accessories", emoji: "🎒" },
  { slug: "cameras", name: "Cameras", emoji: "📷" },
];

export const products: Product[] = [
  {
    id: "p1", name: "Aurora Wireless Headphones", price: 249, category: "audio", rating: 4.8, reviews: 1240,
    image: img("1505740420928-5e560c06d30e"),
    description: "Studio-grade wireless headphones with adaptive noise cancellation and 40-hour battery life.",
    gallery: [img("1505740420928-5e560c06d30e"), img("1583394838336-acd977736f90"), img("1545127398-14699f92334b")],
  },
  {
    id: "p2", name: "Pulse Smart Watch Series 7", price: 329, category: "wearables", rating: 4.7, reviews: 890,
    image: img("1523275335684-37898b6baf30"),
    description: "Track your health and stay connected with always-on retina display and 7-day battery.",
    gallery: [img("1523275335684-37898b6baf30"), img("1546868871-7041f2a55e12"), img("1508685096489-7aacd43bd3b1")],
  },
  {
    id: "p3", name: "Ember Ceramic Mug", price: 89, category: "home", rating: 4.6, reviews: 412,
    image: img("1514228742587-6b1558fcca3d"),
    description: "Temperature-controlled smart mug. Keep your coffee at the perfect 55°C for hours.",
    gallery: [img("1514228742587-6b1558fcca3d")],
  },
  {
    id: "p4", name: "Lumen Floor Lamp", price: 179, category: "lighting", rating: 4.9, reviews: 320,
    image: img("1507473885765-e6ed057f782c"),
    description: "Sculptural LED floor lamp with warm dimmable light and brushed brass finish.",
    gallery: [img("1507473885765-e6ed057f782c")],
  },
  {
    id: "p5", name: "Forge Leather Backpack", price: 219, category: "accessories", rating: 4.7, reviews: 654,
    image: img("1553062407-98eeb64c6a62"),
    description: "Hand-stitched full-grain leather backpack with padded laptop sleeve.",
    gallery: [img("1553062407-98eeb64c6a62")],
  },
  {
    id: "p6", name: "Lens Pro Mirrorless Camera", price: 1499, category: "cameras", rating: 4.9, reviews: 230,
    image: img("1502920917128-1aa500764cbd"),
    description: "Full-frame 45MP mirrorless camera with 8K video and in-body stabilization.",
    gallery: [img("1502920917128-1aa500764cbd")],
  },
  {
    id: "p7", name: "Bloom Bluetooth Speaker", price: 129, category: "audio", rating: 4.5, reviews: 980,
    image: img("1608043152269-423dbba4e7e1"),
    description: "Portable 360° speaker with 24-hour battery and waterproof design.",
    gallery: [img("1608043152269-423dbba4e7e1")],
  },
  {
    id: "p8", name: "Glide Fitness Tracker", price: 99, category: "wearables", rating: 4.4, reviews: 1520,
    image: img("1575311373937-040b8e1fd5b6"),
    description: "Slim fitness band with heart-rate, SpO2 and 14-day battery life.",
    gallery: [img("1575311373937-040b8e1fd5b6")],
  },
  {
    id: "p9", name: "Mesa Walnut Side Table", price: 299, category: "home", rating: 4.8, reviews: 142,
    image: img("1493663284031-b7e3aefcae8e"),
    description: "Solid walnut side table with hand-rubbed oil finish.",
    gallery: [img("1493663284031-b7e3aefcae8e")],
  },
  {
    id: "p10", name: "Halo Pendant Light", price: 159, category: "lighting", rating: 4.6, reviews: 88,
    image: img("1513506003901-1e6a229e2d15"),
    description: "Minimalist ring pendant in matte black with soft diffused glow.",
    gallery: [img("1513506003901-1e6a229e2d15")],
  },
  {
    id: "p11", name: "Trail Canvas Crossbody", price: 79, category: "accessories", rating: 4.3, reviews: 215,
    image: img("1548036328-c9fa89d128fa"),
    description: "Water-resistant canvas crossbody bag with adjustable strap.",
    gallery: [img("1548036328-c9fa89d128fa")],
  },
  {
    id: "p12", name: "Pocket Vintage Film Camera", price: 449, category: "cameras", rating: 4.7, reviews: 64,
    image: img("1452780212940-6f5c0d14d848"),
    description: "Compact rangefinder with classic 35mm film aesthetic and modern sensor.",
    gallery: [img("1452780212940-6f5c0d14d848")],
  },
];

export const reviews = [
  { name: "Maya R.", rating: 5, text: "Best purchase I've made this year. Build quality is unreal." },
  { name: "Daniel K.", rating: 5, text: "Looks even better than the photos. Shipped in 2 days." },
  { name: "Priya S.", rating: 4, text: "Solid product. The packaging alone made it feel premium." },
];

export const testimonials = [
  { name: "Sofia Martinez", role: "Designer, Lisbon", text: "Marketplace I actually enjoy scrolling. Curation is unmatched.", avatar: img("1494790108377-be9c29b29330", 200) },
  { name: "James O'Connor", role: "Architect, Dublin", text: "Every item arrived perfectly packaged. The Lumen lamp transformed my studio.", avatar: img("1500648767791-00dcc994a43e", 200) },
  { name: "Aiko Tanaka", role: "Photographer, Tokyo", text: "Fast shipping, fair prices, and pieces that actually feel considered.", avatar: img("1438761681033-6461ffad8d80", 200) },
];
