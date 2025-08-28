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
    "Pendants": { bg: "CD7F32", text: "FFFFFF" }   // Bronze
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
  1: "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=400&h=400&fit=crop", // Yellow crystal
  2: "https://images.unsplash.com/photo-1609205807490-6d1b2d062dc2?w=400&h=400&fit=crop", // Blue crystal
  3: "https://images.unsplash.com/photo-1601121141418-c1caa10a2a0b?w=400&h=400&fit=crop", // Green crystal
  4: "https://images.unsplash.com/photo-1609205807491-d23d3e49ce6f?w=400&h=400&fit=crop", // Red crystal
  5: "https://images.unsplash.com/photo-1599643478518-a784e5d60b28?w=400&h=400&fit=crop", // Pearl
  6: "https://images.unsplash.com/photo-1602751584552-8b5264b3fd79?w=400&h=400&fit=crop", // Coral
  
  // Rudraksha
  7: "https://images.unsplash.com/photo-1599100863829-78e1377f5595?w=400&h=400&fit=crop", // Prayer beads
  8: "https://images.unsplash.com/photo-1599100863829-78e1377f5595?w=400&h=400&fit=crop",
  9: "https://images.unsplash.com/photo-1599100863829-78e1377f5595?w=400&h=400&fit=crop",
  10: "https://images.unsplash.com/photo-1599100863829-78e1377f5595?w=400&h=400&fit=crop",
  11: "https://images.unsplash.com/photo-1599100863829-78e1377f5595?w=400&h=400&fit=crop",
  12: "https://images.unsplash.com/photo-1599100863829-78e1377f5595?w=400&h=400&fit=crop",
  
  // Bracelets
  13: "https://images.unsplash.com/photo-1611652022419-a9419f74565a?w=400&h=400&fit=crop", // Bracelet
  14: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop", 
  15: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop",
  16: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop",
  17: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop",
  18: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop",
  
  // Pendants
  19: "https://images.unsplash.com/photo-1599643478069-55b2264b30e6?w=400&h=400&fit=crop", // Pendant
  20: "https://images.unsplash.com/photo-1599643478069-55b2264b30e6?w=400&h=400&fit=crop",
  21: "https://images.unsplash.com/photo-1599643478069-55b2264b30e6?w=400&h=400&fit=crop",
  22: "https://images.unsplash.com/photo-1599643478069-55b2264b30e6?w=400&h=400&fit=crop",
  23: "https://images.unsplash.com/photo-1599643478069-55b2264b30e6?w=400&h=400&fit=crop",
  24: "https://images.unsplash.com/photo-1599643478069-55b2264b30e6?w=400&h=400&fit=crop"
};
