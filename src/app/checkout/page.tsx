'use client'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'


import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function CheckoutPage() {
  const router = useRouter()
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    setItems(readCart())
    setLoaded(true)
  }, [])

  const totalItems = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items])

  function fakePay(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return

    // simple “required” validation
    if (!cardNumber.trim() || !expiry.trim() || !cvv.trim() || !name.trim()) return

    setLoading(true)

    // Fake processing delay (demo)
    setTimeout(() => {
      localStorage.removeItem(CART_KEY)
      router.push('/success')
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-20 -z-10" />

      <section className="pt-28 pb-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Left: Order Summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h1 className="text-3xl font-extrabold">Checkout</h1>
            <p className="text-white/70 mt-2">
              
            </p>

            <div className="mt-6 border-t border-white/10 pt-6">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <p className="text-white/70 mt-2">
                {loaded ? `${totalItems} item(s)` : 'Loading...'}
              </p>

              {loaded && items.length === 0 ? (
                <div className="mt-6">
                  <p className="text-white/80">Your cart is empty.</p>
                  <Link
                    href="/products"
                    className="inline-block mt-4 px-6 py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <ul className="mt-4 space-y-3">
                  {items.slice(0, 5).map((x) => (
                    <li key={x.id} className="flex items-center justify-between gap-3">
                      <div className="text-white/80">
                        <div className="font-semibold">
                          {x.product} × {x.qty}
                        </div>
                        <div className="text-sm text-white/60">
                          {x.gender} • Size {x.size} • {x.designTitle}
                        </div>
                      </div>
                    </li>
                  ))}
                  {items.length > 5 ? (
                    <li className="text-sm text-white/60">
                      +{items.length - 5} more item(s)
                    </li>
                  ) : null}
                </ul>
              )}
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
              <Link
                href="/cart"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                Back to Cart
              </Link>
              <Link
                href="/customize"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                Customize More
              </Link>
            </div>
          </div>

          {/* Right: Payment Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-extrabold">Card Payment</h2>
            <p className="text-white/70 mt-2">
              Enter your details and click Pay.
            </p>

            <form onSubmit={fakePay} className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-white/70">Card Number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full mt-1 px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-white"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-white/70">Expiry</label>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full mt-1 px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-white"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm text-white/70">CVV</label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full mt-1 px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-white/70">Cardholder Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full mt-1 px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || (loaded && items.length === 0)}
                className="w-full mt-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>

              <p className="text-xs text-white/60 text-center pt-2">
                Secure Payment @MAS.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
