import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { products as initialProducts, Product } from "@/data/products";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  productId?: string;
  startDate: string;
  endDate: string;
  active: boolean;
  code?: string;
  usageLimit?: number;
  usageCount: number;
}

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "Pendente" | "Confirmado" | "Preparando" | "Entregue" | "Cancelado";
  paymentMethod: string;
  date: string;
}

export interface SiteSettings {
  name: string;
  phone: string;
  whatsapp: string;
  hours: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
}

interface AdminContextType {
  products: Product[];
  categories: Category[];
  promotions: Promotion[];
  sales: Sale[];
  siteSettings: SiteSettings;
  stats: {
    totalProducts: number;
    todayOrders: number;
    totalRevenue: number;
    lowStock: number;
  };
  // Product actions
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  // Category actions
  updateCategory: (categoryId: string, updates: Partial<Category>) => void;
  deleteCategory: (categoryId: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  // Promotion actions
  updatePromotion: (promotionId: string, updates: Partial<Promotion>) => void;
  deletePromotion: (promotionId: string) => void;
  addPromotion: (promotion: Omit<Promotion, "id">) => void;
  // Sale actions
  addSale: (sale: Omit<Sale, "id" | "date">) => void;
  updateSaleStatus: (saleId: string, status: Sale["status"]) => void;
  // Settings actions
  updateSettings: (updates: Partial<SiteSettings>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: "1", name: "Analgésicos", description: "Medicamentos para alívio da dor", icon: "💊", color: "#3B82F6" },
  { id: "2", name: "Vitaminas", description: "Suplementos vitamínicos", icon: "🧬", color: "#10B981" },
  { id: "3", name: "Anti-inflamatórios", description: "Medicamentos anti-inflamatórios", icon: "🔥", color: "#EF4444" },
  { id: "4", name: "Dermocosméticos", description: "Cuidados com a pele", icon: "✨", color: "#8B5CF6" },
  { id: "5", name: "Gastroenterologia", description: "Medicamentos para o sistema digestivo", icon: "🫁", color: "#F59E0B" },
];

const defaultPromotions: Promotion[] = [
  {
    id: "1",
    name: "Desconto Dipirona",
    description: "28% off na Dipirona Sódica",
    type: "percentage",
    value: 28,
    productId: "1",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    active: true,
    usageCount: 45
  },
  {
    id: "2",
    name: "Desconto Paracetamol",
    description: "27% off no Paracetamol",
    type: "percentage", 
    value: 27,
    productId: "5",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    active: true,
    usageCount: 32
  }
];

const defaultSales: Sale[] = [
  {
    id: "1",
    customerId: "c1",
    customerName: "Maria Silva", 
    customerEmail: "maria@email.com",
    items: [
      { productId: "1", productName: "Dipirona Sódica 500mg", quantity: 2, price: 8.90 },
      { productId: "5", productName: "Paracetamol 500mg", quantity: 1, price: 6.50 }
    ],
    total: 24.30,
    status: "Confirmado",
    paymentMethod: "Cartão de Crédito",
    date: "2024-03-15T10:30:00Z"
  },
  {
    id: "2", 
    customerId: "c2",
    customerName: "João Santos",
    customerEmail: "joao@email.com",
    items: [
      { productId: "2", productName: "Vitamina D3 2000UI", quantity: 1, price: 24.90 },
      { productId: "4", productName: "Omeprazol 20mg", quantity: 2, price: 15.50 }
    ],
    total: 55.90,
    status: "Preparando", 
    paymentMethod: "PIX",
    date: "2024-03-15T14:15:00Z"
  }
];

const defaultSettings: SiteSettings = {
  name: "Farmácia Bom Jesus",
  phone: "(11) 99999-9999",
  whatsapp: "(11) 99999-9999", 
  hours: "Segunda a Sábado: 7h às 22h | Domingo: 9h às 18h",
  primaryColor: "#16a34a",
  secondaryColor: "#059669",
  logo: "/src/assets/logo.png"
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('admin_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('admin_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });
  
  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const saved = localStorage.getItem('admin_promotions');
    return saved ? JSON.parse(saved) : defaultPromotions;
  });
  
  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem('admin_sales');
    return saved ? JSON.parse(saved) : defaultSales;
  });
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('admin_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);
  
  useEffect(() => {
    localStorage.setItem('admin_categories', JSON.stringify(categories));
  }, [categories]);
  
  useEffect(() => {
    localStorage.setItem('admin_promotions', JSON.stringify(promotions));
  }, [promotions]);
  
  useEffect(() => {
    localStorage.setItem('admin_sales', JSON.stringify(sales));
  }, [sales]);
  
  useEffect(() => {
    localStorage.setItem('admin_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    todayOrders: sales.filter(sale => {
      const saleDate = new Date(sale.date);
      const today = new Date();
      return saleDate.toDateString() === today.toDateString();
    }).length,
    totalRevenue: sales.reduce((sum, sale) => sum + sale.total, 0),
    lowStock: products.filter(p => (p.stockQuantity || 0) < 10).length
  };

  // Product actions
  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
  };

  // Category actions
  const updateCategory = (categoryId: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === categoryId ? { ...c, ...updates } : c));
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: Date.now().toString() };
    setCategories(prev => [...prev, newCategory]);
  };

  // Promotion actions
  const updatePromotion = (promotionId: string, updates: Partial<Promotion>) => {
    setPromotions(prev => prev.map(p => p.id === promotionId ? { ...p, ...updates } : p));
  };

  const deletePromotion = (promotionId: string) => {
    setPromotions(prev => prev.filter(p => p.id !== promotionId));
  };

  const addPromotion = (promotion: Omit<Promotion, "id">) => {
    const newPromotion = { ...promotion, id: Date.now().toString() };
    setPromotions(prev => [...prev, newPromotion]);
  };

  // Sale actions
  const addSale = (sale: Omit<Sale, "id" | "date">) => {
    const newSale = { 
      ...sale, 
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setSales(prev => [...prev, newSale]);
  };

  const updateSaleStatus = (saleId: string, status: Sale["status"]) => {
    setSales(prev => prev.map(s => s.id === saleId ? { ...s, status } : s));
  };

  // Settings actions
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <AdminContext.Provider value={{
      products,
      categories,
      promotions,
      sales,
      siteSettings,
      stats,
      updateProduct,
      deleteProduct,
      addProduct,
      updateCategory,
      deleteCategory,
      addCategory,
      updatePromotion,
      deletePromotion,
      addPromotion,
      addSale,
      updateSaleStatus,
      updateSettings
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};