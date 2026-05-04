import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Expert Boucles à Paris 75009 pour une demande de rendez-vous, une question ou une information pratique.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Expert Boucles',
    description:
      'Téléphone, email, Instagram, adresse et horaires de réservation Expert Boucles.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="bg-blanc min-h-screen">
      <section className="pt-120 md:pt-160 pb-64 text-center">
        <h1 className="text-h1 text-noir mb-24">Contact</h1>
        <p className="text-body text-noir max-w-2xl mx-auto px-24 leading-relaxed">
          Expert Boucles vous accueille uniquement sur rendez-vous.
          <br />
          N&apos;hésitez pas à nous contacter pour toute demande.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-24 pb-120">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-48 lg:gap-x-96 gap-y-64">
          <div>
            <h2 className="text-label text-noir mb-16">Téléphone</h2>
            <p className="text-body text-noir leading-relaxed mb-24">
              07 81 31 30 94
            </p>
            <a href="tel:0781313094" className="btn-primary block w-full text-center">
              Nous appeler
            </a>
          </div>

          <div>
            <h2 className="text-label text-noir mb-16">Email</h2>
            <p className="text-body text-noir leading-relaxed mb-24 break-words">
              contact@expert-boucles.com
            </p>
            <a
              href="mailto:contact@expert-boucles.com"
              className="btn-primary block w-full text-center"
            >
              Nous écrire
            </a>
          </div>

          <div>
            <h2 className="text-label text-noir mb-16">DM Instagram</h2>
            <p className="text-body text-noir leading-relaxed mb-24">
              @expert_boucles
            </p>
            <a
              href="https://instagram.com/expert_boucles"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block w-full text-center"
            >
              Nous contacter
            </a>
          </div>

          <div>
            <h2 className="text-label text-noir mb-16">Adresse</h2>
            <p className="text-body-small text-noir leading-relaxed uppercase mb-4">
              Uniquement sur rendez-vous
            </p>
            <p className="text-body text-noir leading-relaxed">
              50 Rue de la Chaussée d&apos;Antin
              <br />
              75009 Paris
            </p>
          </div>

          <div className="md:col-span-2 md:max-w-md">
            <h2 className="text-label text-noir mb-16">Horaires de réservation</h2>
            <p className="text-body-small text-noir leading-relaxed uppercase mb-4">
              Uniquement sur rendez-vous
            </p>
            <p className="text-body text-noir leading-relaxed">
              Mardi, Mercredi, Jeudi, Vendredi & Dimanche
              <br />
              12h00 - 20h00 (fermé le samedi)
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
