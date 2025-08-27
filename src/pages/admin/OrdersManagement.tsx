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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye,
  Edit,
  Download,
  Package
} from "lucide-react";

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    {
      id: "#001",
      customer: "Maria Silva",
      email: "maria@email.com",
      date: "2024-03-15",
      total: 85.50,
      status: "Confirmado",
      items: 3,
      payment: "Cartão de Crédito"
    },
    {
      id: "#002",
      customer: "João Santos", 
      email: "joao@email.com",
      date: "2024-03-15",
      total: 125.00,
      status: "Preparando",
      items: 5,
      payment: "PIX"
    },
    {
      id: "#003",
      customer: "Ana Costa",
      email: "ana@email.com", 
      date: "2024-03-14",
      total: 45.80,
      status: "Entregue",
      items: 2,
      payment: "Dinheiro"
    },
    {
      id: "#004",
      customer: "Pedro Lima",
      email: "pedro@email.com",
      date: "2024-03-14", 
      total: 95.20,
      status: "Pendente",
      items: 4,
      payment: "Cartão de Débito"
    },
    {
      id: "#005",
      customer: "Carlos Oliveira",
      email: "carlos@email.com",
      date: "2024-03-13",
      total: 156.30,
      status: "Cancelado",
      items: 7,
      payment: "Cartão de Crédito"
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ["Pendente", "Confirmado", "Preparando", "Entregue", "Cancelado"];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Entregue":
        return "default";
      case "Confirmado":
        return "secondary";
      case "Preparando":
        return "outline";
      case "Cancelado":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Pedidos</h1>
        <p className="text-muted-foreground">
          Acompanhe e gerencie todos os pedidos da farmácia
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Status: {filterStatus === "all" ? "Todos" : filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>
              Todos os Status
            </DropdownMenuItem>
            {statusOptions.map(status => (
              <DropdownMenuItem 
                key={status}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Orders Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-muted-foreground">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{order.items} itens</TableCell>
                <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{order.payment}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Alterar Status
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="mr-2 h-4 w-4" />
                        Preparar Pedido
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Baixar Recibo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersManagement;