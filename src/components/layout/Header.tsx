import { Search, Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(11) 99999-9999</span>
            </div>
            <span className="hidden md:block">Segunda a Sábado: 7h às 22h | Domingo: 9h às 18h</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Farmácia Bom Jesus" className="h-12 w-auto" />
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Busque por medicamentos, dermocosméticos, vitaminas..."
                className="pl-10 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>

          {/* Cart and menu */}
          <div className="flex items-center gap-2">
            <CartDrawer />
            <Button variant="ghost" size="icon" className="md:hidden h-12 w-12">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation categories */}
        <nav className="mt-4 border-t pt-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            {[
              "Medicamentos",
              "Dermocosméticos",
              "Vitaminas",
              "Higiene",
              "Infantil",
              "Cuidados Especiais",
              "Ofertas"
            ].map((category) => (
              <Button
                key={category}
                variant="ghost"
                className="whitespace-nowrap hover:bg-primary/10 hover:text-primary"
              >
                {category}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};