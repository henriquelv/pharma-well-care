import { Search, Truck, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

export const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Sua Saúde em <span className="text-gradient">Primeiro Lugar</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Medicamentos com qualidade, segurança e os melhores preços da região. 
            Cuidamos da sua família há mais de 20 anos.
          </motion.p>

          {/* Search Bar with Glass Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative glass-card-strong rounded-2xl p-2">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Busque por medicamentos, vitaminas ou marcas..."
                className="pl-12 pr-32 h-14 text-lg border-0 rounded-xl bg-transparent focus-visible:ring-0"
              />
              <Button className="absolute right-4 top-1/2 -translate-y-1/2 h-10 px-6 rounded-lg">
                Buscar
              </Button>
            </div>
          </motion.div>

          {/* Trust Indicators with Glass Effect */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card rounded-2xl p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground text-sm">Receba em casa em até 2 horas</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card rounded-2xl p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">100% Seguro</h3>
              <p className="text-muted-foreground text-sm">Pagamento protegido e dados seguros</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass-card rounded-2xl p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Sempre Aberto</h3>
              <p className="text-muted-foreground text-sm">Atendimento 24 horas por dia</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
