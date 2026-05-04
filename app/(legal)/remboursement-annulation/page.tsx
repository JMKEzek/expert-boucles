export default function RemboursementAnnulationPage() {
  return (
    <>
      <section className="section-padding bg-blanc">
        <div className="w-full max-w-3xl mx-auto px-6 sm:px-10">
          <h1 className="text-h1 text-noir mb-64">Remboursement et Annulation</h1>

          <div className="prose prose-lg max-w-none spacing-gap-loose">
            <h2 className="text-h2 text-noir mt-48 mb-24">Comment annuler une réservation ?</h2>
            <p className="text-body text-gris-dark">
              Vous disposez d'un délai de 72 heures suivant la prise de rendez-vous pour annuler une prestation.
            </p>
            <p className="text-body text-gris-dark font-semibold mb-12">Pour effectuer l'annulation :</p>
            <ol className="text-body text-gris-dark list-decimal list-inside mb-24">
              <li>Envoyez un email à l'adresse suivante : contact@expert-boucles.com</li>
              <li>Indiquez vos coordonnées, la date et l'heure du rendez-vous concerné, ainsi que le motif de votre demande.</li>
              <li>Nous vous confirmerons la prise en compte de votre annulation par retour de mail.</li>
            </ol>

            <h2 className="text-h2 text-noir mt-48 mb-24">Comment modifier une réservation ?</h2>
            <p className="text-body text-gris-dark">
              Les modifications sont possibles jusqu'à 48 heures avant la date du rendez-vous.
            </p>
            <p className="text-body text-gris-dark font-semibold mb-12">Pour cela :</p>
            <ol className="text-body text-gris-dark list-decimal list-inside mb-24">
              <li>Contactez-nous par email à contact@expert-boucles.com</li>
              <li>Précisez vos coordonnées, la date initiale et vos nouvelles disponibilités.</li>
              <li>Nous vous proposerons un créneau selon les disponibilités restantes.</li>
            </ol>

            <h2 className="text-h2 text-noir mt-48 mb-24">Remboursement</h2>
            <ul className="text-body text-gris-dark list-disc list-inside mb-24">
              <li>Les remboursements sont effectués sous 7 jours maximum après validation de votre demande.</li>
              <li>Le montant est recrédité via le même mode de paiement.</li>
              <li>Les frais de transaction restent à la charge du client. Aucun remboursement ne sera effectué une fois la prestation réalisée.</li>
            </ul>

            <p className="text-body-small text-gris-medium mt-64">
              Dernière mise à jour: Mai 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
