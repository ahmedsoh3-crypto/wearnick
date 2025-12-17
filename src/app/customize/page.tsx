'use client'

export const dynamic = 'force-dynamic'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Sparkles } from 'lucide-react'

const MEN_DESIGNS = [
  { id: '101', src: '/designs/design-1.jpeg', title: 'HUMBLE' },
  { id: '102', src: '/designs/design-2.jpeg', title: 'Respect' },
  { id: '103', src: '/designs/design-3.jpeg', title: 'Wildflower Spirit' },
  { id: '104', src: '/designs/design-4.jpeg', title: 'Imperfection' },
  { id: '105', src: '/designs/design-5.jpeg', title: 'Soul 07' },
  { id: '106', src: '/designs/design-6.jpeg', title: 'Realistic' },
  { id: '107', src: '/designs/design-7.jpeg', title: 'Take It Easy' },
  { id: '108', src: '/designs/design-8.jpeg', title: 'Money' },
  { id: '109', src: '/designs/design-9.jpeg', title: 'Dreams' },
  { id: '1010', src: '/designs/design-10.jpeg', title: 'Positive' },
]

const WOMEN_DESIGNS = [
  { id: '201', src: '/designs/design-11.jpeg', title: 'Grace' },
  { id: '202', src: '/designs/design-12.jpeg', title: 'Elegance' },
  { id: '203', src: '/designs/design-13.jpeg', title: 'Fierce' },
  { id: '204', src: '/designs/design-14.jpeg', title: 'Bloom' },
  { id: '205', src: '/designs/design-15.jpeg', title: 'Radiant' },
  { id: '206', src: '/designs/design-16.jpeg', title: 'Empowered' },
  { id: '207', src: '/designs/design-17.jpeg', title: 'Bold' },
  { id: '208', src: '/designs/design-18.jpeg', title: 'Serene' },
  { id: '209', src: '/designs/design-19.jpeg', title: 'Vibrant' },
  { id: '2010', src: '/designs/design-20.jpeg', title: 'Shine' },
]

const UNISEX_DESIGNS = [...MEN_DESIGNS, ...WOMEN_DESIGNS]

type ProductLabel = 'Hoodie' | 'Sweatshirt' | 'T-Shirt'
type CartItem = {
  id: string
  gender: string
  product: ProductLabel
  size: string
  designId: string
  designTitle: string
  designSrc: string
  qty: number
  addedAt: number
}

const CART_KEY = 'wearnick_cart'

function normalizeProduct(param: string | null): ProductLabel | null {
  if (!param) return null
  const p = param.toLowerCase()
  if (p.includes('hood')) return 'Hoodie'
  if (p.includes('sweat')) return 'Sweatshirt'
  if (p.includes('shirt')) return 'T-Shirt'
  return null
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

function CustomizeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const [gender, setGender] = useState<string | null>(null)
  const [product, setProduct] = useState<ProductLabel | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [designId, setDesignId] = useState<string | null>(null)

  const [toast, setToast] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const p = normalizeProduct(searchParams.get('product'))
    if (p) {
      setProduct(p)
      setSize(null)
      setDesignId(null)
      setToast(null)
    }
  }, [searchParams])

  const canPickProduct = !!gender
  const canPickSize = !!product
  const canPickDesign = !!size
  const canAdd = !!(gender && product && size && designId)

  const availableDesigns =
    gender === 'Men' ? MEN_DESIGNS : gender === 'Women' ? WOMEN_DESIGNS : gender === 'Unisex' ? UNISEX_DESIGNS : []

  function resetFrom(step: 'gender' | 'product' | 'size') {
    if (step === 'gender') {
      setProduct(null)
      setSize(null)
      setDesignId(null)
    }
    if (step === 'product') {
      setSize(null)
      setDesignId(null)
    }
    if (step === 'size') {
      setDesignId(null)
    }
    setToast(null)
  }

  function handleAddToCart() {
    if (!canAdd || adding) return
    setAdding(true)

    const design = availableDesigns.find((d) => d.id === designId)
    if (!design) {
      setToast('Design not found. Check /public/designs/')
      setAdding(false)
      return
    }

    const cart = readCart()
    const existingIndex = cart.findIndex(
      (x) => x.gender === gender && x.product === product && x.size === size && x.designId === designId
    )

    if (existingIndex >= 0) {
      cart[existingIndex] = { ...cart[existingIndex], qty: cart[existingIndex].qty + 1 }
    } else {
      cart.unshift({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        gender: gender!,
        product: product!,
        size: size!,
        designId: designId!,
        designTitle: design.title,
        designSrc: design.src,
        qty: 1,
        addedAt: Date.now(),
      })
    }

    writeCart(cart)
    setToast('✅ Added to cart!')
    setAdding(false)
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f0] relative overflow-hidden">
      {/* spotlight */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.03] blur-[100px] transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255,51,51,0.4) 0%, transparent 70%)',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          zIndex: 1,
        }}
      />

      {/* concrete grid */}
      <div
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* graffiti parallax */}
      <div
        className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-[0.08] -z-10 mix-blend-multiply transition-transform duration-75"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Header (same style as homepage) */}
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
            <Link href="/products" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300">
              Products
            </Link>
            <Link href="/customize" className="text-[#f5f5f0] hover:text-[#ff3333] transition-all duration-300">
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

      {/* Content */}
      <main className="pt-28 pb-10 px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff3333]/10 border border-[#ff3333]/30 mb-5"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                <Sparkles size={16} className="text-[#ff3333]" />
                <span className="text-[#ff3333] font-black text-xs uppercase tracking-widest">Customizer</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                Customize
              </h1>
              <p className="text-[#b0b0a8] mt-2 font-medium">
                Gender → Product → Size → Design → Add to Cart
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/products"
                className="px-6 py-3 bg-[#2a2a2a] border border-[#3a3a3a] hover:bg-[#3a3a3a] transition-all duration-300 font-semibold uppercase text-sm tracking-wide"
              >
                Back to Products
              </Link>
              <Link
                href="/cart"
                className="px-6 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-sm tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)' }}
              >
                View Cart
              </Link>
            </div>
          </div>

          {/* STEP 1 */}
          <Card className="bg-[#0a0a0a] border-2 border-[#2a2a2a]" style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.4)' }}>
            <CardHeader>
              <CardTitle className="font-black uppercase tracking-wide">1. Choose Gender</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3 flex-wrap">
              {['Men', 'Women', 'Unisex'].map((g) => (
                <Button
                  key={g}
                  variant={gender === g ? 'default' : 'outline'}
                  onClick={() => {
                    setGender(g)
                    resetFrom('gender')
                  }}
                  className={
                    gender === g
                      ? 'bg-[#f5f5f0] text-[#0a0a0a] hover:bg-[#ff3333] hover:text-[#f5f5f0] font-black uppercase'
                      : 'border-[#3a3a3a] text-[#f5f5f0] hover:border-[#ff3333] hover:text-[#ff3333] font-bold uppercase bg-transparent'
                  }
                >
                  {g}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* STEP 2 */}
          <Card
            className={`bg-[#0a0a0a] border-2 border-[#2a2a2a] ${!canPickProduct ? 'opacity-60' : ''}`}
            style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.4)' }}
          >
            <CardHeader>
              <CardTitle className="font-black uppercase tracking-wide">2. Choose Product</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3 flex-wrap">
              {(['Hoodie', 'Sweatshirt', 'T-Shirt'] as ProductLabel[]).map((p) => (
                <Button
                  key={p}
                  disabled={!canPickProduct}
                  variant={product === p ? 'default' : 'outline'}
                  onClick={() => {
                    setProduct(p)
                    resetFrom('product')
                  }}
                  className={
                    product === p
                      ? 'bg-[#f5f5f0] text-[#0a0a0a] hover:bg-[#ff3333] hover:text-[#f5f5f0] font-black uppercase'
                      : 'border-[#3a3a3a] text-[#f5f5f0] hover:border-[#ff3333] hover:text-[#ff3333] font-bold uppercase bg-transparent'
                  }
                >
                  {p}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* STEP 3 */}
          <Card
            className={`bg-[#0a0a0a] border-2 border-[#2a2a2a] ${!canPickSize ? 'opacity-60' : ''}`}
            style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.4)' }}
          >
            <CardHeader>
              <CardTitle className="font-black uppercase tracking-wide">3. Choose Size</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3 flex-wrap">
              {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                <Button
                  key={s}
                  disabled={!canPickSize}
                  variant={size === s ? 'default' : 'outline'}
                  onClick={() => {
                    setSize(s)
                    resetFrom('size')
                  }}
                  className={
                    size === s
                      ? 'bg-[#f5f5f0] text-[#0a0a0a] hover:bg-[#ff3333] hover:text-[#f5f5f0] font-black uppercase'
                      : 'border-[#3a3a3a] text-[#f5f5f0] hover:border-[#ff3333] hover:text-[#ff3333] font-bold uppercase bg-transparent'
                  }
                >
                  {s}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* STEP 4 */}
          <Card
            className={`bg-[#0a0a0a] border-2 border-[#2a2a2a] ${!canPickDesign ? 'opacity-60' : ''}`}
            style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.4)' }}
          >
            <CardHeader>
              <CardTitle className="font-black uppercase tracking-wide">4. Choose Design</CardTitle>
            </CardHeader>
            <CardContent>
              {!canPickDesign ? (
                <p className="text-[#b0b0a8]">Select gender, product and size first.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {availableDesigns.map((d) => {
                    const selected = designId === d.id
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDesignId(d.id)}
                        className={`relative overflow-hidden border transition group
                          ${selected ? 'border-[#ff3333] ring-2 ring-[#ff3333]' : 'border-[#2a2a2a] hover:border-[#ff3333]'}`}
                        style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.35)', clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)' }}
                      >
                        <div className="relative aspect-square bg-black">
                          <Image src={d.src} alt={d.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-black/75 px-2 py-1">
                          <p className="text-xs font-black uppercase tracking-wide text-center truncate">
                            {d.title}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action bar */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-[#b0b0a8] font-medium">
              {toast ? <span className="text-[#f5f5f0] font-black">{toast}</span> : null}
              {!toast ? <span>{canAdd ? 'Ready to add to cart.' : 'Complete all steps to add to cart.'}</span> : null}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!canAdd || adding}
              className="bg-[#f5f5f0] text-[#0a0a0a] hover:bg-[#ff3333] hover:text-[#f5f5f0] disabled:opacity-50 font-black uppercase tracking-wide"
              style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)' }}
            >
              <ShoppingBag className="mr-2" size={18} />
              {adding ? 'Adding...' : 'Add to Cart'}
            </Button>
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

export default function CustomizePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f0] flex items-center justify-center">
          <div className="animate-pulse text-xl font-black uppercase tracking-wide">Loading customization...</div>
        </div>
      }
    >
      <CustomizeContent />
    </Suspense>
  )
}
