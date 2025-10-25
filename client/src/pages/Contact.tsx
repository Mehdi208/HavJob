import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-muted-foreground">
            Notre équipe est à votre disposition pour répondre à vos questions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-4">Téléphone WhatsApp</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/2250769275305?text=Bonjour,%20je%20vous%20contacte%20depuis%20HavJob."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline cursor-pointer flex items-center justify-center gap-2 hover-elevate p-2 rounded"
                  data-testid="link-whatsapp-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  +225 07 69 27 53 05
                </a>
                <a
                  href="https://wa.me/2250566868795?text=Bonjour,%20je%20vous%20contacte%20depuis%20HavJob."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline cursor-pointer flex items-center justify-center gap-2 hover-elevate p-2 rounded"
                  data-testid="link-whatsapp-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  +225 05 66 86 87 95
                </a>
                <a
                  href="https://wa.me/2250789609672?text=Bonjour,%20je%20vous%20contacte%20depuis%20HavJob."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline cursor-pointer flex items-center justify-center gap-2 hover-elevate p-2 rounded"
                  data-testid="link-whatsapp-3"
                >
                  <MessageCircle className="h-4 w-4" />
                  +225 07 89 60 96 72
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4" data-testid="text-email">
                contact@havjob.ci
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.location.href = "mailto:contact@havjob.ci"}
                data-testid="button-email"
              >
                <Mail className="h-4 w-4 mr-2" />
                Envoyer un email
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Localisation</h3>
              <p className="text-sm text-muted-foreground" data-testid="text-location">
                Abidjan, Côte d'Ivoire
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Heures d'ouverture
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-6">
              <div className="text-center">
                <p className="font-semibold mb-2">Lundi - Vendredi</p>
                <p className="text-muted-foreground">8h00 - 18h00</p>
              </div>
              <div className="text-center">
                <p className="font-semibold mb-2">Samedi</p>
                <p className="text-muted-foreground">9h00 - 14h00</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Notre équipe vous répondra dans les plus brefs délais
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
