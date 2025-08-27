import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Users,
  Eye,
  Star
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const Dashboard = () => {
  const { stats, sales, products } = useAdmin();

  const statsCards = [
    {
      title: "Total de Produtos",
      value: stats.totalProducts.toString(),
      description: `${products.filter(p => p.inStock).length} disponíveis`,
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Pedidos Hoje",
      value: stats.todayOrders.toString(),
      description: `+${Math.round((stats.todayOrders / (sales.length || 1)) * 100)}% do total`,
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Receita Total",
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      description: `Média: R$ ${(stats.totalRevenue / (sales.length || 1)).toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Estoque Baixo",
      value: stats.lowStock.toString(),
      description: "Produtos com menos de 10 unidades",
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ];

  const recentOrders = sales.slice(-4).reverse();

  const topProducts = products
    .sort((a, b) => (b.stockQuantity || 0) - (a.stockQuantity || 0))
    .slice(0, 4)
    .map(product => ({
      name: product.name,
      sales: Math.floor(Math.random() * 50) + 10, // Mock sales data
      revenue: `R$ ${(product.price * (Math.floor(Math.random() * 50) + 10)).toFixed(2)}`
    }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral das operações da Farmácia Bom Jesus
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>
              Últimos pedidos realizados na loja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">#{sale.id}</span>
                      <span className="text-sm text-muted-foreground">{sale.customerName}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">R$ {sale.total.toFixed(2)}</span>
                    <Badge 
                      variant={
                        sale.status === "Entregue" ? "default" :
                        sale.status === "Confirmado" ? "secondary" :
                        sale.status === "Preparando" ? "outline" : 
                        "destructive"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>
              Produtos com melhor desempenho este mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {product.sales} vendas
                    </span>
                  </div>
                  <span className="text-sm font-medium">{product.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;