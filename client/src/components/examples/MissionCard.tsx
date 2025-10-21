import MissionCard from '../MissionCard';

export default function MissionCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <MissionCard
        id="1"
        title="Développement d'une application mobile e-commerce"
        description="Je recherche un développeur expérimenté pour créer une application mobile iOS et Android pour ma boutique en ligne."
        budget="500 000 FCFA"
        category="Développement"
        location="Abidjan"
        postedTime="Il y a 2h"
        clientName="Kouassi Jean"
        applicantsCount={12}
        isBoosted={true}
      />
      <MissionCard
        id="2"
        title="Design de logo et identité visuelle"
        description="Besoin d'un graphiste créatif pour concevoir un logo moderne et une charte graphique complète pour mon entreprise."
        budget="150 000 FCFA"
        category="Design"
        location="Yamoussoukro"
        postedTime="Il y a 5h"
        clientName="Diabaté Awa"
        applicantsCount={8}
        isRemote={true}
      />
      <MissionCard
        id="3"
        title="Rédaction de contenu web SEO"
        description="Recherche rédacteur web pour créer du contenu optimisé SEO pour mon site internet et blog professionnel."
        budget="80 000 FCFA"
        category="Rédaction"
        location="Bouaké"
        postedTime="Il y a 1 jour"
        clientName="Koné Ibrahim"
        applicantsCount={5}
      />
    </div>
  );
}
