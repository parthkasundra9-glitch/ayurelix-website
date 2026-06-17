import kumkumadiSerum from "../assets/kumkumadi_serum.jpg";
import antiPigmentation from "../assets/anti_pigmentation.jpg";

export const products = [
  {
    id: 1,
    name: "Kumkumadi Face Serum",
    price: 799,
    description: "Premium Kumkumadi Face Serum (15ml) for anti-aging, skin glow, and smoothness.",
    image_url: kumkumadiSerum,
    category: "1",
    stock: 100
  },
  {
    id: 2,
    name: "Anti Pigmentation Face Pack",
    price: 499,
    description: "Natural Anti Pigmentation Face Pack (50gm) for blemishes, dark spots, and acne.",
    image_url: antiPigmentation,
    category: "2",
    stock: 100
  }
];

export const getProductImage = (url) => {
  if (!url) return null;
  if (typeof url === 'string') {
    if (url.includes("kumkumadi_serum") || url.includes("media__1781631843872")) {
      return kumkumadiSerum;
    }
    if (url.includes("anti_pigmentation") || url.includes("media__1781631843889")) {
      return antiPigmentation;
    }
  }
  return url;
};
