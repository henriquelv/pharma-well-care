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
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const { stats, sales, products, categories } = useAdmin();

  // Prepare chart data
  const categoryData = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category.name);
    const categoryRevenue = categoryProducts.reduce((sum, product) => 
      sum + (product.price * (product.stockQuantity || 0) * 0.1), 0
    );
    return {
      name: category.name,
      products: categoryProducts.length,
      revenue: categoryRevenue,
      color: category.color
    };
  }).filter(data => data.products > 0);

  const salesByCategory = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category.name);
    const mockSales = categoryProducts.reduce((sum, product) => 
      sum + Math.floor(Math.random() * 20) + 5, 0
    );
    return {
      name: category.name,
      vendas: mockSales,
      fill: category.color
    };
  }).filter(data => data.vendas > 0);

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

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos por Categoria</CardTitle>
            <CardDescription>
              Distribuição de produtos nas categorias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, products}) => `${name}: ${products}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="products"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>
              Performance de vendas por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByCategory}>
                <XAxis 
                  dataKey="name" 
                  tick={{fontSize: 12}}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendas" fill="#8884d8">
                  {salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
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
              {recentOrders.length > 0 ? recentOrders.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg border">
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
              )) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhum pedido recente</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Category Overview */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Visão Geral das Categorias</CardTitle>
            <CardDescription>
              Status das categorias de produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg" style={{backgroundColor: `${category.color}10`}}>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{backgroundColor: category.color}}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {category.products} produtos
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">
                    R$ {category.revenue.toFixed(2)}
                  </span>
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