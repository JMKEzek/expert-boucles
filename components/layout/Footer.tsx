'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-noir text-blanc">
      {/* Logo centré */}
      <div className="border-b border-[#2a2a2a] py-16 text-center">
        <Link href="/">
          <span
            className="block font-serif font-light uppercase tracking-[0.35em] text-blanc hover:opacity-60 transition-opacity"
            style={{ fontSize: '15px' }}
          >
            Expert Boucles
          </span>
          <span
            className="block font-light uppercase tracking-[0.3em] mt-1"
            style={{ fontSize: '9px', color: 'var(--color-gris-dark)' }}
          >
            Paris 75009
          </span>
        </Link>
      </div>

      {/* Liens + Contact */}
      <div className="container-fluid py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* Navigation */}
          <div>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-[var(--color-gris-dark)] mb-8">
              Navigation
            </span>
            <ul className="space-y-4">
              {[
                { href: '/prestations', label: 'Prestations' },
                { href: '/realisations', label: 'Réalisations' },
                { href: '/a-propos', label: 'À Propos' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gris-medium)] hover:text-blanc transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-[var(--color-gris-dark)] mb-8">
              Contact
            </span>
            <div className="space-y-4">
              <div>
                <a
                  href="tel:0781313094"
                  className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gris-medium)] hover:text-blanc transition-colors"
                >
                  07 81 31 30 94
                </a>
              </div>
              <div>
                <a
                  href="mailto:contact@expert-boucles.com"
                  className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gris-medium)] hover:text-blanc transition-colors"
                >
                  contact@expert-boucles.com
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gris-dark)]">
                  Paris 75009, France
                </span>
              </div>
            </div>
          </div>

          {/* Réseaux */}
          <div>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-[var(--color-gris-dark)] mb-8">
              Suivre
            </span>
            <div className="space-y-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[10px] uppercase tracking-[0.2em] text-[var(--color-gris-medium)] hover:text-blanc transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[10px] uppercase tracking-[0.2em] text-[var(--color-gris-medium)] hover:text-blanc transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2a2a2a]">
        <div className="container-fluid py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-gris-dark)]">
            © {currentYear} Expert Boucles
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/cgv"
              className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-gris-dark)] hover:text-blanc transition-colors"
            >
              CGV
            </Link>
            <span className="text-[var(--color-gris-dark)]">·</span>
            <Link
              href="/mentions-legales"
              className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-gris-dark)] hover:text-blanc transition-colors"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
