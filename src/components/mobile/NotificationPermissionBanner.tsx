import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export const NotificationPermissionBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const { toast } = useToast();

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
      setShowBanner(Notification.permission === "default");
    }
  }, []);

  const requestPermission = async () => {
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        setPermission(permission);
        
        if (permission === "granted") {
          toast({
            title: "🔔 Notificações ativadas!",
            description: "Você receberá alertas sobre ofertas e atualizações de pedidos.",
          });
          
          // Mostrar notificação de exemplo
          new Notification("Farmácia Bom Jesus", {
            body: "Notificações ativadas! Você receberá ofertas exclusivas.",
            icon: "/icons/icon-192x192.png",
            badge: "/icons/icon-72x72.png"
          });
        } else {
          toast({
            title: "📵 Notificações negadas",
            description: "Você pode ativar nas configurações do navegador.",
            variant: "destructive"
          });
        }
        
        setShowBanner(false);
      } catch (error) {
        console.error("Erro ao solicitar permissão:", error);
      }
    }
  };

  if (!showBanner || permission !== "default") {
    return null;
  }

  return (
    <Card className="border-0 shadow-medium bg-orange-50 border-orange-200 m-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Bell className="h-5 w-5 text-orange-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-orange-900 mb-1">
              🔔 Ativar Notificações
            </h3>
            <p className="text-orange-700 text-sm">
              Receba alertas sobre ofertas, promoções e status dos seus pedidos
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={requestPermission}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Ativar
            </Button>
            <Button
              onClick={() => setShowBanner(false)}
              variant="ghost"
              size="sm"
              className="text-orange-600 hover:bg-orange-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};