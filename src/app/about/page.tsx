import Image from 'next/image'
import Link from 'next/link'

const TEAM_MEMBERS = [
  { name: 'Almukhzam Zulfiqar', role: 'Head of Design', image: '/team/team-1.jpeg' },
  { name: 'M. Omar Shabbir', role: 'Lead Developer', image: '/team/team-3.jpeg' },
  { name: 'Ali Sikandar', role: 'Product Manager', image: '/team/team-4.jpeg' },
  { name: 'Ateeb Ali Khan Afridi', role: 'Marketing Director', image: '/team/team-5.jpeg' },
  { name: 'Ammar Nasrullah', role: 'Operations Manager', image: '/team/team-6.jpeg' },
  { name: 'Hafiz Abdullah', role: 'Customer Success Lead', image: '/team/team-7.jpeg' },
  { name: 'Nehal Ahmad', role: 'Creative Director', image: '/team/team-8.jpeg' },
]

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
              graffiti-inspired designs so your hoodie, sweatshirt, or T-shirt feels personal,
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
                  Hoodies • Sweatshirts • T-Shirts  designed to be worn, layered, and repeated.
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

          {/* Founder Message */}
          <div className="mt-10 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden flex-shrink-0 border-4 border-white/30 shadow-2xl">
                <Image
                  src="/team/ceo.jpeg"
                  alt="Umar Mumtaz - CEO & Founder"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-extrabold">Message from the Founder</h3>
                <p className="text-white/50 mt-1 font-semibold">Umar Mumtaz — CEO & Founder</p>
                
                <p className="text-white/80 mt-5 text-lg leading-relaxed">
                  "I started WearNick with a simple vision: to bring customized streetwear to everyone who wants their style to stand out. The streets have always been about expression, authenticity, and making a statement. With WearNick, you're not just buying clothes you're creating your own identity, one design at a time. We're here to give you the tools to wear what represents you."
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-10">
            <h3 className="text-3xl font-extrabold text-center mb-8">Meet Our Team</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition text-center"
                >
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-white/30">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mt-4 font-bold text-lg">{member.name}</h4>
                  <p className="text-white/60 text-sm mt-1">{member.role}</p>
                </div>
              ))}
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
              <h3 className="text-2xl font-extrabold">For the cause</h3>
              <p className="text-white/70 mt-4">
                Keep Art Alive.
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