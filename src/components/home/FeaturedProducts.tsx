import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock data for demonstration
const featuredProducts = [
  {
    id: "1",
    name: "Dipirona Sódica 500mg - 20 comprimidos",
    description: "Analgésico e antitérmico para dores e febre",
    price: 8.90,
    originalPrice: 12.50,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 124,
    discount: 28,
    inStock: true
  },
  {
    id: "2",
    name: "Vitamina D3 2000UI - 60 cápsulas",
    description: "Suplemento vitamínico para ossos e imunidade",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 89,
    inStock: true
  },
  {
    id: "3",
    name: "Protetor Solar FPS 60 - 120ml",
    description: "Proteção solar facial e corporal",
    price: 45.90,
    originalPrice: 52.90,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 67,
    discount: 13,
    inStock: true
  },
  {
    id: "4",
    name: "Omeprazol 20mg - 28 cápsulas",
    description: "Protetor gástrico para acidez e azia",
    price: 15.50,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 156,
    prescriptionRequired: true,
    inStock: true
  },
  {
    id: "5",
    name: "Shampoo Anticaspa 400ml",
    description: "Tratamento para caspa e descamação",
    price: 28.90,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 43,
    inStock: true
  },
  {
    id: "6",
    name: "Termômetro Digital",
    description: "Medição rápida e precisa da temperatura",
    price: 35.90,
    originalPrice: 42.90,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 91,
    discount: 16,
    inStock: true
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-muted-foreground">Seleções especiais com os melhores preços</p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            Ver Todos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full">
            Ver Todos os Produtos
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};