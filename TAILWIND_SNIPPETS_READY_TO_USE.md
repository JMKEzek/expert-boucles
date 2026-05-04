# TAILWIND SNIPPETS — Ready to Use for Expert Boucles

**Copy-paste ready code snippets based on YSL design system**

---

## 📋 Quick Navigation

1. [Buttons](#buttons)
2. [Cards](#cards)
3. [Forms](#forms)
4. [Layouts](#layouts)
5. [Typography](#typography)
6. [Utilities](#utilities)

---

## BUTTONS

### Primary Button
```jsx
<button className="
  px-6 py-3
  bg-black text-white
  font-bold text-sm uppercase
  rounded-none
  border border-black
  transition-all duration-250
  hover:bg-white hover:text-black hover:border-black
  active:opacity-70
  disabled:opacity-50 disabled:cursor-not-allowed
">
  EXPLORER
</button>
```

### Primary Button (Link variant)
```jsx
<a href="/destination" className="
  inline-block
  px-6 py-3
  bg-black text-white
  font-bold text-sm uppercase
  rounded-none
  border border-black
  transition-all duration-250
  hover:bg-white hover:text-black
">
  EXPLORER
</a>
```

### Secondary Button (Gold)
```jsx
<button className="
  px-6 py-3
  bg-white text-black
  font-bold text-sm uppercase
  rounded-none
  border border-gold
  transition-all duration-250
  hover:bg-gold hover:text-white
  active:opacity-70
  disabled:opacity-50
">
  RÉSERVER
</button>
```

### Tertiary Button (Underline)
```jsx
<button className="
  px-0 py-2
  bg-transparent text-black
  font-bold text-sm uppercase
  border-b-2 border-black
  rounded-none
  transition-colors duration-250
  hover:text-gold hover:border-gold
">
  EN SAVOIR +
</button>
```

### Tertiary Button (Light variant)
```jsx
<a href="#" className="
  inline-block
  text-xs font-bold uppercase
  text-black
  border-b border-black
  pb-1
  transition-colors duration-250
  hover:text-gold hover:border-gold
">
  Découvrir
</a>
```

### Button Full Width
```jsx
<button className="
  w-full
  px-6 py-3
  bg-black text-white
  font-bold text-sm uppercase
  rounded-none
  border border-black
  transition-all duration-250
  hover:bg-white hover:text-black
">
  AJOUTER AU PANIER
</button>
```

### Button Group (Horizontal)
```jsx
<div className="flex gap-3">
  <button className="flex-1 px-6 py-3 bg-black text-white font-bold text-sm uppercase border border-black rounded-none transition-all duration-250 hover:bg-white hover:text-black">
    ACHETER
  </button>
  <button className="flex-1 px-6 py-3 bg-white text-black font-bold text-sm uppercase border border-gold rounded-none transition-all duration-250 hover:bg-gold hover:text-white">
    AJOUTER
  </button>
</div>
```

---

## CARDS

### Basic Card
```jsx
<div className="
  border border-gray-200
  rounded-none
  bg-white
  transition-all duration-300
  hover:shadow-md hover:border-gold
">
  {/* Content */}
</div>
```

### Card with Padding
```jsx
<div className="
  p-6
  border border-gray-200
  rounded-none
  bg-white
  transition-all duration-300
  hover:shadow-md hover:border-gold
">
  <h3 className="font-bold mb-2">Title</h3>
  <p className="text-sm text-gray-600">Description</p>
</div>
```

### Product Card (0.8 ratio)
```jsx
<div className="flex flex-col">
  <div className="
    relative bg-gray-100
    aspect-product
    overflow-hidden
    rounded-none
  ">
    <img
      src="product.jpg"
      alt="Product"
      className="
        w-full h-full object-cover object-center
        transition-transform duration-400
        hover:scale-105
      "
    />
  </div>
  <div className="py-4">
    <h3 className="font-bold text-sm uppercase mb-2">
      Produit
    </h3>
    <p className="text-xs text-gray-500 mb-3">
      Description
    </p>
    <div className="flex justify-between items-center">
      <span className="font-bold">€ 120</span>
      <a href="#" className="
        text-xs font-bold uppercase
        border-b border-black
        hover:border-gold hover:text-gold
      ">
        Voir
      </a>
    </div>
  </div>
</div>
```

### Service Card (Full width option)
```jsx
<div className="
  p-6
  border border-gray-200
  rounded-none
  bg-white
  transition-all duration-300
  hover:border-gold hover:shadow-md
">
  <h3 className="text-lg font-bold mb-2">
    Service Name
  </h3>
  <p className="text-sm text-gray-600 mb-4">
    Service description
  </p>
  <div className="flex justify-between items-center">
    <div className="flex gap-4 text-sm">
      <span className="text-gray-500">60 min</span>
      <span className="font-bold">€ 120</span>
    </div>
    <a href="#" className="
      text-xs font-bold uppercase
      border-b-2 border-black
      hover:border-gold hover:text-gold
    ">
      EN SAVOIR +
    </a>
  </div>
</div>
```

### Dark Card
```jsx
<div className="
  p-8
  bg-black text-white
  rounded-none
  shadow-lg
  border-0
">
  <h3 className="font-bold text-xl mb-4">Title</h3>
  <p className="text-base text-gray-300 mb-6">
    Content
  </p>
  <a href="#" className="
    text-xs font-bold uppercase
    border-b border-gold
    text-gold
    hover:text-white hover:border-white
  ">
    Learn More
  </a>
</div>
```

---

## FORMS

### Text Input
```jsx
<input
  type="text"
  placeholder="Votre nom"
  className="
    w-full
    px-0 py-3
    border-b border-gray-300
    bg-transparent
    text-black text-sm
    rounded-none
    transition-colors duration-250
    placeholder-gray-400
    focus:outline-none focus:border-gold focus:shadow-focus
  "
/>
```

### Textarea
```jsx
<textarea
  placeholder="Votre message"
  rows={6}
  className="
    w-full
    px-0 py-3
    border-b border-gray-300
    bg-transparent
    text-black text-sm
    rounded-none
    transition-colors duration-250
    placeholder-gray-400
    resize-none
    focus:outline-none focus:border-gold focus:shadow-focus
  "
/>
```

### Form Field with Label
```jsx
<div className="mb-6">
  <label className="
    block
    text-xs font-bold uppercase
    mb-2
    text-black
  ">
    Email *
  </label>
  <input
    type="email"
    className="
      w-full
      px-0 py-3
      border-b border-gray-300
      bg-transparent
      text-sm
      rounded-none
      transition-colors duration-250
      focus:outline-none focus:border-gold
    "
  />
</div>
```

### Form with Validation
```jsx
<div className="mb-6">
  <label className="
    block
    text-xs font-bold uppercase
    mb-2
  ">
    Message
  </label>
  <textarea
    className="
      w-full
      px-0 py-3
      border-b
      border-gray-300
      bg-transparent
      text-sm
      rounded-none
      transition-colors duration-250
      focus:outline-none focus:border-gold
      aria-invalid:border-error
    "
    aria-invalid="false"
  />
  <p className="text-xs text-error mt-2">
    Le message est requis
  </p>
</div>
```

### Contact Form Complete
```jsx
<form className="max-w-md mx-auto">
  <div className="mb-8">
    <input
      type="text"
      placeholder="Nom"
      className="
        w-full px-0 py-3
        border-b border-gray-300
        bg-transparent text-sm
        placeholder-gray-400
        focus:outline-none focus:border-gold
      "
      required
    />
  </div>

  <div className="mb-8">
    <input
      type="email"
      placeholder="Email"
      className="
        w-full px-0 py-3
        border-b border-gray-300
        bg-transparent text-sm
        placeholder-gray-400
        focus:outline-none focus:border-gold
      "
      required
    />
  </div>

  <div className="mb-8">
    <input
      type="tel"
      placeholder="Téléphone"
      className="
        w-full px-0 py-3
        border-b border-gray-300
        bg-transparent text-sm
        placeholder-gray-400
        focus:outline-none focus:border-gold
      "
    />
  </div>

  <div className="mb-8">
    <textarea
      placeholder="Message"
      rows={5}
      className="
        w-full px-0 py-3
        border-b border-gray-300
        bg-transparent text-sm
        placeholder-gray-400
        resize-none
        focus:outline-none focus:border-gold
      "
      required
    />
  </div>

  <button
    type="submit"
    className="
      w-full px-6 py-3
      bg-black text-white
      font-bold text-sm uppercase
      border border-black
      rounded-none
      transition-all duration-250
      hover:bg-white hover:text-black
    "
  >
    Envoyer
  </button>
</form>
```

---

## LAYOUTS

### Hero Section
```jsx
<section className="
  relative w-full
  pt-32 pb-0
  min-h-screen md:min-h-[60vh]
  flex items-end
">
  <img
    src="/hero.jpg"
    alt="Hero"
    className="
      absolute inset-0 w-full h-full
      object-cover object-center
    "
  />
  <div className="
    absolute inset-0
    bg-gradient-to-b from-transparent to-black/20
  " />

  <div className="
    relative z-10
    max-w-content mx-auto px-8
    pb-16 md:pb-24
    w-full
  ">
    <h1 className="
      text-5xl md:text-6xl lg:text-7xl
      font-light uppercase
      text-white mb-4
      max-w-2xl
    ">
      Spécialiste Cheveux Bouclés
    </h1>
    <p className="
      text-white text-lg md:text-xl
      mb-8 max-w-md
    ">
      Beauté, santé et brillance
    </p>
    <button className="
      px-6 py-3
      bg-white text-black
      font-bold text-sm uppercase
      border border-gold
      rounded-none
      transition-all duration-250
      hover:bg-gold hover:text-white
    ">
      EXPLORER
    </button>
  </div>
</section>
```

### Two Column Layout
```jsx
<section className="py-20 md:py-32">
  <div className="max-w-content mx-auto px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Column 1: Image */}
      <div className="aspect-video overflow-hidden rounded-none">
        <img
          src="/image.jpg"
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Column 2: Text */}
      <div>
        <h2 className="text-4xl font-bold mb-4">
          Title
        </h2>
        <p className="
          text-gray-600 text-lg
          leading-relaxed mb-6
          max-w-none
        ">
          Description text with all details
        </p>
        <button className="
          px-6 py-3
          bg-black text-white
          font-bold text-sm uppercase
          rounded-none
        ">
          CTA Button
        </button>
      </div>
    </div>
  </div>
</section>
```

### Grid Section (3 columns)
```jsx
<section className="py-20 md:py-32">
  <div className="max-w-content mx-auto px-8">
    <h2 className="text-4xl font-bold mb-12">
      Services
    </h2>

    <div className="
      grid grid-cols-1 md:grid-cols-2
      lg:grid-cols-3
      gap-6
    ">
      {/* Cards repeated */}
      {items.map((item) => (
        <div key={item.id} className="
          p-6 border border-gray-200 rounded-none
          transition-all duration-300
          hover:shadow-md hover:border-gold
        ">
          <h3 className="font-bold mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### CTA Section (Centered)
```jsx
<section className="
  py-20 md:py-32
  bg-black text-white
">
  <div className="
    max-w-content mx-auto px-8
    text-center
  ">
    <h2 className="
      text-4xl md:text-5xl
      font-light mb-6
    ">
      Ready to Transform?
    </h2>
    <p className="
      text-lg mb-8
      max-w-xl mx-auto
      text-gray-300
    ">
      Supporting text for CTA
    </p>
    <button className="
      px-6 py-3
      bg-white text-black
      font-bold text-sm uppercase
      rounded-none
      border border-white
      transition-all duration-250
      hover:bg-gold hover:text-white hover:border-gold
    ">
      GET STARTED
    </button>
  </div>
</section>
```

### Navigation Bar
```jsx
<header className="
  fixed top-0 left-0 right-0
  z-50
  bg-white bg-opacity-90
  backdrop-blur-sm
  transition-all duration-300
">
  <nav className="
    max-w-content mx-auto
    px-8 py-6
    flex items-center justify-between
  ">
    {/* Logo */}
    <a href="/" className="
      font-bold text-lg uppercase
      tracking-wide
    ">
      Expert Boucles
    </a>

    {/* Nav Links (desktop) */}
    <div className="hidden md:flex gap-8">
      <a href="/prestations" className="
        text-xs font-bold uppercase
        transition-colors duration-250
        hover:text-gold
      ">
        Prestations
      </a>
      <a href="/a-propos" className="
        text-xs font-bold uppercase
        transition-colors duration-250
        hover:text-gold
      ">
        À Propos
      </a>
      <a href="/contact" className="
        text-xs font-bold uppercase
        transition-colors duration-250
        hover:text-gold
      ">
        Contact
      </a>
    </div>

    {/* CTA Button */}
    <button className="
      hidden md:block
      px-6 py-2
      border-b-2 border-black
      text-xs font-bold uppercase
      transition-colors duration-250
      hover:border-gold hover:text-gold
    ">
      RÉSERVER
    </button>

    {/* Mobile Menu (hamburger) */}
    <button className="md:hidden text-black">
      ☰
    </button>
  </nav>
</header>
```

### Footer
```jsx
<footer className="
  bg-black text-white
  pt-32 pb-8
  mt-32
">
  <div className="max-w-content mx-auto px-8">
    {/* Footer Content */}
    <div className="
      grid grid-cols-1 sm:grid-cols-2
      md:grid-cols-4
      gap-8 mb-12
    ">
      {/* Column 1 */}
      <div>
        <h4 className="
          text-xs font-bold uppercase
          mb-4
        ">
          À Propos
        </h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="
              text-sm text-gray-400
              hover:text-gold
            ">
              Notre histoire
            </a>
          </li>
          <li>
            <a href="#" className="
              text-sm text-gray-400
              hover:text-gold
            ">
              L'équipe
            </a>
          </li>
        </ul>
      </div>

      {/* Columns 2-4 similar */}
    </div>

    {/* Divider */}
    <div className="border-t border-gray-800 pt-8">
      <p className="text-xs text-gray-500">
        © 2026 Expert Boucles. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

---

## TYPOGRAPHY

### Heading H1
```jsx
<h1 className="
  text-5xl md:text-6xl lg:text-7xl
  font-light
  uppercase
  text-black
  mb-4
  leading-tight
">
  Main Heading
</h1>
```

### Heading H2
```jsx
<h2 className="
  text-3xl md:text-4xl
  font-bold
  text-black
  mb-6
  leading-tight
">
  Section Heading
</h2>
```

### Heading H3
```jsx
<h3 className="
  text-xl md:text-2xl
  font-bold
  text-black
  mb-4
  leading-tight
">
  Subsection Heading
</h3>
```

### Body Text
```jsx
<p className="
  text-base md:text-lg
  text-gray-600
  leading-relaxed
  max-w-2xl
  mb-6
">
  Body text with proper spacing and readability
</p>
```

### Small Text / Fine Print
```jsx
<p className="
  text-xs md:text-sm
  text-gray-500
  leading-relaxed
">
  Small text for secondary information
</p>
```

### Text Emphasis
```jsx
<p className="
  text-lg
  text-gray-600
  leading-relaxed
  italic
  border-l-4 border-gold
  pl-4
  py-2
  bg-gray-50
">
  Emphasized or quoted text
</p>
```

---

## UTILITIES

### Container (max-width + centering)
```jsx
<div className="max-w-content mx-auto px-8">
  {/* Content */}
</div>
```

### Section Padding
```jsx
<section className="py-20 md:py-32">
  {/* Content */}
</section>
```

### Aspect Ratio Container
```jsx
<div className="
  aspect-product
  md:aspect-hero
  lg:aspect-square
  overflow-hidden
">
  <img src="image.jpg" alt="Alt text" className="w-full h-full object-cover" />
</div>
```

### Flex Center
```jsx
<div className="flex items-center justify-center">
  {/* Content centered both ways */}
</div>
```

### Grid Auto-responsive
```jsx
<div className="
  grid grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-6
">
  {/* Grid items */}
</div>
```

### Link with hover underline
```jsx
<a href="#" className="
  relative
  inline-block
  text-black
  transition-colors duration-250
  after:content-['']
  after:absolute after:bottom-0 after:left-0
  after:w-0 after:h-px after:bg-gold
  after:transition-all after:duration-250
  hover:after:w-full
">
  Hover me
</a>
```

### Gradient Overlay (dark)
```jsx
<div className="
  relative
  overflow-hidden
  bg-black/50
">
  <img src="image.jpg" alt="Alt" className="w-full h-full object-cover" />
  <div className="
    absolute inset-0
    bg-gradient-to-b from-transparent to-black/50
  " />
</div>
```

### Shadow hover effect
```jsx
<div className="
  transition-all duration-300
  hover:shadow-lg
">
  {/* Content */}
</div>
```

### Border hover effect
```jsx
<div className="
  border border-gray-200
  transition-all duration-300
  hover:border-gold
">
  {/* Content */}
</div>
```

### Opacity transition
```jsx
<button className="
  opacity-100
  transition-opacity duration-250
  hover:opacity-70
  disabled:opacity-50
">
  Click me
</button>
```

---

## RESPONSIVE UTILITIES

### Hide on mobile
```jsx
<div className="hidden md:block">
  Desktop only content
</div>
```

### Show only on mobile
```jsx
<div className="md:hidden">
  Mobile only content
</div>
```

### Responsive text size
```jsx
<p className="text-sm md:text-base lg:text-lg">
  Responsive text
</p>
```

### Responsive padding
```jsx
<section className="px-4 md:px-8 lg:px-16">
  {/* Content with responsive padding */}
</section>
```

### Responsive gap
```jsx
<div className="grid gap-4 md:gap-6 lg:gap-8">
  {/* Grid with responsive gap */}
</div>
```

---

## COMPLETE PAGE EXAMPLE

```jsx
export default function HomePage() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm">
        <nav className="max-w-content mx-auto px-8 py-6 flex items-center justify-between">
          <a href="/" className="font-bold text-lg uppercase">Expert Boucles</a>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-xs font-bold uppercase hover:text-gold">Services</a>
            <a href="#about" className="text-xs font-bold uppercase hover:text-gold">À Propos</a>
          </div>
          <button className="hidden md:block px-6 py-2 border-b-2 border-black text-xs font-bold uppercase hover:border-gold hover:text-gold">RÉSERVER</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative w-full pt-32 pb-0 min-h-screen flex items-end">
        <img src="/hero.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="relative z-10 max-w-content mx-auto px-8 pb-24">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4">Spécialiste Cheveux Bouclés</h1>
          <button className="px-6 py-3 bg-white text-black font-bold text-sm uppercase border border-white rounded-none hover:bg-gold">EXPLORER</button>
        </div>
      </section>

      {/* Services */}
      <section className="py-32" id="services">
        <div className="max-w-content mx-auto px-8">
          <h2 className="text-4xl font-bold mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-none hover:border-gold hover:shadow-md transition-all duration-300">
              <h3 className="font-bold mb-2">Service 1</h3>
              <p className="text-sm text-gray-600 mb-4">Description</p>
              <a href="#" className="text-xs font-bold uppercase border-b border-black hover:border-gold">EN SAVOIR +</a>
            </div>
            {/* More cards... */}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-black text-white text-center">
        <div className="max-w-content mx-auto px-8">
          <h2 className="text-5xl font-light mb-8">Prêt à transformer vos cheveux?</h2>
          <button className="px-6 py-3 bg-white text-black font-bold text-sm uppercase rounded-none hover:bg-gold">RÉSERVER MAINTENANT</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-32 pb-8">
        <div className="max-w-content mx-auto px-8">
          <div className="grid grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-xs font-bold uppercase mb-4">À Propos</h4>
              <ul className="space-y-2"><li><a href="#" className="text-sm text-gray-400 hover:text-gold">Our Story</a></li></ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-xs text-gray-500">© 2026 Expert Boucles</p>
          </div>
        </div>
      </footer>
    </>
  );
}
```

---

**Document créé**: mai 2026
**Status**: Production-ready snippets
**Testing**: All snippets tested on YSL-inspired layouts

