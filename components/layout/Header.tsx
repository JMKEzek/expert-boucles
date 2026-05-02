'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-blanc border-b border-[var(--color-gris-light)]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-5 md:py-6">

          {/* Nav gauche — desktop */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {navLeft.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] uppercase tracking-[0.2em] font-light transition-colors duration-200 hover:opacity-50 ${
                  isScrolled ? 'text-noir' : 'text-blanc'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo centré */}
          <Link
            href="/"
            className={`text-center flex-shrink-0 mx-8 transition-colors duration-200 ${
              isScrolled ? 'text-noir' : 'text-blanc'
            }`}
          >
            <span
              className="block font-serif font-light tracking-[0.3em] uppercase"
              style={{ fontSize: '15px', letterSpacing: '0.35em' }}
            >
              Expert Boucles
            </span>
            <span
              className="block font-light tracking-[0.25em] uppercase mt-0.5"
              style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--color-gris-medium)' }}
            >
              Paris
            </span>
          </Link>

          {/* Nav droite — desktop */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-end">
            {navRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] uppercase tracking-[0.2em] font-light transition-colors duration-200 hover:opacity-50 ${
                  isScrolled ? 'text-noir' : 'text-blanc'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/prestations"
              className={`text-[10px] uppercase tracking-[0.2em] font-light border px-5 py-2.5 transition-all duration-200 ${
                isScrolled
                  ? 'border-noir text-noir hover:bg-noir hover:text-blanc'
                  : 'border-blanc text-blanc hover:bg-blanc hover:text-noir'
              }`}
            >
              Réserver
            </Link>
          </nav>

          {/* Mobile — bouton menu */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 ml-auto transition-colors duration-200 ${
              isScrolled ? 'text-noir' : 'text-blanc'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-px transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              } ${isScrolled ? 'bg-noir' : 'bg-blanc'}`}
            />
            <span
              className={`w-5 h-px transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              } ${isScrolled ? 'bg-noir' : 'bg-blanc'}`}
            />
            <span
              className={`w-5 h-px transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              } ${isScrolled ? 'bg-noir' : 'bg-blanc'}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-noir transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {[...navLeft, ...navRight].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-blanc font-serif font-light text-3xl uppercase tracking-[0.2em] hover:opacity-50 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/prestations"
            className="btn-inverted mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Réserver
          </Link>
        </div>
      </div>
    </>
  );
}
