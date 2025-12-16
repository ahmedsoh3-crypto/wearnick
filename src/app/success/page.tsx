import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-20 -z-10" />

      <section className="pt-28 pb-12 px-6">
        <div className="max-w-lg mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-10">
          <h1 className="text-4xl font-extrabold mb-4">
            Payment Successful 🎉
          </h1>
          <p className="text-white/70 mb-8">
            Your order has been placed successfully.
            <br />
            <span className="text-xs">(congrats!!)</span>
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
            >
              Shop More
            </Link>

            <Link
              href="/customize"
              className="px-6 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
            >
              Customize Again
            </Link>

            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
            >
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
