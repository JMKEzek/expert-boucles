'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-noir text-blanc">
      {/* Logo centré */}
      <div className="border-b border-gris-dark py-48 text-center">
        <Link href="/" className="group">
          <span
            className="block font-serif font-light uppercase text-blanc group-hover:opacity-60 transition-opacity duration-350"
            style={{ fontSize: '15px', letterSpacing: '0.35em' }}
          >
            Expert Boucles
          </span>
          <span
            className="block font-light uppercase mt-8 group-hover:opacity-60 transition-opacity duration-350"
            style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--color-gris-dark)' }}
          >
            Paris 75009
          </span>
        </Link>
      </div>

      {/* Liens + Contact */}
      <div className="container-fluid py-48">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-32 text-center md:text-left">

          {/* Navigation */}
          <div>
            <span className="text-label-inverted mb-32 block">Navigation</span>
            <ul className="spacing-gap-normal">
              {[
                { href: '/prestations', label: 'Prestations' },
                { href: '/realisations', label: 'Réalisations' },
                { href: '/a-propos', label: 'À Propos' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href} className="mb-16">
                  <Link
                    href={link.href}
                    className="text-10px uppercase tracking-0.2em text-gris-medium hover-opacity transition-opacity duration-350"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="text-label-inverted mb-32 block">Contact</span>
            <div className="spacing-gap-normal">
              <div className="mb-16">
                <a
                  href="tel:0781313094"
                  className="text-10px uppercase tracking-0.2em text-gris-medium hover-opacity transition-opacity duration-350"
                >
                  07 81 31 30 94
                </a>
              </div>
              <div className="mb-16">
                <a
                  href="mailto:contact@expert-boucles.com"
                  className="text-10px uppercase tracking-0.2em text-gris-medium hover-opacity transition-opacity duration-350"
                >
                  contact@expert-boucles.com
                </a>
              </div>
              <div>
                <span className="text-10px uppercase tracking-0.2em text-gris-dark">
                  Paris 75009, France
                </span>
              </div>
            </div>
          </div>

          {/* Réseaux */}
          <div>
            <span className="text-label-inverted mb-32 block">Suivre</span>
            <div className="spacing-gap-normal">
              <a
                href="https://instagram.com/expert_boucles"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-10px uppercase tracking-0.2em text-gris-medium hover-opacity transition-opacity duration-350"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gris-dark">
        <div className="container-fluid py-24 flex flex-col md:flex-row items-center justify-between gap-16">
          <span className="text-9px uppercase tracking-0.2em text-gris-dark">
            © {currentYear} Expert Boucles. Tous droits réservés.
          </span>
          <div className="flex items-center gap-24">
            <Link
              href="/remboursement-annulation"
              className="text-9px uppercase tracking-0.2em text-gris-dark hover-opacity transition-opacity duration-350"
            >
              Remboursement &amp; Annulation
            </Link>
            <span className="text-gris-dark">·</span>
            <Link
              href="/cgv"
              className="text-9px uppercase tracking-0.2em text-gris-dark hover-opacity transition-opacity duration-350"
            >
              CGV
            </Link>
            <span className="text-gris-dark">·</span>
            <Link
              href="/mentions-legales"
              className="text-9px uppercase tracking-0.2em text-gris-dark hover-opacity transition-opacity duration-350"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
