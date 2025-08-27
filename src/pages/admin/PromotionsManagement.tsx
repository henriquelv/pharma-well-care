import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Percent,
  Calendar
} from "lucide-react";
import { useAdmin, Promotion } from "@/contexts/AdminContext";

const PromotionsManagement = () => {
  const { promotions, products, addPromotion, updatePromotion, deletePromotion } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "percentage" as "percentage" | "fixed",
    value: 0,
    productId: "",
    startDate: "",
    endDate: "",
    active: true,
    code: "",
    usageLimit: 0,
  });

  const filteredPromotions = promotions.filter(promotion => 
    promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      name: promotion.name,
      description: promotion.description,
      type: promotion.type,
      value: promotion.value,
      productId: promotion.productId || "",
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      active: promotion.active,
      code: promotion.code || "",
      usageLimit: promotion.usageLimit || 0,
    });
    setShowDialog(true);
  };

  const handleAdd = () => {
    setEditingPromotion(null);
    setFormData({
      name: "",
      description: "",
      type: "percentage",
      value: 0,
      productId: "",
      startDate: "",
      endDate: "",
      active: true,
      code: "",
      usageLimit: 0,
    });
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const promotionData = {
      ...formData,
      usageCount: editingPromotion?.usageCount || 0,
      productId: formData.productId || undefined,
      code: formData.code || undefined,
      usageLimit: formData.usageLimit > 0 ? formData.usageLimit : undefined,
    };

    if (editingPromotion) {
      updatePromotion(editingPromotion.id, promotionData);
    } else {
      addPromotion(promotionData);
    }
    
    setShowDialog(false);
    setEditingPromotion(null);
  };

  const handleDelete = (promotionId: string) => {
    if (confirm("Tem certeza que deseja excluir esta promoção?")) {
      deletePromotion(promotionId);
    }
  };

  const getProductName = (productId?: string) => {
    if (!productId) return "Todos os produtos";
    const product = products.find(p => p.id === productId);
    return product?.name || "Produto não encontrado";
  };

  const isPromotionActive = (promotion: Promotion) => {
    const now = new Date();
    const start = new Date(promotion.startDate);
    const end = new Date(promotion.endDate);
    return promotion.active && now >= start && now <= end;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Promoções</h1>
          <p className="text-muted-foreground">
            Crie e gerencie ofertas e descontos para seus produtos
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Promoção
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar promoções..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Promotions Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Promoção</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Usos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPromotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{promotion.name}</div>
                    <p className="text-sm text-muted-foreground">
                      {promotion.description}
                    </p>
                    {promotion.code && (
                      <Badge variant="outline" className="text-xs">
                        Código: {promotion.code}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {getProductName(promotion.productId)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Percent className="h-4 w-4 text-green-600" />
                    <span className="font-medium">
                      {promotion.type === "percentage" 
                        ? `${promotion.value}%` 
                        : `R$ ${promotion.value.toFixed(2)}`
                      }
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(promotion.startDate).toLocaleDateString('pt-BR')}</div>
                    <div className="text-muted-foreground">
                      até {new Date(promotion.endDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <span className="font-medium">{promotion.usageCount}</span>
                    {promotion.usageLimit && (
                      <span className="text-muted-foreground">/{promotion.usageLimit}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={isPromotionActive(promotion) ? "default" : "secondary"}
                  >
                    {isPromotionActive(promotion) ? "Ativa" : "Inativa"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(promotion)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDelete(promotion.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPromotion ? "Editar Promoção" : "Nova Promoção"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Promoção*</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Código do Cupom</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Ex: DESCONTO10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição*</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Desconto*</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: "percentage" | "fixed") => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Valor do Desconto*</Label>
                <Input
                  id="value"
                  type="number"
                  step={formData.type === "percentage" ? "1" : "0.01"}
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="usageLimit">Limite de Usos</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: parseInt(e.target.value) }))}
                  placeholder="0 = ilimitado"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Produto Específico</Label>
              <Select 
                value={formData.productId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, productId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os produtos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os produtos</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início*</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Data de Fim*</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active">Promoção ativa</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingPromotion ? "Salvar Alterações" : "Criar Promoção"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromotionsManagement;