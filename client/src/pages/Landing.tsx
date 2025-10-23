import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Value Proposition Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Pourquoi choisir <span className="bg-gradient-to-r from-primary via-sidebar-accent to-primary bg-clip-text text-transparent">HavJob</span> ?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                La plateforme ivoirienne qui connecte les entreprises avec les meilleurs talents freelance
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Missions vérifiées</h3>
                <p className="text-sm text-muted-foreground">
                  Toutes les missions sont vérifiées pour garantir votre sécurité
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Réponse rapide</h3>
                <p className="text-sm text-muted-foreground">
                  Recevez des réponses rapidement et commencez à travailler
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold mb-2">Paiement sécurisé</h3>
                <p className="text-sm text-muted-foreground">
                  Vos paiements sont sécurisés avec Chariow
                </p>
              </div>
            </div>
          </div>
        </section>

        <CategoryGrid />
        <StatsSection />
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à commencer ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Connectez-vous maintenant et accédez à des milliers d'opportunités
            </p>
            <Button 
              size="lg" 
              className="group"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-login-cta"
            >
              Se connecter
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
