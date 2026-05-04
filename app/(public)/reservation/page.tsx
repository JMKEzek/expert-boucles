import type { Metadata } from 'next';
import { AcuityEmbed } from '@/components/booking/AcuityEmbed';

export const metadata: Metadata = {
  title: 'Réservation',
  description:
    'Réservez votre rendez-vous en ligne chez Expert Boucles à Paris 75009. Coupes, soins, colorations pour cheveux bouclés.',
  alternates: {
    canonical: '/reservation',
  },
  openGraph: {
    title: 'Réservation | Expert Boucles',
    description:
      'Choisissez votre prestation et votre créneau en ligne directement.',
    url: '/reservation',
  },
};

export default function ReservationPage() {
  return (
    <main className="bg-blanc min-h-screen">
      <section className="pt-120 md:pt-160 pb-64 text-center">
        <h1 className="text-h1 text-noir mb-24">Réservation</h1>
        <p className="text-body text-noir max-w-2xl mx-auto px-24 leading-relaxed">
          Expert Boucles vous accueille uniquement sur rendez-vous.
          <br />
          Choisissez votre prestation et votre créneau directement en ligne.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-24 pb-64">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-48 gap-y-32 mb-80">
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

          <div>
            <h2 className="text-label text-noir mb-16">Horaires</h2>
            <p className="text-body-small text-noir leading-relaxed uppercase mb-4">
              Fermé le samedi
            </p>
            <p className="text-body text-noir leading-relaxed">
              Mardi — Vendredi & Dimanche
              <br />
              12h00 — 20h00
            </p>
          </div>

          <div>
            <h2 className="text-label text-noir mb-16">Téléphone</h2>
            <p className="text-body text-noir leading-relaxed mb-24">
              07 81 31 30 94
            </p>
            <a href="tel:0781313094" className="btn-primary block w-full text-center">
              Nous appeler
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-24 pb-120">
        <AcuityEmbed ownerID={process.env.NEXT_PUBLIC_ACUITY_OWNER_ID || ''} />
      </section>
    </main>
  );
}
