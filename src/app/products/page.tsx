import Link from 'next/link'

type ProductType = 'hoodies' | 'sweatshirts' | 'shirts'

const products = [
  {
    key: 'hoodies' as const,
    title: 'Hoodies',
    desc: 'Oversized, cozy, street-ready.',
  },
  {
    key: 'sweatshirts' as const,
    title: 'Sweatshirts',
    desc: 'Clean fit with heavy comfort.',
  },
  {
    key: 'shirts' as const,
    title: 'T-Shirts',
    desc: 'Bold prints & premium fabric.',
  },
]

// function normalizeType(input: unknown): ProductType | '' {
  if (!input) return ''
  const val = Array.isArray(input) ? input[0] : input
  if (typeof val !== 'string') return ''
  const t = val.toLowerCase().trim()
  if (t === 'hoodies') return 'hoodies'
  if (t === 'sweatshirts') return 'sweatshirts'
  if (t === 'shirts') return 'shirts'
  return ''
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string | string[] }>
}) {
  const sp = searchParams ? await searchParams : {}
  const type = normalizeType(sp?.type)

  const filtered = type ? products.filter((p) => p.key === type) : products

  return (
    <main className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-20 -z-10" />

      <section className="pt-28 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold">Products</h1>
          <p className="text-white/70 mt-3">
            Browse WearNick essentials. Pick one, then customize your design.
          </p>

          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/products"
              className="px-5 py-2 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
            >
              All
            </Link>
            <Link
              href="/products?type=shirts"
              className="px-5 py-2 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
            >
              Shirts
            </Link>
            <Link
              href="/products?type=hoodies"
              className="px-5 py-2 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
            >
              Hoodies
            </Link>
            <Link
              href="/products?type=sweatshirts"
              className="px-5 py-2 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
            >
              Sweatshirts
            </Link>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p.key}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition"
              >
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <p className="text-white/70 mt-2">{p.desc}</p>

                <div className="mt-6 flex gap-3 flex-wrap">
                  <Link
                    href="/customize"
                    className="px-5 py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
                  >
                    Customize
                  </Link>

                  <Link
                    href={`/customize?product=${p.key}`}
                    className="px-5 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
                  >
                    Quick Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}