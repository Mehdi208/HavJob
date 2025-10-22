import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function CGU() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 flex-1">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Conditions Générales d'Utilisation
        </h1>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
              <p className="text-muted-foreground">
                Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme HavJob, 
                mise à disposition des utilisateurs pour faciliter la mise en relation entre clients et freelances en Côte d'Ivoire.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Inscription et compte utilisateur</h2>
              <p className="text-muted-foreground mb-4">
                Pour utiliser les services de HavJob, vous devez créer un compte en fournissant des informations exactes et à jour.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Vous êtes responsable de la confidentialité de vos identifiants de connexion</li>
                <li>Vous devez avoir au moins 18 ans pour créer un compte</li>
                <li>Un compte ne peut être créé qu'à titre personnel et ne peut être partagé</li>
                <li>Vous vous engagez à fournir des informations véridiques et à les maintenir à jour</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Services proposés</h2>
              <p className="text-muted-foreground mb-4">
                HavJob est une plateforme de mise en relation qui permet :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Aux clients de publier des missions et de rechercher des freelances</li>
                <li>Aux freelances de consulter les missions disponibles et de postuler</li>
                <li>La communication entre les parties via WhatsApp</li>
                <li>Le système de notation et d'avis après collaboration</li>
                <li>Le boost de profil ou de mission pour une meilleure visibilité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Obligations des utilisateurs</h2>
              <p className="text-muted-foreground mb-4">En utilisant HavJob, vous vous engagez à :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Respecter les lois en vigueur en Côte d'Ivoire</li>
                <li>Ne pas publier de contenu illégal, offensant ou frauduleux</li>
                <li>Traiter les autres utilisateurs avec respect et professionnalisme</li>
                <li>Honorer vos engagements contractuels</li>
                <li>Ne pas utiliser la plateforme à des fins de spam ou de publicité non sollicitée</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Missions et paiements</h2>
              <p className="text-muted-foreground">
                HavJob facilite la mise en relation mais n'est pas partie prenante dans les contrats conclus entre clients et freelances. 
                Les modalités de paiement sont convenues directement entre les parties. HavJob ne gère pas les transactions financières 
                liées aux missions, sauf pour les services de boost payants via Chariow.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Système de boost</h2>
              <p className="text-muted-foreground">
                Le service de boost permet d'augmenter la visibilité de votre profil ou mission. Les paiements sont gérés via Chariow. 
                Les boosts ne sont ni remboursables ni transférables une fois activés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                Le contenu de la plateforme HavJob (logo, design, textes, etc.) est protégé par les droits de propriété intellectuelle. 
                Toute reproduction sans autorisation est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Données personnelles</h2>
              <p className="text-muted-foreground">
                HavJob s'engage à protéger vos données personnelles conformément à la réglementation ivoirienne sur la protection des données. 
                Vos données ne seront jamais vendues à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Résiliation</h2>
              <p className="text-muted-foreground">
                Vous pouvez supprimer votre compte à tout moment. HavJob se réserve le droit de suspendre ou supprimer tout compte 
                en cas de violation des présentes CGU.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Modification des CGU</h2>
              <p className="text-muted-foreground">
                HavJob se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification 
                significative par email ou notification sur la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant ces CGU, veuillez nous contacter via la page de contact.
              </p>
            </section>

            <div className="pt-6 border-t text-sm text-muted-foreground">
              <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
