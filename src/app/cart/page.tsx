'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Trash2, Minus, Plus } from 'lucide-react'

type CartItem = {
  id: string
  gender: string
  product: 'Hoodie' | 'Sweatshirt' | 'T-Shirt'
  size: string
  designId: string
  designTitle: string
  designSrc: string
  qty: number
  addedAt: number
}

const CART_KEY = 'wearnick_cart'

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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  // Same design behavior as HomePage
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setItems(readCart())
    setLoaded(true)
  }, [])

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

  const totalItems = useMemo(() => items.reduce((sum, x) => sum + x.qty, 0), [items])

  function updateQty(id: string, nextQty: number) {
    const qty = Math.max(1, nextQty)
    const next = items.map((x) => (x.id === id ? { ...x, qty } : x))
    setItems(next)
    writeCart(next)
  }

  function removeItem(id: string) {
    const next = items.filter((x) => x.id !== id)
    setItems(next)
    writeCart(next)
  }

  function clearCart() {
    const next: CartItem[] = []
    setItems(next)
    writeCart(next)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f0] relative overflow-hidden">
      {/* Animated spotlight following mouse */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.03] blur-[100px] transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255,51,51,0.4) 0%, transparent 70%)',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          zIndex: 1,
        }}
      />

      {/* Concrete wall texture background */}
      <div
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Graffiti texture overlay with parallax */}
      <div
        className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-[0.08] -z-10 mix-blend-multiply transition-transform duration-75"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Floating spray paint dots */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[#ff3333] rounded-full opacity-30 animate-pulse" />
      <div
        className="absolute top-40 right-20 w-3 h-3 bg-[#f5f5f0] rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-[#ff3333] rounded-full opacity-25 animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      {/* Header - same as HomePage */}
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
            style={{
              filter: 'contrast(1.2) brightness(1.1) drop-shadow(0 0 20px rgba(255,51,51,0.3))',
            }}
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
            <Link href="/" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/products"
              className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/customize"
              className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group"
            >
              Customize
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/cart" className="text-[#f5f5f0] hover:text-[#ff3333] transition-all duration-300 relative group">
              Cart
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ff3333] transition-all duration-300 shadow-[0_0_8px_rgba(255,51,51,0.8)]"></span>
              <span className="absolute inset-0 bg-[#ff3333] opacity-10 blur-xl transition-opacity duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-16 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff3333]/10 border border-[#ff3333]/30 mb-6"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                <ShoppingBag size={16} className="text-[#ff3333]" />
                <span className="text-[#ff3333] font-bold text-xs uppercase tracking-widest">Your Bag</span>
              </div>

              <h1
                className="text-5xl md:text-6xl font-black uppercase tracking-tight"
                style={{
                  textShadow: '4px 4px 0 rgba(0,0,0,0.4), -1px -1px 0 rgba(255,255,255,0.08)',
                  letterSpacing: '-0.02em',
                }}
              >
                Cart
              </h1>

              <p className="text-[#b0b0a8] mt-3 font-medium">
                {loaded ? `${totalItems} item(s) in your cart` : 'Loading...'}
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/products"
                className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
              >
                Continue Shopping
              </Link>

              <Link
                href="/customize"
                className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                Customize More
              </Link>

              <Link
                href="/checkout"
                className={`px-7 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-xs tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300 relative ${
                  loaded && items.length === 0 ? 'pointer-events-none opacity-50' : ''
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)',
                  boxShadow:
                    '4px 4px 0 rgba(0,0,0,0.3), 0 0 20px rgba(255,51,51,0.2), inset -2px -2px 0 rgba(0,0,0,0.1)',
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

          <div className="mt-10">
            {loaded && items.length === 0 ? (
              <div
                className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-10 text-center"
                style={{
                  boxShadow: '8px 8px 0 rgba(0,0,0,0.4)',
                  clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
                }}
              >
                <p className="text-[#d0d0c8] text-lg font-semibold">Your cart is empty.</p>
                <Link
                  href="/products"
                  className="inline-flex mt-6 px-7 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-xs tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)' }}
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((x) => (
                  <div
                    key={x.id}
                    className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-5 md:p-6 relative hover:border-[#ff3333] hover:shadow-[0_0_40px_rgba(255,51,51,0.15)] transition-all duration-500"
                    style={{
                      boxShadow: '10px 10px 0 rgba(0,0,0,0.4)',
                      clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-5 md:items-center">
                      <div className="relative w-28 h-28 shrink-0 border border-[#2a2a2a] bg-[#1a1a1a] overflow-hidden">
                        <Image src={x.designSrc} alt={x.designTitle} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-xl font-black uppercase tracking-wide text-[#f5f5f0]">{x.product}</h3>
                          <span className="text-[#8a8a80]">•</span>
                          <span className="text-[#d0d0c8] font-semibold">{x.gender}</span>
                          <span className="text-[#8a8a80]">•</span>
                          <span className="text-[#d0d0c8] font-semibold">Size {x.size}</span>
                        </div>

                        <p className="text-[#b0b0a8] mt-2">
                          <span className="font-bold text-[#f5f5f0]">Design:</span> {x.designTitle}{' '}
                          <span className="text-[#8a8a80]">({x.designId})</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => updateQty(x.id, x.qty - 1)}
                          className="w-11 h-11 border-2 border-[#3a3a3a] bg-[#0a0a0a] hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300 flex items-center justify-center"
                          style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>

                        <div className="min-w-10 text-center font-black text-[#f5f5f0]">{x.qty}</div>

                        <button
                          onClick={() => updateQty(x.id, x.qty + 1)}
                          className="w-11 h-11 border-2 border-[#3a3a3a] bg-[#0a0a0a] hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300 flex items-center justify-center"
                          style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>

                        <button
                          onClick={() => removeItem(x.id)}
                          className="ml-1 px-5 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300 inline-flex items-center gap-2"
                          style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#ff3333] opacity-10" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#ff3333] opacity-10" />
                  </div>
                ))}

                <div className="flex items-center justify-between flex-wrap gap-4 pt-6">
                  <div className="text-[#b0b0a8] font-medium uppercase tracking-wide text-sm">
                    Total items: <span className="text-[#f5f5f0] font-black">{totalItems}</span>
                  </div>

                  <button
                    onClick={clearCart}
                    className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.25)] transition-all duration-300"
                    style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
                    disabled={loaded && items.length === 0}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
