import { useState } from "react";
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Truck, Shield, FileText, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: "1",
    name: "Dipirona Sódica 500mg - 20 comprimidos",
    description: "Analgésico e antitérmico indicado para dores e febre",
    price: 8.90,
    originalPrice: 12.50,
    discount: 28,
    rating: 4.8,
    reviewCount: 124,
    sku: "DIP500-20",
    ean: "7891234567890",
    prescriptionRequired: false,
    inStock: true,
    stockQuantity: 150,
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop"
    ],
    manufacturer: "Medley",
    activeIngredient: "Dipirona Sódica",
    dosage: "500mg",
    form: "Comprimidos"
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <span>/</span>
          <span>Medicamentos</span>
          <span>/</span>
          <span>Analgésicos</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount} avaliações)</span>
                </div>
                <Badge variant="outline">SKU: {product.sku}</Badge>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.discount && (
                  <Badge className="bg-destructive">-{product.discount}%</Badge>
                )}
                {product.prescriptionRequired && (
                  <Badge variant="outline" className="border-warning text-warning">
                    <FileText className="h-3 w-3 mr-1" />
                    Receita Necessária
                  </Badge>
                )}
                {product.inStock && (
                  <Badge className="bg-success">Em Estoque</Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-success font-medium">
                  Economize {formatPrice(product.originalPrice - product.price)}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                ou 3x de {formatPrice(product.price / 3)} sem juros
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantidade:</label>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stockQuantity} disponíveis
                </span>
              </div>

              <Button className="w-full h-12 text-lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho - {formatPrice(product.price * quantity)}
              </Button>
            </div>

            {/* Shipping and Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Entrega Rápida</p>
                    <p className="text-xs text-muted-foreground">Receba hoje em SP</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Compra Segura</p>
                    <p className="text-xs text-muted-foreground">Site protegido</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="composition">Composição</TabsTrigger>
                <TabsTrigger value="usage">Como Usar</TabsTrigger>
                <TabsTrigger value="warnings">Advertências</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Fabricante:</span> {product.manufacturer}
                    </div>
                    <div>
                      <span className="font-medium">Princípio Ativo:</span> {product.activeIngredient}
                    </div>
                    <div>
                      <span className="font-medium">Dosagem:</span> {product.dosage}
                    </div>
                    <div>
                      <span className="font-medium">Forma:</span> {product.form}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="composition" className="mt-6">
                <div className="space-y-2">
                  <p><strong>Cada comprimido contém:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Dipirona sódica: 500mg</li>
                    <li>Excipientes: lactose, amido, celulose microcristalina</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="usage" className="mt-6">
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Adultos:</strong> 1 a 2 comprimidos, até 4 vezes ao dia.
                  </p>
                  <p className="text-sm">
                    <strong>Crianças:</strong> Consulte um médico para dosagem adequada.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="warnings" className="mt-6">
                <div className="space-y-2 text-sm">
                  <p><strong>Contraindicações:</strong> Alergia aos componentes da fórmula.</p>
                  <p><strong>Efeitos colaterais:</strong> Podem ocorrer reações alérgicas.</p>
                  <p><strong>Importante:</strong> Mantenha fora do alcance de crianças.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};