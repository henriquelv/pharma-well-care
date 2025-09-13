import { Search, Phone, Menu, Settings, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-elegant">
      {/* Top bar with contact info */}
      <div className="bg-gradient-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 animate-fade-in">
              <Phone className="h-4 w-4" />
              <span className="font-medium">(11) 99999-9999</span>
            </div>
            <span className="hidden md:block animate-fade-in">📍 Entrega grátis acima de R$ 50 • Segunda a Domingo: 7h às 22h</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-scale transition-smooth">
              📱 WhatsApp
            </Button>
            <Button variant="ghost" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-scale transition-smooth">
              <User className="h-4 w-4 mr-1" />
              Login
            </Button>
            <NavLink to="/admin">
              <Button variant="ghost" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-scale transition-smooth">
                <Settings className="h-4 w-4 mr-1" />
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
            <img src={logo} alt="Farmácia Bom Jesus" className="h-14 w-auto" />
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
                className="pl-12 h-14 border-2 focus:border-primary rounded-xl shadow-elegant transition-all group-focus-within:shadow-luxury"
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
              { name: "💊 Medicamentos", icon: "💊" },
              { name: "✨ Dermocosméticos", icon: "✨" },
              { name: "🧬 Vitaminas", icon: "🧬" },
              { name: "🧴 Higiene", icon: "🧴" },
              { name: "👶 Infantil", icon: "👶" },
              { name: "🩺 Cuidados Especiais", icon: "🩺" },
              { name: "🔥 Ofertas", icon: "🔥" }
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