import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import { ProductDetail } from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import PromotionsManagement from "./pages/admin/PromotionsManagement";
import CustomersManagement from "./pages/admin/CustomersManagement";
import ReportsManagement from "./pages/admin/ReportsManagement";
import SettingsManagement from "./pages/admin/SettingsManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<ProductsManagement />} />
                  <Route path="orders" element={<OrdersManagement />} />
                  <Route path="categories" element={<CategoriesManagement />} />
                  <Route path="promotions" element={<PromotionsManagement />} />
                  <Route path="customers" element={<CustomersManagement />} />
                  <Route path="reports" element={<ReportsManagement />} />
                  <Route path="settings" element={<SettingsManagement />} />
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AdminProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
