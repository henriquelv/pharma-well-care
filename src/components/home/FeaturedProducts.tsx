import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
const featuredProducts = products.slice(0, 6);

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