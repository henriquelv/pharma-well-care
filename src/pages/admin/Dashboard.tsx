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

const Dashboard = () => {
  const stats = [
    {
      title: "Total de Produtos",
      value: "156",
      description: "12 produtos adicionados este mês",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Pedidos Hoje",
      value: "23",
      description: "+15% comparado a ontem",
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Receita Total",
      value: "R$ 12.450",
      description: "+8% comparado ao mês passado",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Estoque Baixo",
      value: "8",
      description: "Produtos com menos de 10 unidades",
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ];

  const recentOrders = [
    { id: "#001", customer: "Maria Silva", total: "R$ 85,50", status: "Confirmado" },
    { id: "#002", customer: "João Santos", total: "R$ 125,00", status: "Preparando" },
    { id: "#003", customer: "Ana Costa", total: "R$ 45,80", status: "Entregue" },
    { id: "#004", customer: "Pedro Lima", total: "R$ 95,20", status: "Pendente" }
  ];

  const topProducts = [
    { name: "Paracetamol 500mg", sales: 45, revenue: "R$ 315,00" },
    { name: "Dipirona 500mg", sales: 38, revenue: "R$ 228,00" },
    { name: "Omeprazol 20mg", sales: 32, revenue: "R$ 480,00" },
    { name: "Vitamina D3", sales: 28, revenue: "R$ 420,00" }
  ];

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
        {stats.map((stat, index) => (
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
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{order.id}</span>
                      <span className="text-sm text-muted-foreground">{order.customer}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{order.total}</span>
                    <Badge 
                      variant={
                        order.status === "Entregue" ? "default" :
                        order.status === "Confirmado" ? "secondary" :
                        order.status === "Preparando" ? "outline" : 
                        "destructive"
                      }
                    >
                      {order.status}
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