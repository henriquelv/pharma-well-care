import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  AlertTriangle
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { OrbitalLoader } from "@/components/ui/orbital-loader";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const Dashboard = () => {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <OrbitalLoader message="Carregando dashboard..." />
      </div>
    );
  }

  // Calculate stats from real data
  const totalProducts = products?.length || 0;
  const lowStock = products?.filter(p => p.stock_quantity < 10).length || 0;
  const totalValue = products?.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0) || 0;

  // Group products by category
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

  const statsCards = [
    {
      title: "Total de Produtos",
      value: totalProducts.toString(),
      description: `${products?.filter(p => p.stock_quantity > 0).length || 0} disponíveis`,
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Pedidos Hoje",
      value: "0",
      description: "Integrar com pedidos",
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Valor em Estoque",
      value: `R$ ${totalValue.toFixed(2)}`,
      description: "Total em produtos",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Estoque Baixo",
      value: lowStock.toString(),
      description: "Produtos com menos de 10 unidades",
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
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
            <CardTitle className="text-lg">Produtos por Categoria</CardTitle>
            <CardDescription>
              Distribuição de produtos nas categorias
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
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum produto cadastrado
              </div>
            )}
          </CardContent>
        </Card>

        {/* Products by Category Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Valor por Categoria</CardTitle>
            <CardDescription>
              Valor total em estoque por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{fontSize: 10}}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toFixed(2)}`, 'Valor']} />
                  <Bar dataKey="value" fill="hsl(var(--primary))">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum produto cadastrado
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Products */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Produtos com Estoque Baixo</CardTitle>
          <CardDescription>
            Produtos que precisam de reposição (menos de 10 unidades)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products && products.filter(p => p.stock_quantity < 10).length > 0 ? (
            <div className="space-y-3">
              {products.filter(p => p.stock_quantity < 10).slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    {product.image_url && (
                      <img src={product.image_url} alt={product.name} className="w-10 h-10 object-cover rounded" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <Badge variant={product.stock_quantity === 0 ? "destructive" : "secondary"}>
                    {product.stock_quantity} unidades
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>Todos os produtos têm estoque adequado</p>
            </div>
          )}
        </CardContent>
      </Card>
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

export default Dashboard;
