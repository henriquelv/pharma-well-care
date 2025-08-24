import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const CartDrawer = () => {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 8.90;
  const total = subtotal + shipping;
  const totalItems = getTotalItems();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative h-12 w-12">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Seu Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </SheetTitle>
          <SheetDescription>
            Revise seus produtos antes de finalizar a compra
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Seu carrinho está vazio</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione produtos para começar sua compra
                </p>
                <Button variant="outline">Continuar Comprando</Button>
              </div>
            ) : (
              items.map((item) => (
                <Card key={item.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-50"
                      />
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm line-clamp-2 leading-tight">
                            {item.name}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {item.prescriptionRequired && (
                          <Badge variant="outline" className="text-xs border-warning text-warning">
                            Receita Necessária
                          </Badge>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-medium text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.originalPrice && (
                              <p className="text-xs text-muted-foreground line-through">
                                {formatPrice(item.originalPrice * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete:</span>
                  <span className={shipping === 0 ? "text-success" : ""}>
                    {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && subtotal >= 50 && (
                  <p className="text-xs text-success">
                    ✓ Frete grátis para compras acima de R$ 50,00
                  </p>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full h-12 text-lg">
                  Finalizar Compra
                </Button>
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Frete calculado no checkout
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};