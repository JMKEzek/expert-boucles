import { InstagramFeed } from '@/components/reviews/InstagramFeed';

const realisations = [
  { id: '1', image: 'https://via.placeholder.com/600x600?text=Coupe+Moderne', url: '#', caption: 'Coupe Moderne' },
  { id: '2', image: 'https://via.placeholder.com/600x600?text=Styling+Naturel', url: '#', caption: 'Styling Naturel' },
  { id: '3', image: 'https://via.placeholder.com/600x600?text=Boucles+Définies', url: '#', caption: 'Boucles Définies' },
  { id: '4', image: 'https://via.placeholder.com/600x600?text=Avant+Après', url: '#', caption: 'Avant / Après' },
  { id: '5', image: 'https://via.placeholder.com/600x600?text=Soins', url: '#', caption: 'Soins' },
  { id: '6', image: 'https://via.placeholder.com/600x600?text=Technique', url: '#', caption: 'Technique' },
  { id: '7', image: 'https://via.placeholder.com/600x600?text=Texture', url: '#', caption: 'Texture' },
  { id: '8', image: 'https://via.placeholder.com/600x600?text=Brillance', url: '#', caption: 'Brillance' },
  { id: '9', image: 'https://via.placeholder.com/600x600?text=Volume', url: '#', caption: 'Volume' },
];

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-96 md:py-120 bg-noir text-blanc">
        <div className="container-fluid text-center">
          <h1 className="text-h1 text-blanc mb-32">
            Réalisations
          </h1>
          <p className="text-body max-w-2xl mx-auto text-gris-medium">
            Découvrez les transformations et créations de Yannick pour ses clients
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-blanc">
        <div className="container-fluid">
          <InstagramFeed posts={realisations} columns={3} />
        </div>
      </section>

      {/* Text */}
      <section className="section-padding bg-gris-light">
        <div className="container-fluid">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-h2 text-noir text-center mb-32">
              Chaque style est unique
            </h2>
            <p className="text-body text-gris-dark text-center">
              Les réalisations ci-dessus représentent quelques-unes des nombreuses transformations et créations réalisées par Yannick. Chaque client a des cheveux uniques, et chaque coupe est adaptée à la morphologie, à la texture et aux envies personnelles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
