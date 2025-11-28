import { Pill, Sparkles, Dumbbell, Droplets, Baby, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Medicamentos", icon: Pill },
  { name: "Dermocosméticos", icon: Sparkles },
  { name: "Vitaminas", icon: Dumbbell },
  { name: "Higiene", icon: Droplets },
  { name: "Infantil", icon: Baby },
  { name: "Especiais", icon: Heart }
];

export const CategoryGrid = () => {
  return (
    <section id="categorias" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Categorias
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Encontre o que precisa de forma rápida e simples
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <a
                href="#"
                className="glass-card rounded-2xl p-6 min-h-[140px] flex flex-col items-center justify-center text-center cursor-pointer block"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-sm text-foreground">
                  {category.name}
                </h3>
                
                <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3 h-3 text-primary" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
