import { Pill, Sparkles, Dumbbell, Droplets, Baby, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Medicamentos",
    description: "Prescrição e isentos",
    icon: Pill,
    gradient: "from-blue-500/20 to-blue-600/10",
    filter: "Medicamentos"
  },
  {
    name: "Dermocosméticos",
    description: "Cuidados com a pele",
    icon: Sparkles,
    gradient: "from-pink-500/20 to-pink-600/10",
    filter: "Dermocosméticos"
  },
  {
    name: "Vitaminas",
    description: "Suplementos e nutrição",
    icon: Dumbbell,
    gradient: "from-orange-500/20 to-orange-600/10",
    filter: "Vitaminas"
  },
  {
    name: "Higiene Pessoal",
    description: "Produtos de limpeza",
    icon: Droplets,
    gradient: "from-green-500/20 to-green-600/10",
    filter: "Higiene"
  },
  {
    name: "Infantil",
    description: "Cuidados para bebês",
    icon: Baby,
    gradient: "from-yellow-500/20 to-yellow-600/10",
    filter: "Infantil"
  },
  {
    name: "Cuidados Especiais",
    description: "Produtos específicos",
    icon: Heart,
    gradient: "from-red-500/20 to-red-600/10",
    filter: "Cuidados Especiais"
  }
];

interface CategoryGridProps {
  onCategorySelect?: (category: string | null) => void;
  selectedCategory?: string | null;
}

export const CategoryGrid = ({ onCategorySelect, selectedCategory }: CategoryGridProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = (filter: string) => {
    if (onCategorySelect) {
      onCategorySelect(selectedCategory === filter ? null : filter);
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">Compre por Categoria</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encontre facilmente o que você precisa navegando pelas nossas categorias organizadas
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryClick(category.filter)}
              className={`glass-card rounded-2xl p-6 text-center cursor-pointer bg-gradient-to-br ${category.gradient} transition-all ${
                selectedCategory === category.filter ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
            >
              <div className={`w-12 h-12 glass-card-strong rounded-xl flex items-center justify-center mx-auto mb-3 ${
                selectedCategory === category.filter ? 'bg-primary/20' : ''
              }`}>
                <category.icon className={`w-6 h-6 ${selectedCategory === category.filter ? 'text-primary' : 'text-primary'}`} />
              </div>
              <h3 className="font-semibold text-sm mb-1 text-foreground">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
