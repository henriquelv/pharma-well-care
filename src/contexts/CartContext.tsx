import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { useAdmin } from './AdminContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  prescriptionRequired?: boolean;
  inStock: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  checkout: (customerInfo: { name: string; email: string; phone: string; address: string }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { addSale } = useAdmin();

  const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    if (!product.inStock) {
      toast({
        title: "Produto Indisponível",
        description: "Este produto não está em estoque no momento.",
        variant: "destructive"
      });
      return;
    }

    const quantityToAdd = product.quantity || 1;

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Quantidade Atualizada",
          description: `${product.name} - quantidade atualizada no carrinho.`,
        });
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        toast({
          title: "Produto Adicionado",
          description: `${product.name} foi adicionado ao carrinho.`,
        });
        const { quantity, ...productWithoutQuantity } = product;
        return [...prevItems, { ...productWithoutQuantity, quantity: quantityToAdd }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast({
          title: "Produto Removido",
          description: `${item.name} foi removido do carrinho.`,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Carrinho Limpo",
      description: "Todos os produtos foram removidos do carrinho.",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkout = (customerInfo: { name: string; email: string; phone: string; address: string }) => {
    if (items.length === 0) {
      toast({
        title: "Carrinho Vazio",
        description: "Adicione produtos ao carrinho antes de finalizar a compra.",
        variant: "destructive"
      });
      return;
    }

    // Create a new sale
    const newSale = {
      customerId: `customer-${Date.now()}`,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      customerAddress: customerInfo.address,
      items: items.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: getTotalPrice(),
      status: "Pendente" as const,
      paymentMethod: "Cartão de Crédito"
    };

    // Add sale to admin context
    addSale(newSale);

    // Clear cart
    setItems([]);

    toast({
      title: "Pedido Realizado!",
      description: `Seu pedido de R$ ${getTotalPrice().toFixed(2)} foi confirmado.`,
    });
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    checkout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};