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
  
  // 1. If we have a custom image (like a base64 string or external URL uploaded by the admin) that is NOT the placeholder paths, use it!
  if (url && typeof url === 'string' && !url.includes("kumkumadi_serum") && !url.includes("anti_pigmentation") && !url.includes("media__1781631843872") && !url.includes("media__1781631843889")) {
    return url;
  }
  
  // 2. Fall back to high-res local bundled assets based on ID or Name
  if (id === 1 || nameLower.includes("kumkumadi")) {
    return kumkumadiSerum;
  }
  if (id === 2 || nameLower.includes("pigmentation")) {
    return antiPigmentation;
  }
  
  // 3. Otherwise return the url
  return url || null;
};
