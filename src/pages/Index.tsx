import { FloatingHeader } from "@/components/layout/FloatingHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PWAInstallBanner } from "@/components/mobile/PWAInstallBanner";
import { NotificationPermissionBanner } from "@/components/mobile/NotificationPermissionBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingHeader />
      <PWAInstallBanner />
      <NotificationPermissionBanner />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
      </main>
      
      {/* Minimal Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>© 2024 Farmácia Bom Jesus. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
