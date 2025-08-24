import { Search, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary-light via-white to-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Hero Content */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Sua <span className="text-primary">Saúde</span> em Primeiro Lugar
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mais de 40 anos de tradição e compromisso com sua saúde. 
              Medicamentos, dermocosméticos e cuidados especiais com entrega rápida.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Busque por medicamentos, marcas ou princípio ativo..."
                className="pl-12 h-14 text-lg border-2 focus:border-primary rounded-xl"
              />
              <Button className="absolute right-2 top-2 h-10 px-6 rounded-lg">
                Buscar
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  Receba seus medicamentos em casa em até 2 horas
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">100% Seguro</h3>
                <p className="text-sm text-muted-foreground">
                  Site protegido e farmacêutico responsável
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Sempre Aberto</h3>
                <p className="text-sm text-muted-foreground">
                  Pedidos online 24h por dia, 7 dias por semana
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};