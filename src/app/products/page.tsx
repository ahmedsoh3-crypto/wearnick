import Link from 'next/link'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

type PageProps = {
  searchParams?: Promise<{ type?: string | string[] }>
}

type ProductType = 'hoodies' | 'sweatshirts' | 'shirts'

const products = [
  { key: 'hoodies' as const, title: 'Hoodies', desc: 'Oversized, cozy, street-ready.' },
  { key: 'sweatshirts' as const, title: 'Sweatshirts', desc: 'Clean fit with heavy comfort.' },
  { key: 'shirts' as const, title: 'T-Shirts', desc: 'Bold prints & premium fabric.' },
]

function normalizeType(input: unknown): ProductType | '' {
  if (!input) return ''
  const val = Array.isArray(input) ? input[0] : input
  if (typeof val !== 'string') return ''
  const t = val.toLowerCase().trim()
  if (t === 'hoodies') return 'hoodies'
  if (t === 'sweatshirts') return 'sweatshirts'
  if (t === 'shirts') return 'shirts'
  return ''
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = searchParams ? await searchParams : undefined
  const type = normalizeType(sp?.type)
  const filtered = type ? products.filter((p) => p.key === type) : products

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f0] relative overflow-hidden">
      {/* Concrete wall grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Graffiti overlay */}
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-[0.08] -z-10 mix-blend-multiply" />

      {/* Header (same vibe as homepage) */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b-2 border-[#2a2a2a]"
        style={{
          boxShadow:
            '0 4px 30px rgba(0,0,0,0.3), 0 2px 0 rgba(245,245,240,0.1), inset 0 -1px 0 rgba(0,0,0,0.5)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div
            className="relative w-44 h-12 shrink-0 group"
            style={{ filter: 'contrast(1.2) brightness(1.1) drop-shadow(0 0 20px rgba(255,51,51,0.3))' }}
          >
            <Image
              src="/wearnick-logo.jpeg"
              alt="WearNick Logo"
              fill
              className="object-contain transition-all duration-300 group-hover:scale-105"
              priority
            />
          </div>

          <nav className="flex items-center gap-5 flex-wrap justify-end text-sm md:text-base uppercase tracking-wider font-bold">
            <Link href="/" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300">
              Home
            </Link>
            <Link href="/products" className="text-[#f5f5f0] hover:text-[#ff3333] transition-all duration-300">
              Products
            </Link>
            <Link href="/customize" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300">
              Customize
            </Link>
            <Link href="/cart" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300">
              Cart
            </Link>
            <Link href="/checkout" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300">
              Checkout
            </Link>
            <Link href="/about" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300">
              About
            </Link>
            <Link href="/contact" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="pt-28 pb-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff3333]/10 border border-[#ff3333]/30 mb-6"
            style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
          >
            <Sparkles size={16} className="text-[#ff3333]" />
            <span className="text-[#ff3333] font-black text-xs uppercase tracking-widest">Catalog</span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-black uppercase tracking-tight"
            style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}
          >
            Products
          </h1>
          <p className="text-[#b0b0a8] mt-3 font-medium">
            Browse WearNick essentials. Pick one, then customize your design.
          </p>

          {/* Filters */}
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/products"
              className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-sm tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] transition-all duration-300"
              style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
            >
              All
            </Link>
            <Link
              href="/products?type=shirts"
              className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-sm tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] transition-all duration-300"
              style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
            >
              Shirts
            </Link>
            <Link
              href="/products?type=hoodies"
              className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-sm tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] transition-all duration-300"
              style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
            >
              Hoodies
            </Link>
            <Link
              href="/products?type=sweatshirts"
              className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-sm tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] transition-all duration-300"
              style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
            >
              Sweatshirts
            </Link>
          </div>

          {/* Cards */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p.key}
                className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-7 hover:border-[#ff3333] hover:shadow-[0_0_40px_rgba(255,51,51,0.18)] transition-all duration-500"
                style={{
                  boxShadow: '10px 10px 0 rgba(0,0,0,0.45)',
                  clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
                }}
              >
                <h3 className="text-2xl font-black uppercase tracking-wide">{p.title}</h3>
                <p className="text-[#b0b0a8] mt-2 font-medium">{p.desc}</p>

                <div className="mt-6 flex gap-3 flex-wrap">
                  <Link
                    href={`/customize?product=${p.key}`}
                    className="px-6 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-sm tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)' }}
                  >
                    Customize
                  </Link>

                  <Link
                    href={`/customize?product=${p.key}`}
                    className="px-6 py-3 border-2 border-[#3a3a3a] bg-transparent text-[#f5f5f0] font-bold uppercase text-sm tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] transition-all duration-300"
                    style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
                  >
                    Quick Start
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom helper */}
          <div className="mt-10 text-[#8a8a80] text-sm uppercase tracking-wider">
            Tip: Choose a product → click <span className="text-[#f5f5f0] font-black">Customize</span> → pick design → add to cart.
          </div>
        </div>
      </main>

      {/* Footer (same vibe as homepage) */}
      <footer
        className="border-t-2 border-[#2a2a2a] py-10 px-6 bg-[#0a0a0a] relative"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 -10px 30px rgba(0,0,0,0.3)',
        }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="relative w-44 h-12" style={{ filter: 'drop-shadow(0 0 14px rgba(255,51,51,0.2))' }}>
              <Image src="/wearnick-logo.jpeg" alt="WearNick Logo" fill className="object-contain" />
            </div>
            <p className="text-[#8a8a80] mt-4 leading-relaxed">
              Custom street fashion built for bold identity. Black, concrete, and graffiti energy — made wearable.
            </p>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-wide text-sm mb-4 text-[#f5f5f0]">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/products">
                Products
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/customize">
                Customize
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/cart">
                Cart
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/checkout">
                Checkout
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/about">
                About
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-wide text-sm mb-4 text-[#f5f5f0]">Socials & Contact</h4>

            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/officials_by_wearnick?igsh=MTMydXc3b3oyODF0MA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 border border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 border border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
              >
                Facebook
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 border border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 100% 2%, 100% 100%, 2% 98%)' }}
              >
                TikTok
              </a>

              <div className="mt-2 text-sm text-[#b0b0a8] space-y-1">
                <div>
                  <span className="text-[#f5f5f0] font-bold">Email:</span> officials@wearnick.com
                </div>
                <div>
                  <span className="text-[#f5f5f0] font-bold">WhatsApp:</span> +92 317 4347343
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#2a2a2a] text-center text-[#8a8a80] text-xs uppercase tracking-widest">
          © 2025 WearNick — Custom Street Fashion
        </div>
      </footer>
    </div>
  )
}
