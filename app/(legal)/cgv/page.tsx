export default function CGVPage() {
  return (
    <>
      <section className="section-padding bg-blanc">
        <div className="w-full max-w-3xl mx-auto px-6 sm:px-10">
          <h1 className="text-h1 text-noir mb-64">Conditions Générales de Vente</h1>

          <div className="prose prose-lg max-w-none spacing-gap-loose">
            <h2 className="text-h2 text-noir mt-48 mb-24">1. Informations légales</h2>
            <p className="text-body text-gris-dark">
              Le présent site est édité par Yannick, entrepreneur individuel, sous le nom Expert Boucles
            </p>
            <ul className="text-body text-gris-dark list-disc list-inside mb-24">
              <li>Email : contact@expert-boucles.com</li>
              <li>SIRET : 93012505900016</li>
              <li>Hébergeur : Vercel</li>
              <li>Adresse : 60 rue Francois 1er 75008 Paris</li>
            </ul>

            <h2 className="text-h2 text-noir mt-48 mb-24">2. Réservations des prestations</h2>
            <p className="text-body text-gris-dark">
              Les prestations proposées sur le site sont accessibles uniquement sur rendez-vous, via le site www.expertboucles.com.
            </p>
            <ul className="text-body text-gris-dark list-disc list-inside mb-24">
              <li>L'âge minimum requis pour réserver est de 14 ans.</li>
              <li>Un diagnostic personnalisé ainsi qu'un shampooing sont systématiquement inclus dans chaque prestation.</li>
              <li>La réservation est considérée comme confirmée uniquement après paiement en ligne.</li>
            </ul>

            <h2 className="text-h2 text-noir mt-48 mb-24">3. Modification d'un rendez-vous</h2>
            <p className="text-body text-gris-dark">
              Les demandes de modification sont possibles jusqu'à 48 heures avant la date du rendez-vous.
            </p>
            <p className="text-body text-gris-dark font-semibold mb-12">Procédure :</p>
            <ol className="text-body text-gris-dark list-decimal list-inside mb-24">
              <li>Envoyer un email à contact@expert-boucles.com</li>
              <li>Indiquer vos coordonnées, la date et l'heure initialement réservées, ainsi que vos nouvelles disponibilités.</li>
            </ol>
            <p className="text-body text-gris-dark">
              Une confirmation sera envoyée par email selon les créneaux restants disponibles.
            </p>

            <h2 className="text-h2 text-noir mt-48 mb-24">4. Annulation et remboursement</h2>
            <p className="text-body text-gris-dark">
              Vous pouvez annuler votre rendez-vous dans un délai de 72 heures suivant la prise de réservation.
            </p>
            <p className="text-body text-gris-dark font-semibold mb-12">Procédure :</p>
            <ol className="text-body text-gris-dark list-decimal list-inside mb-24">
              <li>Envoyer un email à contact@expert-boucles.com</li>
              <li>Indiquer vos coordonnées, la date du rendez-vous concerné et le motif de votre annulation.</li>
            </ol>
            <p className="text-body text-gris-dark font-semibold mb-12">Conditions :</p>
            <ul className="text-body text-gris-dark list-disc list-inside mb-24">
              <li>Le remboursement est effectué sous 7 jours, via le même mode de paiement utilisé.</li>
              <li>Les frais de transaction restent à la charge du client.</li>
              <li>Aucun remboursement ne sera possible une fois la prestation réalisée.</li>
            </ul>

            <h2 className="text-h2 text-noir mt-48 mb-24">5. Retard et absence</h2>
            <ul className="text-body text-gris-dark list-disc list-inside mb-24">
              <li>En cas de retard supérieur à 15 minutes, la prestation pourra être écourtée ou annulée sans remboursement.</li>
              <li>En cas de non-présentation sans avertissement, la prestation est considérée comme due et ne pourra être ni reportée ni remboursée.</li>
            </ul>

            <h2 className="text-h2 text-noir mt-48 mb-24">6. Tarifs et paiement</h2>
            <ul className="text-body text-gris-dark list-disc list-inside mb-24">
              <li>Les tarifs sont indiqués en euros TTC.</li>
              <li>Le paiement est effectué de manière sécurisée via la passerelle intégrée au site.</li>
              <li>Aucun paiement en espèces n'est accepté pour la réservation en ligne.</li>
            </ul>

            <h2 className="text-h2 text-noir mt-48 mb-24">7. Propriété intellectuelle</h2>
            <p className="text-body text-gris-dark">
              Tous les contenus présents sur le site (textes, images, visuels, logo Expert Boucles…) sont protégés par la législation sur la propriété intellectuelle.
            </p>
            <p className="text-body text-gris-dark">
              Toute reproduction, représentation ou diffusion, même partielle, est interdite sans autorisation écrite préalable.
            </p>

            <h2 className="text-h2 text-noir mt-48 mb-24">8. Droit applicable et litiges</h2>
            <p className="text-body text-gris-dark">
              Les présentes conditions sont soumises au droit français.
            </p>
            <p className="text-body text-gris-dark">
              En cas de litige, une solution amiable sera privilégiée. À défaut, les tribunaux compétents seront ceux du ressort du siège de l'entreprise.
            </p>

            <p className="text-body-small text-gris-medium mt-64">
              Dernière mise à jour: Mai 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
