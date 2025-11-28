import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PWAInstallBanner } from "@/components/mobile/PWAInstallBanner";
import { NotificationPermissionBanner } from "@/components/mobile/NotificationPermissionBanner";
import { FloatingDock } from "@/components/navigation/FloatingDock";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PWAInstallBanner />
      <NotificationPermissionBanner />
      <main className="pb-24 md:pb-0">
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
      <FloatingDock />
    </div>
  );
};

export default Index;
