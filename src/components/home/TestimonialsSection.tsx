import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Atendimento excepcional! Sempre encontro o que preciso e a entrega é super rápida. Recomendo demais!",
    avatar: "👩‍💼"
  },
  {
    id: 2,
    name: "João Santos",
    location: "Guarulhos, SP",
    rating: 5,
    comment: "Farmácia de confiança há anos. Preços justos e medicamentos sempre disponíveis. Equipe muito atenciosa.",
    avatar: "👨‍💻"
  },
  {
    id: 3,
    name: "Ana Costa",
    location: "Osasco, SP",
    rating: 5,
    comment: "Amo fazer compras aqui! Site fácil de usar e produtos de qualidade. A entrega chegou antes do prazo.",
    avatar: "👩‍⚕️"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais de 10.000 clientes satisfeitos confiam na nossa qualidade e atendimento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="border-0 shadow-elegant hover-lift transition-smooth bg-white/90 backdrop-blur animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div className="flex-1 space-y-3">
                    {/* Quote Icon */}
                    <Quote className="h-6 w-6 text-primary/30" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.comment}"
                    </p>

                    {/* Author */}
                    <div className="pt-3 border-t">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">40+</div>
            <div className="text-sm text-muted-foreground">Anos de tradição</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50k+</div>
            <div className="text-sm text-muted-foreground">Clientes satisfeitos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">10k+</div>
            <div className="text-sm text-muted-foreground">Produtos disponíveis</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">4.9⭐</div>
            <div className="text-sm text-muted-foreground">Avaliação média</div>
          </div>
        </div>
      </div>
    </section>
  );
};