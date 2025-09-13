import { Search, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-pharmacy py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 text-6xl">💊</div>
        <div className="absolute top-32 right-20 text-4xl">🧬</div>
        <div className="absolute bottom-20 left-20 text-5xl">✨</div>
        <div className="absolute bottom-10 right-10 text-3xl">🩺</div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Main Hero Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Sua <span className="text-primary bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Saúde</span> em Primeiro Lugar
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              🏆 Mais de 40 anos de tradição e compromisso com sua saúde.<br/>
              💊 Medicamentos, dermocosméticos e cuidados especiais com entrega rápida e segura.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">✅ Entrega Grátis</span>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">🕐 24h Online</span>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">🔒 100% Seguro</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="🔍 Busque por medicamentos, marcas ou princípio ativo..."
                className="pl-16 pr-32 h-16 text-lg border-2 focus:border-primary rounded-2xl shadow-luxury hover:shadow-glow transition-all bg-white/95 backdrop-blur"
              />
              <Button className="absolute right-2 top-2 h-12 px-8 rounded-xl hover-scale transition-smooth">
                🔎 Buscar
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              💡 Dica: Pesquise por "dor de cabeça", "vitamina C" ou nome do medicamento
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="border-0 shadow-luxury bg-white/90 backdrop-blur hover-lift transition-smooth hover:shadow-glow group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">🚚 Entrega Rápida</h3>
                <p className="text-muted-foreground">
                  Receba seus medicamentos em casa em até 2 horas na Grande São Paulo
                </p>
                <div className="mt-3 text-xs text-primary font-medium">Grátis acima de R$ 50</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-luxury bg-white/90 backdrop-blur hover-lift transition-smooth hover:shadow-glow group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">🔒 100% Seguro</h3>
                <p className="text-muted-foreground">
                  Site protegido, farmacêutico responsável e certificado ANVISA
                </p>
                <div className="mt-3 text-xs text-primary font-medium">SSL + Criptografia</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-luxury bg-white/90 backdrop-blur hover-lift transition-smooth hover:shadow-glow group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">🕐 Sempre Aberto</h3>
                <p className="text-muted-foreground">
                  Pedidos online 24h por dia, 7 dias por semana
                </p>
                <div className="mt-3 text-xs text-primary font-medium">Atendimento humanizado</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};