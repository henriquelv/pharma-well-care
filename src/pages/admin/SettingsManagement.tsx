import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Store, 
  Bell, 
  Mail, 
  Shield, 
  Database, 
  Palette,
  Clock,
  Phone,
  MapPin,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsManagement = () => {
  const { siteSettings, updateSiteSettings } = useAdmin();
  const { toast } = useToast();
  const [settings, setSettings] = useState(siteSettings);

  const handleSave = () => {
    updateSiteSettings(settings);
    toast({
      title: "Configurações salvas",
      description: "As configurações foram atualizadas com sucesso.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua farmácia e sistema.
          </p>
        </div>
        <Button onClick={handleSave}>
          Salvar Alterações
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="mr-2 h-5 w-5" />
              Informações da Loja
            </CardTitle>
            <CardDescription>
              Configure as informações básicas da sua farmácia.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nome da Farmácia</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => updateSetting('storeName', e.target.value)}
                  placeholder="Farmácia Bom Jesus"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storePhone">Telefone</Label>
                <Input
                  id="storePhone"
                  value={settings.storePhone}
                  onChange={(e) => updateSetting('storePhone', e.target.value)}
                  placeholder="+55 (11) 9999-9999"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeAddress">Endereço</Label>
              <Textarea
                id="storeAddress"
                value={settings.storeAddress}
                onChange={(e) => updateSetting('storeAddress', e.target.value)}
                placeholder="Rua das Flores, 123, Centro - São Paulo, SP"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeEmail">E-mail</Label>
              <Input
                id="storeEmail"
                type="email"
                value={settings.storeEmail}
                onChange={(e) => updateSetting('storeEmail', e.target.value)}
                placeholder="contato@farmaciabomjesus.com.br"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Horário de Funcionamento
            </CardTitle>
            <CardDescription>
              Configure os horários de abertura e fechamento.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="openTime">Horário de Abertura</Label>
                <Input
                  id="openTime"
                  type="time"
                  value={settings.openTime}
                  onChange={(e) => updateSetting('openTime', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closeTime">Horário de Fechamento</Label>
                <Input
                  id="closeTime"
                  type="time"
                  value={settings.closeTime}
                  onChange={(e) => updateSetting('closeTime', e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="weekendOpen"
                checked={settings.weekendOpen}
                onCheckedChange={(checked) => updateSetting('weekendOpen', checked)}
              />
              <Label htmlFor="weekendOpen">Aberto aos finais de semana</Label>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure as preferências de notificação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações de Pedidos</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações quando novos pedidos forem realizados.
                </p>
              </div>
              <Switch
                checked={settings.orderNotifications}
                onCheckedChange={(checked) => updateSetting('orderNotifications', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de Estoque</Label>
                <p className="text-sm text-muted-foreground">
                  Receber alertas quando produtos estiverem com estoque baixo.
                </p>
              </div>
              <Switch
                checked={settings.stockAlerts}
                onCheckedChange={(checked) => updateSetting('stockAlerts', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Relatórios Automáticos</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar relatórios de vendas por e-mail semanalmente.
                </p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Configurações do Sistema
            </CardTitle>
            <CardDescription>
              Configurações técnicas e de segurança.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Moeda</Label>
              <Input
                id="currency"
                value={settings.currency}
                onChange={(e) => updateSetting('currency', e.target.value)}
                placeholder="BRL"
                className="max-w-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Taxa de Imposto (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.01"
                value={settings.taxRate}
                onChange={(e) => updateSetting('taxRate', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="max-w-32"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
              />
              <Label htmlFor="maintenanceMode">Modo de manutenção</Label>
              {settings.maintenanceMode && (
                <Badge variant="destructive">Ativo</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5" />
              Aparência
            </CardTitle>
            <CardDescription>
              Personalize a aparência da sua loja.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tema</Label>
              <div className="flex space-x-2">
                <Button
                  variant={settings.theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('theme', 'light')}
                >
                  Claro
                </Button>
                <Button
                  variant={settings.theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('theme', 'dark')}
                >
                  Escuro
                </Button>
                <Button
                  variant={settings.theme === 'auto' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('theme', 'auto')}
                >
                  Automático
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <Input
                id="primaryColor"
                type="color"
                value={settings.primaryColor}
                onChange={(e) => updateSetting('primaryColor', e.target.value)}
                className="w-16 h-10"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsManagement;