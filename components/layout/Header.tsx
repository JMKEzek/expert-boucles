'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DARK_BG_PAGES = ['/cgv', '/mentions-legales', '/remboursement-annulation', '/a-propos', '/contact'];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const forceDark = DARK_BG_PAGES.some((p) => pathname === p || pathname.startsWith(p + '/'));
  const useDarkStyle = isScrolled || forceDark;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLeft = [
    { href: '/prestations', label: 'Prestations' },
    { href: '/realisations', label: 'Réalisations' },
  ];

  const navRight = [
    { href: '/a-propos', label: 'À Propos' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-350 ${
          useDarkStyle
            ? 'bg-blanc border-b border-gris-light'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-10 md:px-20 lg:px-32 py-3 md:py-4">

          {/* Nav gauche — desktop */}
          <nav className="hidden md:flex items-center gap-32 flex-1">
            {navLeft.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-11px uppercase tracking-0.2em font-medium transition-colors duration-350 hover-opacity ${
                  useDarkStyle ? 'text-noir' : 'text-blanc'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo centré */}
          <Link
            href="/"
            className={`text-center flex-shrink-0 mx-8 transition-colors duration-350 group ${
              useDarkStyle ? 'text-noir' : 'text-blanc'
            }`}
          >
            <span
              className="block font-serif font-light uppercase group-hover:opacity-60 transition-opacity duration-350"
              style={{ fontSize: '19px', letterSpacing: '0.35em' }}
            >
              Expert Boucles
            </span>
            <span
              className="block font-light uppercase mt-0.5 group-hover:opacity-60 transition-opacity duration-350"
              style={{ fontSize: '12px', letterSpacing: '0.3em', color: useDarkStyle ? 'var(--color-gris-medium)' : 'var(--color-gris-dark)' }}
            >
              Paris
            </span>
          </Link>

          {/* Nav droite — desktop */}
          <nav className="hidden md:flex items-center gap-32 flex-1 justify-end">
            {navRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-11px uppercase tracking-0.2em font-medium transition-colors duration-350 hover-opacity ${
                  useDarkStyle ? 'text-noir' : 'text-blanc'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/prestations"
              className={`text-11px uppercase tracking-0.2em font-medium border px-20 py-4 transition-all duration-350 ${
                useDarkStyle
                  ? 'border-noir text-noir hover:bg-noir hover:text-blanc'
                  : 'border-blanc text-blanc hover:bg-blanc hover:text-noir'
              }`}
            >
              Réserver
            </Link>
          </nav>

          {/* Mobile — bouton menu */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 ml-auto transition-colors duration-350 ${
              useDarkStyle ? 'text-noir' : 'text-blanc'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            <span
              className={`w-5 h-px transition-all duration-350 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              } ${useDarkStyle ? 'bg-noir' : 'bg-blanc'}`}
            />
            <span
              className={`w-5 h-px transition-all duration-350 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              } ${useDarkStyle ? 'bg-noir' : 'bg-blanc'}`}
            />
            <span
              className={`w-5 h-px transition-all duration-350 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              } ${useDarkStyle ? 'bg-noir' : 'bg-blanc'}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-noir transition-all duration-350 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-40">
          {[...navLeft, ...navRight].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-blanc font-serif font-light text-3xl uppercase tracking-0.2em hover-opacity transition-opacity duration-350"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/prestations"
            className="btn-inverted mt-16"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Réserver
          </Link>
        </div>
      </div>
    </>
  );
}
