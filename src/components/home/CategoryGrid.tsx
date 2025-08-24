import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "Medicamentos",
    description: "Prescrição e isentos",
    icon: "💊",
    color: "bg-blue-50 hover:bg-blue-100"
  },
  {
    name: "Dermocosméticos",
    description: "Cuidados com a pele",
    icon: "🧴",
    color: "bg-pink-50 hover:bg-pink-100"
  },
  {
    name: "Vitaminas",
    description: "Suplementos e nutrição",
    icon: "🏃‍♂️",
    color: "bg-orange-50 hover:bg-orange-100"
  },
  {
    name: "Higiene Pessoal",
    description: "Produtos de limpeza",
    icon: "🧼",
    color: "bg-green-50 hover:bg-green-100"
  },
  {
    name: "Infantil",
    description: "Cuidados para bebês",
    icon: "👶",
    color: "bg-yellow-50 hover:bg-yellow-100"
  },
  {
    name: "Cuidados Especiais",
    description: "Produtos específicos",
    icon: "❤️",
    color: "bg-red-50 hover:bg-red-100"
  }
];

export const CategoryGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compre por Categoria</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encontre facilmente o que você precisa navegando pelas nossas categorias organizadas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.name}
              className={`${category.color} border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};