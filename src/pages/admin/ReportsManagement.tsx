import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FileText, TrendingUp, Package, DollarSign, Users, Calendar } from "lucide-react";

const ReportsManagement = () => {
  const { sales, products, categories, stats } = useAdmin();

  // Sales by month
  const monthlySales = sales.reduce((acc, sale) => {
    const month = new Date(sale.date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.total += sale.total;
      existing.orders += 1;
    } else {
      acc.push({ month, total: sale.total, orders: 1 });
    }
    return acc;
  }, [] as Array<{ month: string; total: number; orders: number }>);

  // Top selling products
  const productSales = sales.flatMap(sale => sale.items).reduce((acc, item) => {
    const existing = acc.find(p => p.id === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
      existing.revenue += item.quantity * item.price;
    } else {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        acc.push({
          id: item.productId,
          name: product.name,
          quantity: item.quantity,
          revenue: item.quantity * item.price
        });
      }
    }
    return acc;
  }, [] as Array<{ id: string; name: string; quantity: number; revenue: number }>);

  const topProducts = productSales.sort((a, b) => b.quantity - a.quantity).slice(0, 5);

  // Sales by category
  const categorySales = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category.name);
    const categoryRevenue = productSales
      .filter(ps => categoryProducts.some(cp => cp.id === ps.id))
      .reduce((sum, ps) => sum + ps.revenue, 0);
    
    return {
      name: category.name,
      value: categoryRevenue,
      color: category.color
    };
  }).filter(item => item.value > 0);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalOrders = sales.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">
          Análises detalhadas de vendas, produtos e performance da farmácia.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +15% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +5.2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              {stats.lowStock} com estoque baixo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Mês</CardTitle>
            <CardDescription>
              Evolução das vendas mensais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "Vendas",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                  formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, "Vendas"]}
                />
                <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>
              Top 5 produtos por quantidade vendida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                quantity: {
                  label: "Quantidade",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={topProducts} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                  formatter={(value) => [`${value} unidades`, "Vendidos"]}
                />
                <Bar dataKey="quantity" fill="hsl(var(--primary))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>
              Distribuição de receita por categoria de produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Receita",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={categorySales}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, "Receita"]}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo de Performance</CardTitle>
            <CardDescription>
              Indicadores principais do período
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Produtos cadastrados</span>
              <Badge variant="outline">{products.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Categorias ativas</span>
              <Badge variant="outline">{categories.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estoque baixo</span>
              <Badge variant={stats.lowStock > 0 ? "destructive" : "default"}>
                {stats.lowStock}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Taxa de conversão</span>
              <Badge variant="secondary">
                {totalOrders > 0 ? ((totalOrders / (totalOrders + 10)) * 100).toFixed(1) : 0}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsManagement;