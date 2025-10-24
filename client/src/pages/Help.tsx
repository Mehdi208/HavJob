import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MessageCircle, Mail } from "lucide-react";

export default function Help() {
  const faqs = [
    {
      question: "Comment créer un compte sur HavJob ?",
      answer: "Cliquez sur le bouton 'S'inscrire' en haut de la page, remplissez le formulaire avec votre numéro de téléphone, mot de passe et informations personnelles. Choisissez votre rôle (Freelance, Client ou Les deux) et validez. Vous recevrez une confirmation et pourrez commencer à utiliser la plateforme immédiatement."
    },
    {
      question: "Comment publier une mission ?",
      answer: "Après connexion, cliquez sur 'Publier une mission' dans le menu. Remplissez le formulaire avec le titre, la description détaillée, le budget, la catégorie et la durée estimée. Vous pouvez préciser si la mission peut être effectuée à distance. Une fois publiée, votre mission sera visible par tous les freelances."
    },
    {
      question: "Comment postuler à une mission ?",
      answer: "Parcourez les missions disponibles, utilisez les filtres pour trouver celles qui correspondent à vos compétences. Cliquez sur une mission pour voir les détails complets. Si elle vous intéresse, cliquez sur 'Envoyer ma candidature' et rédigez une lettre de motivation personnalisée."
    },
    {
      question: "Comment fonctionne le système de contact ?",
      answer: "HavJob utilise WhatsApp pour faciliter la communication directe entre clients et freelances. Une fois qu'un client est intéressé par votre profil, il peut vous contacter directement via WhatsApp. Assurez-vous que votre numéro de téléphone est correct dans votre profil."
    },
    {
      question: "Qu'est-ce que le système de boost ?",
      answer: "Le boost permet de mettre en avant votre profil ou vos missions pour augmenter leur visibilité. Votre contenu boosté apparaîtra en tête des résultats de recherche. Plusieurs durées sont disponibles : 1, 3, 7, 15 ou 30 jours. Les paiements sont gérés via Chariow."
    },
    {
      question: "Comment fonctionnent les paiements ?",
      answer: "HavJob est une plateforme de mise en relation. Les modalités de paiement pour les missions sont convenues directement entre le client et le freelance. Nous recommandons d'établir un contrat clair avec des jalons de paiement. Seuls les services de boost sont payés via la plateforme (Chariow)."
    },
    {
      question: "Comment construire ma réputation ?",
      answer: "Après chaque mission, le client peut laisser un avis et une note. Plus vous accumulez d'avis positifs, plus votre profil gagne en crédibilité. Soyez professionnel, respectez les délais et livrez un travail de qualité pour obtenir d'excellentes évaluations."
    },
    {
      question: "HavJob prélève-t-il des commissions ?",
      answer: "Actuellement, HavJob ne prélève aucune commission sur les missions. La plateforme est gratuite pour publier et postuler aux missions. Seuls les services de boost sont payants."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Centre d'aide
          </h1>
          <p className="text-xl text-muted-foreground">
            Trouvez rapidement des réponses à vos questions
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Questions fréquentes</h2>
            <Accordion type="multiple" className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Besoin d'aide supplémentaire ?</h3>
              <p className="text-muted-foreground mb-4">
                Rejoignez notre groupe WhatsApp pour obtenir de l'aide
              </p>
              <Button 
                variant="outline" 
                data-testid="button-contact"
                onClick={() => window.open("https://chat.whatsapp.com/DcgpfrIRpOH6oNSnnV55i8", "_blank")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Rejoindre le groupe
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Signaler un problème</h3>
              <p className="text-muted-foreground mb-4">
                Contactez-nous sur WhatsApp pour signaler un problème
              </p>
              <Button 
                variant="outline" 
                data-testid="button-report"
                onClick={() => window.open("https://chat.whatsapp.com/DcgpfrIRpOH6oNSnnV55i8", "_blank")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contacter le support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
