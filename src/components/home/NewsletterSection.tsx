import { useState } from "react";
import { Mail, Gift, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "motion/react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "✅ Inscrição realizada!",
        description: "Você receberá nossas ofertas exclusivas em breve.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Receba nossas Ofertas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Seja o primeiro a saber sobre promoções exclusivas, novos produtos e dicas de saúde
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card-strong rounded-3xl p-8"
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {[
                { icon: Gift, label: "Descontos exclusivos" },
                { icon: Bell, label: "Alertas de estoque" },
                { icon: Mail, label: "Dicas de saúde" },
              ].map((benefit, index) => (
                <motion.div 
                  key={benefit.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{benefit.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Digite seu e-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 glass-card border-0"
                  required
                />
                <Button 
                  type="submit" 
                  className="h-12 px-6"
                >
                  Cadastrar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Prometemos não enviar spam. Você pode descadastrar a qualquer momento.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
