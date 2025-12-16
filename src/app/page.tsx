'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Sparkles, Shirt, User } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Graffiti background */}
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-20 -z-10" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="relative w-44 h-12 shrink-0">
            <Image
              src="/wearnick-logo.jpeg"
              alt="WearNick Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-5 flex-wrap justify-end text-sm md:text-base">
            <Link href="/" className="text-white hover:opacity-80">
              Home
            </Link>
            <Link href="/products" className="text-white/80 hover:text-white">
              Products
            </Link>
            <Link href="/customize" className="text-white/80 hover:text-white">
              Customize
            </Link>
            <Link href="/cart" className="text-white/80 hover:text-white">
              Cart
            </Link>
                        <Link href="/about" className="text-white/80 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6">
              Design Your
              <span className="block">Streetwear</span>
            </h1>

            <p className="text-xl text-white/70 mb-10">
              Custom Hoodies, Sweatshirts, and T-Shirts with urban graffiti
              designs.
            </p>

            {/* CTA + Product Buttons */}
            <div className="flex flex-col gap-6">
              {/* Main CTA */}
              <Link
                href="/customize"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform"
              >
                <ShoppingBag size={24} />
                Start Designing
              </Link>

              {/* Product Quick Buttons */}
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/products?type=shirts"
                  className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  Shirts
                </Link>

                <Link
                  href="/products?type=hoodies"
                  className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  Hoodies
                </Link>

                <Link
                  href="/products?type=sweatshirts"
                  className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  Sweatshirts
                </Link>
              </div>

              {/* Secondary actions */}
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white hover:text-black transition font-semibold"
                >
                  Browse Catalog
                </Link>

                <Link
                  href="/cart"
                  className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white hover:text-black transition font-semibold"
                >
                  View Cart
                </Link>

                
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/20">
                  <Shirt className="text-white mb-3" size={32} />
                  <h3 className="font-semibold mb-1">T-Shirts</h3>
                  <p className="text-white/60 text-sm">
                    Bold prints & premium fabric
                  </p>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/20">
                  <User className="text-white mb-3" size={32} />
                  <h3 className="font-semibold mb-1">Hoodies</h3>
                  <p className="text-white/60 text-sm">
                    Oversized street fit
                  </p>
                </div>

                <div className="col-span-2 bg-white/5 p-6 rounded-2xl border border-white/20">
                  <Sparkles className="text-white mb-3" size={32} />
                  <h3 className="font-semibold mb-1">Graffiti Designs</h3>
                  <p className="text-white/60 text-sm">
                    Urban street art inspired prints
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Style',
                desc: 'Pick Hoodie, Sweatshirt, or T-Shirt.',
              },
              {
                step: '02',
                title: 'Select a Design',
                desc: 'Choose from the graffiti design collection.',
              },
              {
                step: '03',
                title: 'Checkout',
                desc: 'Complete your order using a demo checkout flow.',
              },
            ].map((x) => (
              <div
                key={x.step}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
              >
                <div className="text-3xl font-extrabold mb-4">
                  {x.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {x.title}
                </h3>
                <p className="text-white/70">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with socials + contact */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="relative w-44 h-12">
              <Image
                src="/wearnick-logo.jpeg"
                alt="WearNick Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white/60 mt-3">
              Custom Street Fashion Apparel — black & white urban vibes.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-white/70">
              <Link href="/products" className="hover:text-white">Products</Link>
              <Link href="/customize" className="hover:text-white">Customize</Link>
              <Link href="/cart" className="hover:text-white">Cart</Link>
              <Link href="/checkout" className="hover:text-white">Checkout</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Socials & Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/officials_by_wearnick?igsh=MTMydXc3b3oyODF0MA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition"
              >
                Instagram
              </a>

              <a
                href="https://www.facebook.com/share/1DrMmB8svU/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition"
              >
                Facebook
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition"
              >
                TikTok
              </a>

              <div className="text-white/70 text-sm mt-2 space-y-1">
                <div>
                  <span className="text-white font-semibold">Email:</span>{' '}
                  officials@wearnick.com
                </div>
                <div>
                  <span className="text-white font-semibold">WhatsApp:</span>{' '}
                  +92 317 4347343
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 text-center text-white/50 text-sm">
          © 2025 WearNick — Custom Street Fashion
        </div>
      </footer>
    </div>
  )
}
