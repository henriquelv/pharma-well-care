import { Star, Quote, User } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Atendimento excepcional! Sempre encontro o que preciso e a entrega é super rápida. Recomendo demais!",
  },
  {
    id: 2,
    name: "João Santos",
    location: "Guarulhos, SP",
    rating: 5,
    comment: "Farmácia de confiança há anos. Preços justos e medicamentos sempre disponíveis. Equipe muito atenciosa.",
  },
  {
    id: 3,
    name: "Ana Costa",
    location: "Osasco, SP",
    rating: 5,
    comment: "Amo fazer compras aqui! Site fácil de usar e produtos de qualidade. A entrega chegou antes do prazo.",
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais de 10.000 clientes satisfeitos confiam na nossa qualidade e atendimento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 glass-card-strong rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <Quote className="h-6 w-6 text-primary/30" />
                  
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  <div className="pt-3 border-t border-border/50">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { value: "40+", label: "Anos de tradição" },
            { value: "50k+", label: "Clientes satisfeitos" },
            { value: "10k+", label: "Produtos disponíveis" },
            { value: "4.9", label: "Avaliação média" },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-4 text-center"
            >
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
