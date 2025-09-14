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
    <section className="py-16 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Receba nossas Ofertas
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Seja o primeiro a saber sobre promoções exclusivas, novos produtos e dicas de saúde
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-white" />
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">Descontos exclusivos</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">Alertas de estoque</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">Dicas de saúde</span>
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
                  className="flex-1 h-12 border-white/20 bg-white/10 text-white placeholder:text-white/70"
                  required
                />
                <Button 
                  type="submit" 
                  className="h-12 px-6 bg-white text-primary hover:bg-white/90"
                >
                  Cadastrar
                </Button>
              </div>
              <p className="text-xs text-white/80 mt-3">
                Prometemos não enviar spam. Você pode descadastrar a qualquer momento.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};