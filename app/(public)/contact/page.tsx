'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
    alert('Merci pour votre message. Nous vous recontacterons bientôt.');
  };

  return (
    <>
      {/* Hero */}
      <section className="py-96 md:py-120 bg-noir text-blanc">
        <div className="container-fluid text-center">
          <h1 className="text-h1 text-blanc mb-32">
            Contact
          </h1>
          <p className="text-body max-w-2xl mx-auto text-gris-medium">
            Nous serions ravis de vous entendre. Contactez-nous directement ou remplissez le formulaire ci-dessous.
          </p>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="section-padding bg-blanc">
        <div className="container-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-64">
            {/* Contact Info */}
            <div className="spacing-gap-loose">
              <h2 className="text-h2 text-noir mb-48">Nous contacter</h2>

              <div className="mb-48">
                <span className="section-label">Téléphone</span>
                <a
                  href="tel:0781313094"
                  className="text-body text-noir hover-underline"
                >
                  07 81 31 30 94
                </a>
              </div>

              <div className="mb-48">
                <span className="section-label">Email</span>
                <a
                  href="mailto:contact@expert-boucles.com"
                  className="text-body text-noir hover-underline"
                >
                  contact@expert-boucles.com
                </a>
              </div>

              <div className="mb-48">
                <span className="section-label">Adresse</span>
                <p className="text-body text-noir">
                  75009 Paris, France
                </p>
              </div>

              <div>
                <span className="section-label">Horaires</span>
                <div className="text-body text-noir space-y-8">
                  <p>Mardi - Vendredi: 10h - 19h</p>
                  <p>Samedi: 10h - 18h</p>
                  <p>Dimanche - Lundi: Fermé</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="spacing-gap-normal">
              <div>
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="form-label">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="07 XX XX XX XX"
                />
              </div>

              <div>
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="form-textarea"
                  placeholder="Votre message..."
                />
              </div>

              <button type="submit" className="btn-primary w-full mt-32">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map section placeholder */}
      <section className="bg-gris-light py-96">
        <div className="container-fluid">
          <div className="bg-noir h-96 flex items-center justify-center text-blanc text-center">
            <div>
              <p className="text-body mb-24">Carte Google Maps</p>
              <p className="text-10px uppercase tracking-0.2em text-gris-medium">
                À intégrer avec Google Maps API
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
