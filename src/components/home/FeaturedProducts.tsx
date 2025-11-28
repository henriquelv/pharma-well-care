import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { OrbitalLoader } from "@/components/ui/orbital-loader";

export const FeaturedProducts = () => {
  const { data: products, isLoading } = useProducts();
  const { addToCart } = useCart();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const featuredProducts = products?.slice(0, 8) || [];

  if (isLoading) {
    return (
      <section id="produtos" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl flex justify-center">
          <OrbitalLoader message="Carregando produtos..." />
        </div>
      </section>
    );
  }

  return (
    <section id="produtos" className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Produtos em destaque
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Seleção especial dos mais procurados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="aspect-square bg-muted/30 relative overflow-hidden">
                  <img
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Quick add button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image_url || '/placeholder.svg',
                      inStock: product.stock_quantity > 0,
                      quantity: 1
                    })}
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                  >
                    <ShoppingBasket className="w-4 h-4" />
                  </motion.button>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-medium text-foreground line-clamp-2 mb-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full glass-button h-12 px-8"
          >
            Ver todos os produtos
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};