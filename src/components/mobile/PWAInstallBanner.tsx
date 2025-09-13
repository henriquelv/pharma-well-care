import { Download, Smartphone, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useDevice } from "@/hooks/useDevice";
import { useToast } from "@/hooks/use-toast";

export const PWAInstallBanner = () => {
  const { canInstall, install, isInstalled } = usePWAInstall();
  const { isNative, platform, isOnline } = useDevice();
  const { toast } = useToast();

  const handleInstall = async () => {
    try {
      await install();
      toast({
        title: "🎉 App Instalado!",
        description: "Farmácia Bom Jesus foi instalada no seu dispositivo.",
      });
    } catch (error) {
      toast({
        title: "❌ Erro na instalação",
        description: "Não foi possível instalar o app. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  if (isNative || isInstalled || !canInstall) {
    return null;
  }

  return (
    <Card className="border-0 shadow-luxury bg-gradient-primary text-white m-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              📱 Instale nosso App
            </h3>
            <p className="text-white/90 text-sm">
              Acesso rápido, notificações de ofertas e compras offline!
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleInstall}
              variant="secondary"
              size="sm"
              className="bg-white text-primary hover:bg-white/90 hover-scale transition-smooth"
            >
              <Download className="h-4 w-4 mr-2" />
              Instalar
            </Button>
            
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Badge variant="secondary" className="bg-green-500/20 text-white border-green-400">
                  <Wifi className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-red-500/20 text-white border-red-400">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};