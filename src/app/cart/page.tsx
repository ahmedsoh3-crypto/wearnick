'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

  useEffect(() => {
    setItems(readCart())
    setLoaded(true)
  }, [])

  const totalItems = useMemo(
    () => items.reduce((sum, x) => sum + x.qty, 0),
    [items]
  )

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
    <main className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-20 -z-10" />

      <section className="pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-extrabold">Cart</h1>
              <p className="text-white/70 mt-2">
                {loaded ? `${totalItems} item(s) in your cart` : 'Loading...'}
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/products"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                Continue Shopping
              </Link>
              <Link
                href="/customize"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                Customize More
              </Link>

              {/* ✅ Checkout button */}
              <Link
                href="/checkout"
                className={`px-5 py-2 rounded-full bg-white text-black font-semibold hover:opacity-90 transition ${
                  loaded && items.length === 0 ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

          <div className="mt-10">
            {loaded && items.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                <p className="text-white/80 text-lg">Your cart is empty.</p>
                <Link
                  href="/products"
                  className="inline-block mt-6 px-6 py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((x) => (
                  <div
                    key={x.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:items-center"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 bg-black">
                      <Image
                        src={x.designSrc}
                        alt={x.designTitle}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-xl font-bold">{x.product}</h3>
                        <span className="text-white/60">•</span>
                        <span className="text-white/80">{x.gender}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/80">Size {x.size}</span>
                      </div>
                      <p className="text-white/70 mt-1">
                        Design:{' '}
                        <span className="text-white">{x.designTitle}</span> ({x.designId})
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => updateQty(x.id, x.qty - 1)}
                        className="w-10 h-10 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <div className="min-w-10 text-center font-bold">{x.qty}</div>

                      <button
                        onClick={() => updateQty(x.id, x.qty + 1)}
                        className="w-10 h-10 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(x.id)}
                        className="ml-2 px-4 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between flex-wrap gap-4 pt-6">
                  <div className="text-white/70">
                    Total items:{' '}
                    <span className="text-white font-bold">{totalItems}</span>
                  </div>

                  <button
                    onClick={clearCart}
                    className="px-6 py-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
