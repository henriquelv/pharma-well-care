import { ProductCard } from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { OrbitalLoader } from "@/components/ui/orbital-loader";
import { motion } from "motion/react";

interface FeaturedProductsProps {
  selectedCategory?: string | null;
}

export const FeaturedProducts = ({ selectedCategory }: FeaturedProductsProps) => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 flex justify-center">
          <OrbitalLoader message="Carregando produtos..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center text-destructive">
          Erro ao carregar produtos. Tente novamente mais tarde.
        </div>
      </section>
    );
  }

  // Filter products by category if selected
  const filteredProducts = selectedCategory
    ? products?.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    : products;

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {selectedCategory ? `Produtos: ${selectedCategory}` : "Produtos em Destaque"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {selectedCategory 
              ? `Confira nossa seleção de ${selectedCategory.toLowerCase()}`
              : "Confira nossa seleção especial de produtos com os melhores preços"}
          </p>
        </motion.div>

        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum produto encontrado{selectedCategory ? ` na categoria "${selectedCategory}"` : ""}.</p>
          </div>
        )}
      </div>
    </section>
  );
};
