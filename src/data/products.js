import kumkumadiSerum from "../assets/kumkumadi_serum.jpg";
import antiPigmentation from "../assets/anti_pigmentation.jpg";

export const products = [
  {
    id: 1,
    name: "Kumkumadi Oil",
    price: 799,
    description: "Premium Kumkumadi Oil (15ml) for anti-aging, skin glow, and smoothness.",
    image_url: kumkumadiSerum,
    category: "1",
    stock: 100
  },
  {
    id: 2,
    name: "Anti Pigmentation Cream",
    price: 499,
    description: "Natural Anti Pigmentation Cream (50gm) for blemishes, dark spots, and acne.",
    image_url: antiPigmentation,
    category: "2",
    stock: 100
  }
];


export const getProductImage = (url, id, name = "") => {
  const nameLower = String(name || "").toLowerCase();
  
  // Resolve JSON array strings
  let resolvedUrl = url;
  if (url && typeof url === 'string' && url.trim().startsWith("[")) {
    try {
      const parsed = JSON.parse(url);
      if (Array.isArray(parsed) && parsed.length > 0) {
        resolvedUrl = parsed[0];
      }
    } catch (e) {
      // Not a valid JSON array, keep it as is
    }
  }

  // 1. Fall back to high-res local bundled assets if url is empty or is the default placeholder path
  const isPlaceholder = !resolvedUrl || 
                        resolvedUrl === "/src/assets/kumkumadi_serum.jpg" || 
                        resolvedUrl === "/src/assets/anti_pigmentation.jpg" ||
                        resolvedUrl.includes("media__1781631843872") ||
                        resolvedUrl.includes("media__1781631843889");

  if (isPlaceholder) {
    if (id === 1 || nameLower.includes("kumkumadi")) {
      return kumkumadiSerum;
    }
    if (id === 2 || nameLower.includes("pigmentation")) {
      return antiPigmentation;
    }
    return resolvedUrl || null;
  }
  
  // 2. Otherwise return the custom uploaded image URL/base64 directly
  return resolvedUrl;
};

export const getProductImages = (url, id, name = "") => {
  let images = [];
  if (url) {
    if (typeof url === 'string' && url.trim().startsWith("[")) {
      try {
        images = JSON.parse(url);
      } catch (e) {
        images = [url];
      }
    } else {
      images = [url];
    }
  }
  
  // Filter out empty strings
  const filtered = images.map(img => img ? img.trim() : "").filter(Boolean);
  
  // Map each through getProductImage to ensure fallback/resolve logic works for all urls
  const resolvedImages = filtered
    .map(img => getProductImage(img, id, name))
    .filter(Boolean);

  // If we ended up with no images, fall back to whatever getProductImage returns as the primary image
  if (resolvedImages.length === 0) {
    const primary = getProductImage(url, id, name);
    if (primary) resolvedImages.push(primary);
  }

  return resolvedImages;
};
