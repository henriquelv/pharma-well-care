import { Phone, Mail, MapPin, Clock, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">(11) 99999-9999</p>
                  <p className="text-sm text-muted-foreground">WhatsApp e Telefone</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">contato@farmaciabomjesus.com.br</p>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Rua Exemplo, 123</p>
                  <p className="text-sm text-muted-foreground">São Paulo - SP, 01234-567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Horário de Funcionamento</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Segunda a Sexta: 7h às 22h</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Sábado: 8h às 20h</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Domingo: 9h às 18h</span>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Ver Localização
            </Button>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links Úteis</h3>
            <div className="space-y-2">
              {[
                "Sobre Nós",
                "Como Comprar",
                "Política de Privacidade",
                "Termos de Uso",
                "Trocas e Devoluções",
                "Receitas Médicas"
              ].map((link) => (
                <Button
                  key={link}
                  variant="ghost"
                  className="justify-start h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                >
                  {link}
                </Button>
              ))}
            </div>
          </div>

          {/* Security & Certifications */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Segurança & Certificações</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Site 100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm">ANVISA: 12.345.678/0001-90</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Farmacêutico Responsável</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>CRF-SP 12345</p>
              <p>Dra. Maria Silva</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Farmácia Bom Jesus. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>CNPJ: 12.345.678/0001-90</span>
            <span>|</span>
            <span>Licença de Funcionamento: 123456789</span>
          </div>
        </div>
      </div>
    </footer>
  );
};