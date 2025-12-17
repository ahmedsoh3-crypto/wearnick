'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SprayCan, Users, ArrowRight } from 'lucide-react'

const TEAM_MEMBERS = [
  { name: 'Almukhzam Zulfiqar', role: 'Head of Design', image: '/team/team-1.jpeg' },
  { name: 'M. Omar Shabbir', role: 'Lead Developer', image: '/team/team-3.jpeg' },
  { name: 'Ali Sikandar', role: 'Product Manager', image: '/team/team-4.jpeg' },
  { name: 'Ateeb Ali Khan Afridi', role: 'Marketing Director', image: '/team/team-5.jpeg' },
  { name: 'Ammar Nasrullah', role: 'Head of Security', image: '/team/team-6.jpeg' },
  { name: 'Hafiz Abdullah', role: 'Customer Success Lead', image: '/team/team-7.jpeg' },
  { name: 'Nehal Ahmad', role: 'Creative Director', image: '/team/team-8.jpeg' },
]

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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
            <Link
              href="/cart"
              className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group"
            >
              Cart
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-[#f5f5f0] hover:text-[#ff3333] transition-all duration-300 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ff3333] transition-all duration-300 shadow-[0_0_8px_rgba(255,51,51,0.8)]"></span>
              <span className="absolute inset-0 bg-[#ff3333] opacity-10 blur-xl transition-opacity duration-300"></span>
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

      <main className="pt-32 pb-16 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Page badge + title */}
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff3333]/10 border border-[#ff3333]/30 mb-6"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                <SprayCan size={16} className="text-[#ff3333]" />
                <span className="text-[#ff3333] font-bold text-xs uppercase tracking-widest">
                  About WearNick
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl font-black uppercase tracking-tight"
                style={{
                  textShadow: '4px 4px 0 rgba(0,0,0,0.4), -1px -1px 0 rgba(255,255,255,0.08)',
                  letterSpacing: '-0.02em',
                }}
              >
                Our Story
              </h1>

              <p className="text-[#b0b0a8] mt-3 font-medium max-w-2xl">
                Streetwear meets custom identity — built for people who want clothing that speaks louder.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/products"
                className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
              >
                Browse
              </Link>

              <Link
                href="/customize"
                className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                Customize
              </Link>
            </div>
          </div>

          {/* Hero */}
          <div
            className="mt-10 bg-[#0a0a0a] border-2 border-[#2a2a2a] p-8 md:p-12"
            style={{
              boxShadow: '10px 10px 0 rgba(0,0,0,0.4)',
              clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
            }}
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
              Streetwear meets custom identity.
            </h2>
            <p className="text-[#b0b0a8] mt-5 text-lg leading-relaxed">
              WearNick is a custom apparel platform built for people who want their clothing to speak louder.
              We combine a clean black-and-white street aesthetic with graffiti-inspired designs so your hoodie,
              sweatshirt, or T-shirt feels personal, bold, and built for everyday wear.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {[
                {
                  title: 'Our Mission',
                  body: 'Make custom streetwear simple: pick your fit, choose a design, and wear it.',
                },
                {
                  title: 'Our Style',
                  body: 'Minimal black & white, graffiti textures, sharp typography, and clean UI.',
                },
                {
                  title: 'Our Products',
                  body: 'Hoodies • Sweatshirts • T-Shirts designed to be worn, layered, and repeated.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-[#0f0f0f] border-2 border-[#2a2a2a] p-6 hover:border-[#ff3333] transition-all duration-500"
                  style={{
                    clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)',
                    boxShadow: '6px 6px 0 rgba(0,0,0,0.35)',
                  }}
                >
                  <h3 className="text-xl font-black uppercase tracking-wide">{card.title}</h3>
                  <p className="text-[#b0b0a8] mt-3">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-4 flex-wrap">
              <Link
                href="/products"
                className="px-7 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-xs tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300 inline-flex items-center gap-2"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                }}
              >
                Browse Products <ArrowRight size={16} />
              </Link>

              <Link
                href="/customize"
                className="px-7 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                Start Customizing
              </Link>
            </div>
          </div>

          {/* Founder Message */}
          <div
            className="mt-10 bg-[#0a0a0a] border-2 border-[#2a2a2a] p-8 md:p-12"
            style={{
              boxShadow: '10px 10px 0 rgba(0,0,0,0.4)',
              clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div
                className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden flex-shrink-0 border-2 border-[#2a2a2a]"
                style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.35)' }}
              >
                <Image src="/team/ceo.jpeg" alt="Umar Mumtaz - CEO & Founder" fill className="object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide">Message from the Founder</h3>
                <p className="text-[#b0b0a8] mt-2 font-semibold uppercase tracking-wide text-sm">
                  Umar Mumtaz — CEO & Founder
                </p>

                <p className="text-[#d0d0c8] mt-5 text-lg leading-relaxed">
                  “I started WearNick with a simple vision: to bring customized streetwear to everyone who wants their
                  style to stand out. The streets have always been about expression, authenticity, and making a
                  statement. With WearNick, you&apos;re not just buying clothes — you&apos;re creating your own identity,
                  one design at a time. We&apos;re here to give you the tools to wear what represents you.”
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-12">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Users size={18} className="text-[#ff3333]" />
              <h3 className="text-3xl font-black uppercase tracking-wide text-center">Meet Our Team</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-5 text-center hover:border-[#ff3333] hover:shadow-[0_0_30px_rgba(255,51,51,0.12)] transition-all duration-500"
                  style={{
                    clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
                    boxShadow: '8px 8px 0 rgba(0,0,0,0.35)',
                  }}
                >
                  <div className="relative w-24 h-24 mx-auto overflow-hidden border-2 border-[#2a2a2a]">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  <h4 className="mt-4 font-black uppercase tracking-wide text-sm md:text-base">{member.name}</h4>
                  <p className="text-[#b0b0a8] text-xs md:text-sm mt-2 font-semibold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div
              className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-8"
              style={{
                boxShadow: '10px 10px 0 rgba(0,0,0,0.4)',
                clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
              }}
            >
              <h3 className="text-2xl font-black uppercase tracking-wide">Why WearNick?</h3>
              <ul className="mt-5 space-y-3 text-[#b0b0a8] font-medium">
                <li>• Fast design selection and customization flow</li>
                <li>• Graffiti design gallery with strong street vibe</li>
                <li>• Clean layout, mobile-first UI</li>
                <li>• Simple cart + demo checkout for presentation</li>
              </ul>
            </div>

            <div
              className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-8"
              style={{
                boxShadow: '10px 10px 0 rgba(0,0,0,0.4)',
                clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
              }}
            >
              <h3 className="text-2xl font-black uppercase tracking-wide">For the cause</h3>
              <p className="text-[#b0b0a8] mt-5 font-medium">Keep Art Alive.</p>
              <p className="text-[#8a8a80] mt-3 text-sm"></p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-14 border-t-2 border-[#2a2a2a] py-10 text-center">
            <p className="text-[#8a8a80] font-semibold uppercase tracking-widest text-xs">
              © 2025 WearNick — Custom Street Fashion
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
