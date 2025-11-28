"use client";

import { ArrowUpRight, Menu, Search, ShoppingBasket, User, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartDrawer } from "@/components/cart/CartDrawer";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "#produtos" },
  { name: "Categorias", href: "#categorias" },
  { name: "Ofertas", href: "#ofertas" },
];

export function FloatingHeader() {
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl"
    >
      <div className="glass-header rounded-2xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={logo} alt="Farmácia Bom Jesus" className="h-8 w-auto" />
            <span className="hidden sm:block text-lg font-semibold text-foreground">
              Farmácia Bom Jesus
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-300"
                onClick={() => navigate(item.href)}
              >
                {item.name}
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex glass-button rounded-full h-10 w-10"
            >
              <Search className="w-4 h-4" />
            </Button>

            <CartDrawer />

            {/* Login Button - Desktop */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:block"
            >
              <Button
                variant="secondary"
                className="glass-button rounded-full pl-4 pr-1 py-1 h-10 gap-2"
                onClick={() => user ? signOut() : navigate('/auth')}
              >
                <span className="text-sm font-medium">
                  {user ? 'Sair' : 'Entrar'}
                </span>
                <div className="rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center">
                  {user ? <X className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="glass-button rounded-full h-10 w-10">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] glass-sheet border-l border-white/10 p-0"
              >
                <SheetHeader className="p-6 border-b border-white/10">
                  <SheetTitle className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-6 w-auto" />
                    <span className="text-lg font-semibold">Farmácia Bom Jesus</span>
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col p-4 space-y-1">
                  {navigation.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-start h-12 text-base font-medium hover:bg-white/10 transition-all"
                      onClick={() => navigate(item.href)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </nav>
                
                <Separator className="mx-4 bg-white/10" />
                
                <div className="p-4 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-12 glass-button"
                  >
                    <Search className="w-4 h-4" />
                    Buscar
                  </Button>
                  
                  <Button
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                    onClick={() => user ? signOut() : navigate('/auth')}
                  >
                    {user ? 'Sair' : 'Entrar'}
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
