import { ShoppingCart, Heart, Star, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  prescriptionRequired?: boolean;
  inStock?: boolean;
  discount?: number;
}

export const ProductCard = ({
  name,
  description,
  price,
  originalPrice,
  image,
  rating = 4.5,
  reviewCount = 0,
  prescriptionRequired = false,
  inStock = true,
  discount
}: ProductCardProps) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg bg-gray-50 h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount && (
              <Badge className="bg-destructive text-destructive-foreground">
                -{discount}%
              </Badge>
            )}
            {prescriptionRequired && (
              <Badge variant="outline" className="bg-white/90 border-warning text-warning-foreground">
                <FileText className="h-3 w-3 mr-1" />
                Receita
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Stock Status */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Indisponível</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-medium text-sm line-clamp-2 leading-5 mb-1">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>

          {/* Rating */}
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium ml-1">{rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(price)}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            {originalPrice && originalPrice > price && (
              <p className="text-xs text-success">
                Economize {formatPrice(originalPrice - price)}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button 
            className="w-full" 
            disabled={!inStock}
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};