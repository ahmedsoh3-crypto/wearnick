import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-hscreen min-h-screen bg-black text-white relative overflow-hidden">
      {/* Graffiti background */}
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-20 -z-10" />

      <section className="pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-44 h-12">
                <Image
                  src="/wearnick-logo.jpeg"
                  alt="WearNick Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-4xl font-extrabold">About WearNick</h1>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                Products
              </Link>
              <Link
                href="/customize"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                Customize
              </Link>
            </div>
          </div>

          {/* Hero */}
          <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Streetwear meets custom identity.
            </h2>
            <p className="text-white/70 mt-4 text-lg leading-relaxed">
              WearNick is a custom apparel platform built for people who want their clothing
              to speak louder. We combine a clean black-and-white street aesthetic with
              graffiti-inspired designs—so your hoodie, sweatshirt, or t-shirt feels personal,
              bold, and built for everyday wear.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold">Our Mission</h3>
                <p className="text-white/70 mt-2">
                  Make custom streetwear simple: pick your fit, choose a design, and wear it.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold">Our Style</h3>
                <p className="text-white/70 mt-2">
                  Minimal black & white, graffiti textures, sharp typography, and clean UI.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold">Our Products</h3>
                <p className="text-white/70 mt-2">
                  Hoodies • Sweatshirts • T-Shirts — designed to be worn, layered, and repeated.
                </p>
              </div>
            </div>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Link
                href="/products"
                className="px-7 py-3 rounded-full bg-white text-black font-bold hover:opacity-90 transition"
              >
                Browse Products
              </Link>
              <Link
                href="/customize"
                className="px-7 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
              >
                Start Customizing
              </Link>
            </div>
          </div>

          {/* Values */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-extrabold">Why WearNick?</h3>
              <ul className="mt-4 space-y-3 text-white/70">
                <li>• Fast design selection and customization flow</li>
                <li>• Graffiti design gallery with strong street vibe</li>
                <li>• Clean layout, mobile-first UI</li>
                <li>• Simple cart + demo checkout for presentation</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-extrabold">For the Assignment</h3>
              <p className="text-white/70 mt-4">
                This project demonstrates a complete e-commerce physical design:
                homepage, product catalog, customization workflow, cart, and checkout,
                plus supporting pages like About and Contact.
              </p>
              <p className="text-white/50 mt-3 text-sm">
              </p>
            </div>
          </div>

          <footer className="mt-12 border-t border-white/10 py-8 text-center text-white/60">
            © 2025 WearNick — Custom Street Fashion
          </footer>
        </div>
      </section>
    </main>
  )
}
