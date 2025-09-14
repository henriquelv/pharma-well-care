import { ShoppingCart, Heart, Star, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    category: string;
    description?: string | null;
    requires_prescription?: boolean;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || '',
      inStock: true,
      quantity: 1
    });
  };

  const handleProductClick = () => {
    navigate(`/produto/${product.id}`);
  };

  return (
    <Card 
      className="group hover:shadow-luxury transition-smooth hover:-translate-y-1 border-0 shadow-medium cursor-pointer bg-white"
      onClick={handleProductClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product.requires_prescription && (
            <div className="absolute top-2 right-2 bg-warning text-warning-foreground px-2 py-1 rounded text-xs font-medium">
              Receita
            </div>
          )}
          <Button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-primary hover:bg-primary hover:text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-sm line-clamp-2 leading-5 mb-2 text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};