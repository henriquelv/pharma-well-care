import { Minus, Plus, Trash2, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CheckoutDialog } from "./CheckoutDialog";

export const CartDrawer = () => {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

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
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative glass-button rounded-full h-10 w-10"
          >
            <ShoppingBasket className="h-4 w-4" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-md glass-sheet border-l border-white/10 p-0">
          <SheetHeader className="p-6 border-b border-white/10">
            <SheetTitle className="flex items-center gap-2 text-foreground">
              <ShoppingBasket className="h-5 w-5" />
              Carrinho ({totalItems})
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Revise seus produtos
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100vh-180px)]">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <ShoppingBasket className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2 text-foreground">Carrinho vazio</h3>
                    <p className="text-sm text-muted-foreground">
                      Adicione produtos para começar
                    </p>
                  </motion.div>
                ) : (
                  items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="glass-card rounded-xl p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg bg-muted/30"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-sm line-clamp-2 text-foreground">
                              {item.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center glass-button rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <p className="font-semibold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Cart Summary */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-4 space-y-4 bg-background/50">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className={shipping === 0 ? "text-green-600" : "text-foreground"}>
                      {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                    </span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between font-semibold text-base">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full h-12 rounded-xl text-base"
                  onClick={() => setShowCheckout(true)}
                >
                  Finalizar compra
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutDialog 
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </>
  );
};
