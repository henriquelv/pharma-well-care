import logo from "@/assets/logo.png";
import { Search, Menu, Phone, MapPin, Clock, User, Settings, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useProducts, Product } from "@/hooks/useProducts";

export const Header = () => {
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 6);
      setFilteredProducts(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredProducts([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/produto/${productId}`);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="glass-nav sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Entregamos em toda a cidade</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 hover-scale transition-smooth">
            <img src={logo} alt="Farmácia Bom Jesus Logo" className="h-12 w-auto" />
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-primary">Farmácia Bom Jesus</h1>
              <p className="text-xs text-muted-foreground">Tradição de compromisso com sua saúde</p>
            </div>
          </NavLink>

          {/* Search bar with suggestions */}
          <div className="flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Busque por medicamentos, dermocosméticos, vitaminas..."
                className="pl-12 h-12 border-2 focus:border-primary rounded-xl shadow-medium transition-all group-focus-within:shadow-luxury"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => {
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-card-strong rounded-xl shadow-luxury overflow-hidden z-50">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-primary/10 transition-colors text-left"
                  >
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {showSuggestions && searchTerm.length >= 2 && filteredProducts.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-card-strong rounded-xl shadow-luxury overflow-hidden z-50 p-4 text-center text-muted-foreground">
                Nenhum produto encontrado
              </div>
            )}
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
      </div>
    </header>
  );
};
