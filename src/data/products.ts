import dipilonaImg from "@/assets/products/dipirona.jpg";
import vitaminaD3Img from "@/assets/products/vitamina-d3.jpg";
import omeprazolImg from "@/assets/products/omeprazol.jpg";
import protetorSolarImg from "@/assets/products/protetor-solar.jpg";
import paracetamolImg from "@/assets/products/paracetamol.jpg";
import diclofenacoImg from "@/assets/products/diclofenaco.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  prescriptionRequired?: boolean;
  inStock?: boolean;
  stockQuantity?: number;
  discount?: number;
  manufacturer?: string;
  activeIngredient?: string;
  dosage?: string;
  form?: string;
  sku?: string;
  ean?: string;
  category?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Dipirona Sódica 500mg - 20 comprimidos",
    description: "Analgésico e antitérmico indicado para o alívio da dor e da febre. Medicamento de ação rápida e eficaz.",
    price: 8.90,
    originalPrice: 12.50,
    image: dipilonaImg,
    images: [dipilonaImg, dipilonaImg, dipilonaImg],
    rating: 4.8,
    reviewCount: 124,
    discount: 28,
    inStock: true,
    stockQuantity: 150,
    manufacturer: "Medley",
    activeIngredient: "Dipirona Sódica",
    dosage: "500mg",
    form: "Comprimidos",
    sku: "DIP500-20",
    ean: "7891234567890",
    category: "Analgésicos"
  },
  {
    id: "2",
    name: "Vitamina D3 2000UI - 60 cápsulas",
    description: "Suplemento vitamínico essencial para fortalecimento dos ossos e sistema imunológico. Fórmula de alta absorção.",
    price: 24.90,
    image: vitaminaD3Img,
    images: [vitaminaD3Img, vitaminaD3Img, vitaminaD3Img],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 75,
    manufacturer: "Vitamedic",
    activeIngredient: "Colecalciferol",
    dosage: "2000UI",
    form: "Cápsulas",
    sku: "VIT-D3-2000",
    ean: "7891234567891",
    category: "Vitaminas"
  },
  {
    id: "3",
    name: "Protetor Solar FPS 60 - 120ml",
    description: "Proteção solar facial e corporal de amplo espectro. Fórmula resistente à água e não oleosa.",
    price: 45.90,
    originalPrice: 52.90,
    image: protetorSolarImg,
    images: [protetorSolarImg, protetorSolarImg, protetorSolarImg],
    rating: 4.7,
    reviewCount: 67,
    discount: 13,
    inStock: true,
    stockQuantity: 45,
    manufacturer: "La Roche-Posay",
    activeIngredient: "Octinoxato, Oxibenzona",
    dosage: "FPS 60",
    form: "Loção",
    sku: "PROT-FPS60",
    ean: "7891234567892",
    category: "Dermocosméticos"
  },
  {
    id: "4",
    name: "Omeprazol 20mg - 28 cápsulas",
    description: "Inibidor da bomba de prótons indicado para tratamento de úlceras e refluxo gastroesofágico.",
    price: 15.50,
    image: omeprazolImg,
    images: [omeprazolImg, omeprazolImg, omeprazolImg],
    rating: 4.6,
    reviewCount: 156,
    prescriptionRequired: true,
    inStock: true,
    stockQuantity: 89,
    manufacturer: "Eurofarma",
    activeIngredient: "Omeprazol",
    dosage: "20mg",
    form: "Cápsulas",
    sku: "OME-20-28",
    ean: "7891234567893",
    category: "Gastroenterologia"
  },
  {
    id: "5",
    name: "Paracetamol 500mg - 20 comprimidos",
    description: "Analgésico e antitérmico de uso geral. Indicado para dores leves a moderadas e febre.",
    price: 6.50,
    originalPrice: 8.90,
    image: paracetamolImg,
    images: [paracetamolImg, paracetamolImg, paracetamolImg],
    rating: 4.5,
    reviewCount: 203,
    discount: 27,
    inStock: true,
    stockQuantity: 200,
    manufacturer: "EMS",
    activeIngredient: "Paracetamol",
    dosage: "500mg",
    form: "Comprimidos",
    sku: "PAR-500-20",
    ean: "7891234567894",
    category: "Analgésicos"
  },
  {
    id: "6",
    name: "Diclofenaco Gel 1% - 60g",
    description: "Anti-inflamatório tópico para dores musculares e articulares. Alívio rápido e duradouro.",
    price: 18.90,
    image: diclofenacoImg,
    images: [diclofenacoImg, diclofenacoImg, diclofenacoImg],
    rating: 4.4,
    reviewCount: 91,
    inStock: true,
    stockQuantity: 67,
    manufacturer: "Novartis",
    activeIngredient: "Diclofenaco Dietilamônio",
    dosage: "1%",
    form: "Gel",
    sku: "DIC-GEL-60",
    ean: "7891234567895",
    category: "Anti-inflamatórios"
  },
  {
    id: "7",
    name: "Ibuprofeno 600mg - 20 comprimidos",
    description: "Anti-inflamatório não esteroidal para dores e inflamações. Ação prolongada.",
    price: 12.90,
    originalPrice: 16.50,
    image: paracetamolImg,
    rating: 4.6,
    reviewCount: 78,
    discount: 22,
    inStock: true,
    stockQuantity: 120,
    prescriptionRequired: true,
    manufacturer: "Sanofi",
    activeIngredient: "Ibuprofeno",
    dosage: "600mg",
    form: "Comprimidos",
    sku: "IBU-600-20",
    ean: "7891234567896",
    category: "Anti-inflamatórios"
  },
  {
    id: "8",
    name: "Vitamina C 1000mg - 30 comprimidos",
    description: "Suplemento de vitamina C para fortalecimento da imunidade e antioxidante natural.",
    price: 19.90,
    image: vitaminaD3Img,
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    stockQuantity: 85,
    manufacturer: "Herbarium",
    activeIngredient: "Ácido Ascórbico",
    dosage: "1000mg",
    form: "Comprimidos",
    sku: "VIT-C-1000",
    ean: "7891234567897",
    category: "Vitaminas"
  }
];