import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

export const HeroSection = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
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
            className="max-w-2xl mx-auto"
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
        </div>
      </div>
    </section>
  );
};
