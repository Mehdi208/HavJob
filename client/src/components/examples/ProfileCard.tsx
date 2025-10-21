import ProfileCard from '../ProfileCard';
import femaleAvatar from '@assets/generated_images/Female_professional_avatar_portrait_b0057a37.png';
import maleAvatar from '@assets/generated_images/Male_professional_avatar_portrait_3c0ce83c.png';

export default function ProfileCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <ProfileCard
        id="1"
        name="Diabaté Awa"
        title="Designer UI/UX"
        avatar={femaleAvatar}
        rating={4.9}
        reviewsCount={45}
        location="Abidjan"
        skills={["Figma", "Adobe XD", "Prototypage"]}
        completedMissions={67}
        isBoosted={true}
      />
      <ProfileCard
        id="2"
        name="Koné Ibrahim"
        title="Développeur Full-Stack"
        avatar={maleAvatar}
        rating={4.8}
        reviewsCount={32}
        location="Yamoussoukro"
        skills={["React", "Node.js", "MongoDB"]}
        completedMissions={54}
      />
      <ProfileCard
        id="3"
        name="Touré Marie"
        title="Rédactrice Web"
        rating={4.7}
        reviewsCount={28}
        location="Bouaké"
        skills={["SEO", "Content Marketing", "Copywriting"]}
        completedMissions={89}
      />
      <ProfileCard
        id="4"
        name="N'Guessan Eric"
        title="Motion Designer"
        rating={5.0}
        reviewsCount={18}
        location="Abidjan"
        skills={["After Effects", "3D", "Animation"]}
        completedMissions={34}
        isBoosted={true}
      />
    </div>
  );
}
