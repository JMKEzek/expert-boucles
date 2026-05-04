# GUIDE D'IMPLÉMENTATION — Expert Boucles Luxury Design System

**Basé sur l'analyse YSL.com**
**Pour Next.js 14 + Tailwind CSS v3.3.0**

---

## 📋 Sections

1. [Configuration initiale](#1-configuration-initiale)
2. [Variables CSS](#2-variables-css--tokens)
3. [Composants clés](#3-composants-clés)
4. [Pages par pages](#4-implémentation-par-page)
5. [Checklist finale](#5-checklist-implémentation)

---

## 1. CONFIGURATION INITIALE

### 1.1 Tailwind Configuration

**Fichier: `tailwind.config.js`**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primaries
        'black': '#0A0A0A',
        'gold': '#C9A96E',
        'white': '#F5F5F0',

        // Grays
        'gray': {
          '50': '#FAFAF8',
          '100': '#F0F0ED',
          '200': '#E5E5E0',
          '300': '#CCCCCC',
          '400': '#888888',
          '500': '#555555',
          '600': '#333333',
        },

        // States
        'success': '#2E8B57',
        'warning': '#FF9800',
        'error': '#D32F2F',
        'info': '#3B82F6',
      },

      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Helvetica', 'Arial', 'sans-serif'], // Same as sans for YSL
      },

      fontSize: {
        'xs': ['12px', { lineHeight: '1', letterSpacing: '0' }],
        'sm': ['14px', { lineHeight: '1.3', letterSpacing: '0' }],
        'base': ['14px', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['16px', { lineHeight: '1.25', letterSpacing: '0' }],
        'xl': ['18px', { lineHeight: '1.2', letterSpacing: '0' }],
        '2xl': ['24px', { lineHeight: '1.2', letterSpacing: '0' }],
        '3xl': ['32px', { lineHeight: '1.15', letterSpacing: '0' }],
        '4xl': ['36px', { lineHeight: '1.1', letterSpacing: '0' }],
        '5xl': ['48px', { lineHeight: '1.1', letterSpacing: '0' }],
      },

      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '32px',
        '8': '40px',
        '9': '48px',
        '10': '56px',
        '11': '64px',
        '12': '72px',
        '13': '80px',
        '14': '96px',
        '15': '120px',
      },

      boxShadow: {
        'none': 'none',
        'subtle': '0px 2px 4px rgba(0, 0, 0, 0.04)',
        'sm': '0px 2px 4px rgba(0, 0, 0, 0.08)',
        'md': '0px 4px 8px rgba(0, 0, 0, 0.08)',
        'lg': '0px 8px 16px rgba(0, 0, 0, 0.12)',
        'xl': '0px 12px 24px rgba(0, 0, 0, 0.15)',
        'focus': '0px 0px 0px 3px rgba(201, 169, 110, 0.3)',
      },

      aspectRatio: {
        'product': '0.8',
        'hero': '16/9',
        'square': '1',
        'wide': '21/9',
      },

      transitionDuration: {
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'bounce': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      screens: {
        'sm': '425px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },

      maxWidth: {
        'content': '1440px',
        'narrow': '600px',
        'wide': '1200px',
      },

      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'md': '4px',
        'lg': '8px',
      },
    },
  },
  plugins: [],
}
```

---

### 1.2 PostCSS Configuration

**Fichier: `postcss.config.mjs`**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

---

### 1.3 CSS Global

**Fichier: `app/globals.css`**

```css
/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Variables (Optional override) */
:root {
  --color-black: #0A0A0A;
  --color-gold: #C9A96E;
  --color-white: #F5F5F0;
  --color-gray-50: #FAFAF8;
  --color-gray-100: #F0F0ED;
  --color-gray-200: #E5E5E0;
  --color-gray-300: #CCCCCC;
  --color-gray-400: #888888;
  --color-gray-500: #555555;
  --color-success: #2E8B57;
  --color-warning: #FF9800;
  --color-error: #D32F2F;
  --color-info: #3B82F6;
}

/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 0px; /* YSL: Sharp corners */
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: 'Helvetica', 'Arial', sans-serif;
  color: #0A0A0A;
  background-color: #F5F5F0;
  line-height: 1.6;
}

/* Typography base */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h1 {
  font-size: 48px;
  font-weight: 400;
  line-height: 1.1;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 16px;
}

p {
  margin-bottom: 1rem;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.25s linear;
}

a:hover {
  color: #C9A96E;
}

/* Images responsive */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Form elements */
input,
textarea,
select {
  font-family: inherit;
  font-size: 14px;
  color: #0A0A0A;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #C9A96E;
}

/* Buttons reset */
button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Scrollbar styling (optional) */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #F0F0ED;
}

::-webkit-scrollbar-thumb {
  background-color: #C9A96E;
  border-radius: 4px;
}

/* Selection color */
::selection {
  background-color: #C9A96E;
  color: #FFF;
}
```

---

## 2. VARIABLES CSS & TOKENS

### 2.1 CSS Variables complètes

Ajouter à `app/globals.css`:

```css
/* Extended CSS Variables */
:root {
  /* Colors */
  --color-primary: #0A0A0A;
  --color-accent: #C9A96E;
  --color-background: #F5F5F0;

  /* Spacing (4px base) */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 32px;
  --spacing-8: 40px;
  --spacing-9: 48px;
  --spacing-10: 56px;
  --spacing-11: 64px;
  --spacing-12: 72px;
  --spacing-13: 80px;
  --spacing-14: 96px;
  --spacing-15: 120px;

  /* Font sizes */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 18px;
  --text-2xl: 24px;
  --text-3xl: 32px;
  --text-4xl: 36px;
  --text-5xl: 48px;

  /* Line heights */
  --lh-tight: 1;
  --lh-normal: 1.2;
  --lh-relaxed: 1.6;
  --lh-loose: 1.8;

  /* Shadows */
  --shadow-subtle: 0px 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0px 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md: 0px 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0px 8px 16px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0px 12px 24px rgba(0, 0, 0, 0.15);

  /* Transitions */
  --duration-fast: 250ms;
  --duration-normal: 300ms;
  --duration-slow: 400ms;
  --easing-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --easing-bounce: cubic-bezier(0.22, 1, 0.36, 1);

  /* Breakpoints */
  --breakpoint-sm: 425px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1440px;

  /* Z-index */
  --z-dropdown: 100;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-tooltip: 1000;
}
```

---

## 3. COMPOSANTS CLÉS

### 3.1 Button Component

**Fichier: `components/Button.tsx`**

```tsx
import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      font-bold text-sm uppercase
      rounded-none
      transition-all duration-250
      disabled:opacity-50 disabled:cursor-not-allowed
      active:opacity-70
    `;

    const variants = {
      primary: `
        bg-black text-white
        border border-black
        hover:bg-white hover:text-black
      `,
      secondary: `
        bg-white text-black
        border border-gold
        hover:bg-gold hover:text-white
      `,
      tertiary: `
        bg-transparent text-black
        border-b-2 border-black
        hover:text-gold hover:border-gold
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

---

### 3.2 Card Component

**Fichier: `components/Card.tsx`**

```tsx
import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  noBorder?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = true, noBorder = false }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-none',
          !noBorder && 'border border-gray-200',
          hover && 'transition-all duration-300 hover:shadow-md hover:border-gold',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
```

---

### 3.3 Product Card Component

**Fichier: `components/ProductCard.tsx`**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import clsx from 'clsx';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  href: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
  href,
}: ProductCardProps) => {
  return (
    <Link href={href}>
      <div className="flex flex-col cursor-pointer group">
        {/* Image container */}
        <div className={clsx(
          'relative bg-gray-100 overflow-hidden',
          'aspect-product',
          'transition-all duration-300'
        )}>
          <Image
            src={image}
            alt={name}
            fill
            className={clsx(
              'object-cover object-center',
              'transition-transform duration-400',
              'group-hover:scale-105'
            )}
          />
        </div>

        {/* Content */}
        <div className="py-4">
          <h3 className="text-sm font-bold uppercase tracking-wide mb-2">
            {name}
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">€ {price}</span>
            <Button variant="tertiary" size="sm">
              Voir
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
```

---

### 3.4 Service Card Component (Expert Boucles)

**Fichier: `components/ServiceCard.tsx`**

```tsx
import React from 'react';
import { Button } from './Button';
import clsx from 'clsx';

interface ServiceCardProps {
  title: string;
  description: string;
  duration: string;
  price: number;
  href: string;
  image?: string;
}

export const ServiceCard = ({
  title,
  description,
  duration,
  price,
  href,
  image,
}: ServiceCardProps) => {
  return (
    <div className={clsx(
      'p-6 border border-gray-200 rounded-none',
      'bg-white',
      'transition-all duration-300',
      'hover:border-gold hover:shadow-md'
    )}>
      {image && (
        <div className="mb-4 aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className={clsx(
              'w-full h-full object-cover',
              'transition-transform duration-400',
              'group-hover:scale-105'
            )}
          />
        </div>
      )}

      <h3 className="text-lg font-bold mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {description}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <span className="text-xs text-gray-500">
            {duration}
          </span>
          <span className="text-sm font-bold">
            € {price}
          </span>
        </div>
        <Button variant="tertiary" size="sm" asChild>
          <a href={href}>En savoir +</a>
        </Button>
      </div>
    </div>
  );
};
```

---

### 3.5 Input Component

**Fichier: `components/Input.tsx`**

```tsx
import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold uppercase mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full',
            'px-0 py-3',
            'border-b border-gray-300',
            'bg-transparent',
            'text-black text-sm',
            'rounded-none',
            'transition-colors duration-250',
            'placeholder-gray-400',
            'focus:outline-none focus:border-gold focus:shadow-focus',
            error && 'border-error',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-error mt-1">
            {error}
          </p>
        )}
        {helperText && (
          <p className="text-xs text-gray-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

---

### 3.6 Header/Navigation Component

**Fichier: `components/Header.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Prestations', href: '/prestations' },
    { label: 'À Propos', href: '/a-propos' },
    { label: 'Réalisations', href: '/realisations' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50',
      'bg-white bg-opacity-90',
      'transition-all duration-300',
      'backdrop-blur-sm'
    )}>
      <nav className="max-w-content mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center font-bold text-lg uppercase tracking-wide"
        >
          Expert Boucles
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'text-xs font-bold uppercase',
                'text-black',
                'transition-colors duration-250',
                'hover:text-gold'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className={clsx(
              'px-6 py-3',
              'border-b-2 border-black',
              'text-xs font-bold uppercase',
              'transition-colors duration-250',
              'hover:border-gold hover:text-gold'
            )}
          >
            Réserver
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-8 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold uppercase hover:text-gold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
```

---

## 4. IMPLÉMENTATION PAR PAGE

### 4.1 Page d'accueil (Home)

**Fichier: `app/page.tsx`**

```tsx
import Image from 'next/image';
import { Button } from '@/components/Button';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className={clsx(
        'relative w-full',
        'pt-32 pb-0',
        'min-h-screen md:min-h-[60vh]',
        'flex items-end'
      )}>
        <Image
          src="/images/hero.jpg"
          alt="Expert Boucles Hero"
          fill
          className="object-cover object-right"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

        {/* Content */}
        <div className="relative z-10 max-w-content mx-auto px-8 pb-16 md:pb-24">
          <h1 className={clsx(
            'text-5xl md:text-6xl lg:text-7xl',
            'font-light uppercase',
            'text-white mb-4',
            'max-w-2xl'
          )}>
            Spécialiste Cheveux Bouclés
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-md">
            Beauté, santé et brillance pour vos cheveux
          </p>
          <Button variant="secondary" size="lg" asChild>
            <a href="/prestations">Explorer nos services</a>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-content mx-auto px-8">
          <h2 className={clsx(
            'text-3xl md:text-4xl font-bold mb-4',
            'text-black'
          )}>
            Nos Prestations
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Découvrez notre gamme complète de soins spécialisés...
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map services from database */}
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={clsx(
        'py-20 md:py-32',
        'bg-black text-white'
      )}>
        <div className="max-w-content mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Prêt à transformer vos cheveux?
          </h2>
          <Button variant="secondary" size="lg" asChild>
            <a href="/contact">Réserver une consultation</a>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}
```

---

### 4.2 Page Services

**Fichier: `app/(public)/prestations/page.tsx`**

```tsx
import { Header } from '@/components/Header';
import { ServiceCard } from '@/components/ServiceCard';
import clsx from 'clsx';

export default function ServicesPage() {
  return (
    <>
      <Header />

      {/* Page Header */}
      <section className={clsx(
        'pt-32 pb-16 md:pt-40 md:pb-24',
        'bg-gradient-to-b from-gray-50 to-white'
      )}>
        <div className="max-w-content mx-auto px-8">
          <h1 className="text-5xl md:text-6xl font-light mb-4">
            Nos Prestations
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Découvrez tous les soins spécialisés que nous proposons...
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-content mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.name}
                description={service.description}
                duration={service.duration}
                price={service.price}
                href={`/prestations/${service.slug}`}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className={clsx(
        'py-20 md:py-32',
        'bg-gold text-white'
      )}>
        <div className="max-w-content mx-auto px-8 text-center">
          <h2 className="text-4xl font-light mb-6">
            Réservez votre soin
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Disponibilités et paiement en ligne sécurisé
          </p>
          <Button variant="primary" size="lg" asChild>
            <a href="/contact#booking">Accéder au calendrier</a>
          </Button>
        </div>
      </section>
    </>
  );
}
```

---

### 4.3 Page produit individuel

**Fichier: `app/(public)/prestations/[slug]/page.tsx`**

```tsx
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import clsx from 'clsx';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  // Fetch service from database
  const service = getServiceBySlug(params.slug);

  return (
    <>
      <Header />

      <article className="pt-32 pb-20 md:pb-32">
        <div className="max-w-content mx-auto px-8">
          {/* Header with image */}
          <div className={clsx(
            'grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start'
          )}>
            {/* Image */}
            <div className="aspect-video md:sticky md:top-32">
              <Image
                src={service.image}
                alt={service.name}
                width={600}
                height={400}
                className={clsx(
                  'w-full h-full object-cover',
                  'rounded-none'
                )}
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-4">
                {service.name}
              </h1>

              <div className={clsx(
                'mb-8',
                'border-t border-gray-200 pt-6'
              )}>
                <div className="flex gap-8 mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                      Durée
                    </p>
                    <p className="text-lg font-bold">
                      {service.duration} min
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                      Prix
                    </p>
                    <p className="text-lg font-bold">
                      € {service.price}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              {service.includes && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">
                    Inclus dans le soin
                  </h3>
                  <ul className="space-y-2">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start gap-3">
                        <span className="text-gold font-bold mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                variant="secondary"
                size="lg"
                fullWidth
                asChild
              >
                <a href="/contact#booking">Réserver ce soin</a>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
```

---

## 5. CHECKLIST IMPLÉMENTATION

### 5.1 Structure & Setup

- [ ] Next.js 14 configuré
- [ ] Tailwind CSS v3.3.0 installé
- [ ] `tailwind.config.js` avec custom theme
- [ ] `postcss.config.mjs` configuré
- [ ] `app/globals.css` avec base styles
- [ ] CSS variables définies
- [ ] TypeScript strict enabled

### 5.2 Composants de base

- [ ] `Button` component créé et testé
- [ ] `Card` component créé
- [ ] `ProductCard` component créé
- [ ] `ServiceCard` component créé
- [ ] `Input` component créé
- [ ] `Header` component créé
- [ ] `Footer` component créé
- [ ] `Navigation` component créé

### 5.3 Pages principales

- [ ] Home page (`/`) créée
  - [ ] Hero section avec image
  - [ ] Services overview
  - [ ] CTA sections
  - [ ] Responsive design
- [ ] Services page (`/prestations`) créée
  - [ ] Service grid
  - [ ] Service cards avec hover
  - [ ] Booking CTA
- [ ] Service detail page (`/prestations/[slug]`) créée
  - [ ] Image showcase
  - [ ] Description full
  - [ ] Booking button
  - [ ] Related services

### 5.4 Design System compliance

- [ ] Couleurs YSL appliquées partout
  - [ ] Black #0A0A0A
  - [ ] Gold #C9A96E
  - [ ] White #F5F5F0
  - [ ] Grays scale
- [ ] Typographie
  - [ ] Font stack: Helvetica/Arial
  - [ ] H1-H6 sizes corrects
  - [ ] Body font size 14px
  - [ ] Line-heights corrects
- [ ] Spacing
  - [ ] 4px base scale utilisé
  - [ ] Sections 80px padding
  - [ ] Cards 16-24px padding
  - [ ] Grid gap 24px
- [ ] Images
  - [ ] Product ratio 0.8 appliqué
  - [ ] Hero ratio 16:9
  - [ ] Image optimization (Next Image)
  - [ ] Lazy loading enabled
- [ ] Interactions
  - [ ] Transitions 0.25s/0.35s/0.4s
  - [ ] Hover states sur cards
  - [ ] Focus states sur inputs
  - [ ] Button states (normal/hover/active/disabled)
- [ ] Shadows
  - [ ] Subtle shadow sur cards hover
  - [ ] Focus shadow sur inputs
  - [ ] Modal shadows

### 5.5 Quality Assurance

- [ ] Mobile responsive (< 425px)
  - [ ] Single column layouts
  - [ ] Touch friendly buttons (48px min)
  - [ ] Hamburger menu
- [ ] Tablet responsive (425px - 768px)
  - [ ] 2 column grids
  - [ ] Expanded navigation
- [ ] Desktop responsive (> 768px)
  - [ ] 3-4 column grids
  - [ ] Full featured navigation
- [ ] Accessibility
  - [ ] Focus states visible
  - [ ] Color contrast AAA
  - [ ] Alt text on images
  - [ ] Semantic HTML
- [ ] Performance
  - [ ] Images optimized
  - [ ] CSS minified
  - [ ] No unused CSS
  - [ ] Lighthouse score > 90

### 5.6 Content & Copy

- [ ] All text content added
- [ ] Images sourced/optimized
- [ ] Service descriptions complete
- [ ] Metadata/SEO added
- [ ] Legal pages created (CGV, Mentions légales)

### 5.7 Testing

- [ ] Build succeeds (`npm run build`)
- [ ] Dev server runs (`npm run dev`)
- [ ] No console errors/warnings
- [ ] Links all work
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Responsive design tested on devices

---

## QUICK REFERENCE — Copy/Paste snippets

### Hero Section Template

```tsx
<section className="relative w-full pt-32 pb-0 min-h-screen md:min-h-[60vh] flex items-end">
  <Image
    src="/images/hero.jpg"
    alt="Hero"
    fill
    className="object-cover object-center"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
  <div className="relative z-10 max-w-content mx-auto px-8 pb-16">
    <h1 className="text-5xl md:text-6xl font-light text-white mb-4">Title</h1>
    <Button>CTA</Button>
  </div>
</section>
```

### Grid Section Template

```tsx
<section className="py-20 md:py-32">
  <div className="max-w-content mx-auto px-8">
    <h2 className="text-4xl font-bold mb-12">Heading</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Items */}
    </div>
  </div>
</section>
```

### Form Template

```tsx
<form className="max-w-md">
  <Input label="Nom" type="text" required />
  <Input label="Email" type="email" required />
  <textarea className="w-full border-b border-gray-300 py-3 focus:border-gold" />
  <Button variant="primary" fullWidth type="submit">
    Envoyer
  </Button>
</form>
```

---

**Document créé**: mai 2026
**Stack**: Next.js 14 + Tailwind CSS v3.3.0 + TypeScript
**Status**: Prêt pour implémentation
