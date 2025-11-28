import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { OrbitalLoader } from "@/components/ui/orbital-loader";

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const filteredCustomers = profiles?.filter(customer =>
    customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  ) || [];

  const totalCustomers = profiles?.length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <OrbitalLoader message="Carregando clientes..." />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground text-sm">
          Gerencie seus clientes e acompanhe seu histórico.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados na plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Com Perfil Completo</CardTitle>
            <Badge variant="secondary">%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profiles?.filter(p => p.full_name && p.phone).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Nome e telefone preenchidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Com Endereço</CardTitle>
            <Badge variant="outline">📍</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profiles?.filter(p => p.address && p.city).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Endereço cadastrado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Clientes</CardTitle>
          <CardDescription>
            Visualize todos os clientes cadastrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm h-9"
            />
          </div>

          <div className="space-y-3">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm">{customer.full_name || 'Nome não informado'}</h3>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      {customer.phone && (
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                      )}
                      {customer.city && (
                        <span>{customer.city} - {customer.state}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    {new Date(customer.created_at).toLocaleDateString('pt-BR')}
                  </div>
                  <Badge variant="default" className="text-xs">Ativo</Badge>
                </div>
              </div>
            ))}

            {filteredCustomers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                <p className="text-muted-foreground text-sm">
                  {searchTerm ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado ainda."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersManagement;
