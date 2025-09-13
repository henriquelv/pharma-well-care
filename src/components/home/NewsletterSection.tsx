import { useState } from "react";
import { Mail, Gift, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
    <section className="py-16 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-luxury bg-white/95 backdrop-blur">
          <CardContent className="p-12 text-center">
            <div className="space-y-6">
              {/* Icon and Title */}
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-white" />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  📧 Receba Ofertas Exclusivas
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Seja o primeiro a saber sobre promoções, novos produtos e dicas de saúde. 
                  Cadastre-se gratuitamente!
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="flex items-center gap-3 justify-center">
                  <Gift className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Descontos exclusivos</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Alertas de estoque</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Dicas de saúde</span>
                </div>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Digite seu e-mail..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 border-2 rounded-xl"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="h-12 px-6 rounded-xl hover-scale transition-smooth"
                  >
                    Cadastrar
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  📱 Prometemos não enviar spam. Você pode descadastrar a qualquer momento.
                </p>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};