import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, Package, DollarSign, Calendar } from "lucide-react";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import { OrbitalLoader } from "@/components/ui/orbital-loader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ReportsManagement = () => {
  const { data: products, isLoading: productsLoading } = useAdminProducts();
  
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (productsLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <OrbitalLoader message="Carregando relatórios..." />
      </div>
    );
  }

  // Calculate stats from real data
  const totalProducts = products?.length || 0;
  const lowStock = products?.filter(p => p.stock_quantity < 10).length || 0;
  const totalStockValue = products?.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0) || 0;
  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Group products by category for charts
  const categoryData = products?.reduce((acc, product) => {
    const existing = acc.find(c => c.name === product.category);
    if (existing) {
      existing.products++;
      existing.value += product.price * product.stock_quantity;
    } else {
      acc.push({
        name: product.category,
        products: 1,
        value: product.price * product.stock_quantity,
        color: getCategoryColor(product.category)
      });
    }
    return acc;
  }, [] as Array<{ name: string; products: number; value: number; color: string }>) || [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground text-sm">
          Análises detalhadas de vendas e produtos.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor em Estoque</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalStockValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total em produtos
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
              Receita: R$ {totalRevenue.toFixed(2)}
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
              Por pedido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {lowStock} com estoque baixo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Produtos por Categoria</CardTitle>
            <CardDescription>
              Distribuição de produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, products }) => `${name}: ${products}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="products"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum dado disponível
              </div>
            )}
          </CardContent>
        </Card>

        {/* Value by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Valor por Categoria</CardTitle>
            <CardDescription>
              Valor em estoque por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{fontSize: 10}}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{fontSize: 10}} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, "Valor"]}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum dado disponível
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Resumo de Performance</CardTitle>
            <CardDescription>
              Indicadores principais
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Produtos cadastrados</span>
              <Badge variant="outline">{totalProducts}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Categorias</span>
              <Badge variant="outline">{categoryData.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Estoque baixo</span>
              <Badge variant={lowStock > 0 ? "destructive" : "default"}>
                {lowStock}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Pedidos realizados</span>
              <Badge variant="secondary">{totalOrders}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Medicamentos': '#3B82F6',
    'Vitaminas': '#F59E0B',
    'Dermocosméticos': '#EC4899',
    'Higiene': '#10B981',
    'Infantil': '#FBBF24',
    'Analgésicos': '#6366F1',
    'Anti-inflamatórios': '#EF4444',
    'Gastroenterologia': '#8B5CF6',
  };
  return colors[category] || '#6B7280';
}

export default ReportsManagement;
