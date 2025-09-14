import { Search, ShoppingCart, Menu, Phone, MapPin, Clock, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-luxury">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Entregamos em toda a cidade</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>24 horas por dia</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            >
              WhatsApp
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={handleAuthAction}
            >
              {user ? (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </>
              ) : (
                <>
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
            <NavLink to="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 hover-scale transition-smooth">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
              </svg>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-primary">Farmácia Bom Jesus</h1>
              <p className="text-xs text-muted-foreground">Sua saúde em primeiro lugar</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Busque por medicamentos, dermocosméticos, vitaminas..."
                className="pl-12 h-14 border-2 focus:border-primary rounded-xl shadow-medium transition-all group-focus-within:shadow-luxury"
              />
              <Button className="absolute right-2 top-2 h-10 px-6 rounded-lg hover-scale">
                Buscar
              </Button>
            </div>
          </div>

          {/* Cart and menu */}
          <div className="flex items-center gap-3">
            <div className="hover-scale transition-smooth">
              <CartDrawer />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden h-12 w-12 hover-scale">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation categories */}
        <nav className="mt-6 border-t pt-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {[
              { name: "Medicamentos", category: "medicamentos" },
              { name: "Dermocosméticos", category: "dermocosmeticos" },
              { name: "Vitaminas", category: "vitaminas" },
              { name: "Higiene", category: "higiene" },
              { name: "Infantil", category: "infantil" },
              { name: "Cuidados Especiais", category: "especiais" },
              { name: "Ofertas", category: "ofertas" }
            ].map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className="whitespace-nowrap hover:bg-primary/10 hover:text-primary hover-scale transition-smooth px-4 py-2 rounded-lg"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};