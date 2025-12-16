'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const DESIGNS = [
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

export default function CustomizePage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [gender, setGender] = useState<string | null>(null)
  const [product, setProduct] = useState<ProductLabel | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [designId, setDesignId] = useState<string | null>(null)

  const [toast, setToast] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

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

    const design = DESIGNS.find((d) => d.id === designId)
    if (!design) {
      setToast('Design not found. Check your designs folder.')
      setAdding(false)
      return
    }

    const cart = readCart()

    // If same selection exists, increase qty
    const existingIndex = cart.findIndex(
      (x) =>
        x.gender === gender &&
        x.product === product &&
        x.size === size &&
        x.designId === designId
    )

    if (existingIndex >= 0) {
      cart[existingIndex] = { ...cart[existingIndex], qty: cart[existingIndex].qty + 1 }
    } else {
      const item: CartItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        gender: gender!,
        product: product!,
        size: size!,
        designId: designId!,
        designTitle: design.title,
        designSrc: design.src,
        qty: 1,
        addedAt: Date.now(),
      }
      cart.unshift(item)
    }

    writeCart(cart)
    setToast('✅ Added to cart!')
    setAdding(false)

    // Optional: auto go to cart
    router.push('/cart')
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-20 -z-10" />

      <section className="pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-extrabold">Customize</h1>
              <p className="text-white/70 mt-2">
                Gender → Product → Size → Design → Add to Cart
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/products"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                Back to Products
              </Link>
              <Link
                href="/cart"
                className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                View Cart
              </Link>
            </div>
          </div>

          {/* STEP 1 */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>1. Choose Gender</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 flex-wrap">
              {['Men', 'Women', 'Unisex'].map((g) => (
                <Button
                  key={g}
                  variant={gender === g ? 'default' : 'outline'}
                  onClick={() => {
                    setGender(g)
                    resetFrom('gender')
                  }}
                >
                  {g}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* STEP 2 */}
          <Card className={`bg-white/5 border-white/10 ${!canPickProduct ? 'opacity-60' : ''}`}>
            <CardHeader>
              <CardTitle>2. Choose Product</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 flex-wrap">
              {(['Hoodie', 'Sweatshirt', 'T-Shirt'] as ProductLabel[]).map((p) => (
                <Button
                  key={p}
                  disabled={!canPickProduct}
                  variant={product === p ? 'default' : 'outline'}
                  onClick={() => {
                    setProduct(p)
                    resetFrom('product')
                  }}
                >
                  {p}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* STEP 3 */}
          <Card className={`bg-white/5 border-white/10 ${!canPickSize ? 'opacity-60' : ''}`}>
            <CardHeader>
              <CardTitle>3. Choose Size</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 flex-wrap">
              {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                <Button
                  key={s}
                  disabled={!canPickSize}
                  variant={size === s ? 'default' : 'outline'}
                  onClick={() => {
                    setSize(s)
                    resetFrom('size')
                  }}
                >
                  {s}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* STEP 4 */}
          <Card className={`bg-white/5 border-white/10 ${!canPickDesign ? 'opacity-60' : ''}`}>
            <CardHeader>
              <CardTitle>4. Choose Design</CardTitle>
            </CardHeader>
            <CardContent>
              {!canPickDesign ? (
                <p className="text-white/70">Select gender, product and size first.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {DESIGNS.map((d) => {
                    const selected = designId === d.id
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDesignId(d.id)}
                        className={`relative rounded-xl overflow-hidden border transition
                          ${selected ? 'border-white ring-2 ring-white' : 'border-white/20 hover:border-white'}`}
                      >
                        <div className="relative aspect-square bg-black">
                          <Image src={d.src} alt={d.title} fill className="object-cover" />
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-black/70 px-2 py-1">
                          <p className="text-xs font-semibold text-center truncate">{d.title}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* ACTION BAR */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-white/70">
              {toast ? <span className="text-white font-semibold">{toast}</span> : null}
              {!toast ? (
                <span>
                  {canAdd ? 'Ready to add to cart.' : 'Complete all steps to add to cart.'}
                </span>
              ) : null}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!canAdd || adding}
              className="bg-white text-black hover:opacity-90 disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
