import Link from 'next/link';
import { ReviewsResponse } from '@/app/api/google-reviews/route';

async function getGoogleRating(): Promise<{ rating: number; total: number }> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/google-reviews`, {
      next: { revalidate: 86400 }, // cache 24h, aligné avec l'API
    });
    if (!res.ok) return { rating: 0, total: 0 };
    const data: ReviewsResponse = await res.json();
    return { rating: data.averageRating, total: data.totalReviews };
  } catch {
    return { rating: 0, total: 0 };
  }
}

export default async function AProposPage() {
  const { rating, total } = await getGoogleRating();
  return (
    <>
      {/* Hero */}
      <section className="py-96 md:py-120 bg-noir text-blanc">
        <div className="container-fluid text-center">
          <h1 className="text-h1 text-blanc mb-32">
            Yannick
          </h1>
          <p className="text-body max-w-2xl mx-auto text-gris-medium">
            Coiffeur spécialisé en cheveux bouclés — Paris 75009
          </p>
        </div>
      </section>

      {/* Mon Parcours */}
      <section className="section-padding bg-blanc">
        <div className="container-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-64 items-start">
            {/* Text */}
            <div>
              <span className="section-label text-or mb-16 block">Mon parcours</span>
              <h2 className="text-h2 text-noir mb-32">
                L'exigence, la rigueur et l'élégance du geste
              </h2>
              <p className="text-body text-gris-dark mb-24">
                La coiffure est ma vocation. Formé dans les grandes maisons — dont Jean Louis David — j'y ai appris l'exigence, la rigueur et l'élégance du geste. Cette école classique a forgé ma technique et mon sens du détail.
              </p>
              <p className="text-body text-gris-dark">
                Mon expérience s'est ensuite nourrie d'influences internationales, créant un équilibre entre héritage classique et liberté artistique. Une vision singulière, au service des cheveux bouclés.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-32">
              <div className="text-center p-32 border border-gris-light">
                <div className="text-4xl font-light text-or mb-16">10+</div>
                <p className="text-10px uppercase tracking-0.2em text-gris-dark">Années d'expérience</p>
              </div>
              <div className="text-center p-32 border border-gris-light">
                <div className="text-4xl font-light text-or mb-16">2000+</div>
                <p className="text-10px uppercase tracking-0.2em text-gris-dark">Clients satisfaits</p>
              </div>
              <div className="text-center p-32 border border-gris-light">
                <div className="text-4xl font-light text-or mb-16">
                  {rating > 0 ? rating.toFixed(1) : '—'}
                </div>
                <p className="text-10px uppercase tracking-0.2em text-gris-dark">
                  {total > 0 ? `Google · ${total} avis` : 'Note Google'}
                </p>
              </div>
              <div className="text-center p-32 border border-gris-light">
                <div className="text-4xl font-light text-or mb-16">Paris<br/>IX</div>
                <p className="text-10px uppercase tracking-0.2em text-gris-dark">50 rue Chaussée d'Antin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation — Ma Méthode */}
      <section className="section-padding bg-noir">
        <div className="container-fluid text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-h2 md:text-h1 font-light text-blanc italic leading-tight mb-32">
              "Avant de couper,<br />j'écoute."
            </p>
            <footer className="text-10px uppercase tracking-0.2em text-or">
              Yannick — Expert Boucles
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Ma Méthode de Travail */}
      <section className="section-padding bg-gris-light">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto text-center mb-64">
            <span className="section-label text-or mb-16 block">Ma méthode</span>
            <h2 className="text-h2 text-noir mb-32">
              L'ajustement, la précision et la bienveillance
            </h2>
            <p className="text-body text-gris-dark">
              Chaque consultation commence par un diagnostic complet : habitudes de lavage, historique capillaire, besoins du cuir chevelu. Ce n'est qu'après cette écoute attentive que le travail commence — pour sublimer vos boucles durablement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
            <div className="p-40 bg-blanc">
              <div className="text-or text-h3 font-light mb-24">01</div>
              <h3 className="text-h4 text-noir mb-16">Le diagnostic</h3>
              <p className="text-body-small text-gris-dark">
                Analyse de votre texture, de votre historique capillaire et de vos habitudes quotidiennes. Une écoute active avant tout geste technique.
              </p>
            </div>
            <div className="p-40 bg-blanc">
              <div className="text-or text-h3 font-light mb-24">02</div>
              <h3 className="text-h4 text-noir mb-16">La précision</h3>
              <p className="text-body-small text-gris-dark">
                Maîtrise des techniques curly et sens du détail pour une coupe sur-mesure qui respecte et révèle votre texture naturelle.
              </p>
            </div>
            <div className="p-40 bg-blanc">
              <div className="text-or text-h3 font-light mb-24">03</div>
              <h3 className="text-h4 text-noir mb-16">La durabilité</h3>
              <p className="text-body-small text-gris-dark">
                Un résultat qui dure. Conseils personnalisés pour entretenir vos boucles et retrouver cette émotion à chaque lavage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ma Passion */}
      <section className="section-padding bg-blanc">
        <div className="container-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-64 items-center">
            <div>
              <span className="section-label text-or mb-16 block">Ma passion</span>
              <h2 className="text-h2 text-noir mb-32">
                Les cheveux bouclés sont vivants, changeants, puissants
              </h2>
              <p className="text-body text-gris-dark mb-24">
                Ce qui me motive profondément, c'est la transformation. Permettre à chaque cliente de se réapproprier sa texture naturelle — de la voir enfin comme une force plutôt qu'une contrainte.
              </p>
              <p className="text-body text-gris-dark mb-24">
                Les cheveux bouclés ne se domptent pas, ils se comprennent. Chaque boucle a sa logique, son rythme, son caractère. Mon rôle est de les révéler, pas de les contraindre.
              </p>
              <p className="text-body text-gris-dark">
                Ce que je cherche à créer, c'est une émotion — pas seulement un résultat.
              </p>
            </div>

            {/* Ma Signature */}
            <div className="bg-noir p-48">
              <span className="section-label text-or mb-24 block">Ma signature</span>
              <h3 className="text-h3 text-blanc mb-24">L'art du sur-mesure</h3>
              <p className="text-body text-gris-medium mb-32">
                Mon travail repose sur une combinaison rare : maîtrise technique des méthodes curly et sensibilité esthétique affûtée. Le résultat est une coiffure harmonieuse, unique, qui vous ressemble vraiment.
              </p>
              <div className="border-t border-gris-dark pt-32">
                <p className="text-10px uppercase tracking-0.2em text-or mb-8">Adresse</p>
                <p className="text-body-small text-blanc">50 rue de la Chaussée d'Antin — Paris 75009</p>
              </div>
              <div className="mt-24">
                <p className="text-10px uppercase tracking-0.2em text-or mb-8">Horaires</p>
                <p className="text-body-small text-blanc">Mardi · Mercredi · Vendredi · Dimanche<br/>12h - 20h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gris-light border-t border-gris-light">
        <div className="container-fluid text-center">
          <h2 className="text-h2 text-noir mb-32">
            Rencontrez Yannick
          </h2>
          <p className="text-body text-gris-dark mb-48 max-w-2xl mx-auto">
            Réservez votre séance et découvrez une approche sur-mesure, pensée pour révéler vos boucles dans toute leur puissance.
          </p>
          <Link href="/prestations" className="btn-primary">
            Réserver une séance
          </Link>
        </div>
      </section>
    </>
  );
}
