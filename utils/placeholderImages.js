// Placeholder images configuration for products
// These use placeholder image services until actual product images are added

export const getPlaceholderImage = (productName, category) => {
  // Using placeholder.com service with custom text and colors
  const baseUrl = "https://via.placeholder.com";
  const size = "400x400";
  
  // Category-specific colors
  const categoryColors = {
    "Gemstones": { bg: "FFB84D", text: "FFFFFF" }, // Amber
    "Rudraksha": { bg: "8B4513", text: "FFFFFF" }, // Saddle Brown
    "Bracelets": { bg: "DAA520", text: "FFFFFF" }, // Goldenrod
    "Pendants": { bg: "CD7F32", text: "FFFFFF" },  // Bronze
    "Yantras" : { bg: "4682B4", text: "FFFFFF" } // Steel Blue
  };

  const colors = categoryColors[category] || { bg: "FFA500", text: "FFFFFF" };
  const text = encodeURIComponent(productName.substring(0, 20));
  
  return `${baseUrl}/${size}/${colors.bg}/${colors.text}?text=${text}`;
};

// Alternative: Using Lorem Picsum for random beautiful images
export const getRandomProductImage = (seed) => {
  return `https://picsum.photos/seed/${seed}/400/400`;
};

// Map of product IDs to specific placeholder images
export const productImageMap = {
  // Gemstones
  1: "/images/pukhraj.jpg", // Pukhraj (Yellow Sapphire)
  2: "/images/neelam.jpg", // Blue crystal
  3: "/images/panna.jpg", // Green crystal
  4: "/images/ruby.jpg", // Red crystal
  5: "/images/pearl.jpg", // Pearl
  6: "/images/moonga.jpg", // Coral

  // Rudraksha
  7: "/images/5Mukhi.png", // Prayer beads
  8: "/images/gauriShankar.png",
  9: "/images/1Mukhi.jpeg",
  10: "/images/7Mukhi.png",
  11: "/images/9Mukhi.png",
  12: "/images/11Mukhi.jpg",

  // Bracelets
  13: "/images/seven_chakra.jpg", // Bracelet
  14: "/images/tiger_eye.jpg",
  15: "/images/Gold_Plated_Rudraksha_Bracelet.jpg",
  16: "/images/black_tourmaline.jpg",
  17: "/images/pyrite_bracelete.jpg",
  18: "/images/rose_quartz.jpg",

  // Pendants
  19: "/images/om_pendant.jpg", // Pendant
  20: "/images/shri_yantra_pendant.jpg",
  21: "/images/hanuman_pendant.jpg",
  22: "/images/ganesha_pendant.jpg",
  23: "/images/evil_eye_pendant.png",
  24: "/images/trishul_pendant.jpg",

// Yantras

  25: "/images/yantra1.jpg",
  26: "/images/yantra2.jpg",
  27: "/images/yantra3.png",
  28: "/images/yantra4.jpg",
  29: "/images/yantra5.jpg",
  30: "/images/yantra6.jpg",

  // Vastu

  31: "/images/vastu1.jpg",
  32: "/images/vastu2.jpg",
  33: "/images/vastu3.jpg",
  34: "/images/vastu4.jpg",
  35: "/images/vastu5.jpg",
  36: "/images/vastu6.jpg"
};