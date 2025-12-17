'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, MessageSquare, Send, Instagram, Facebook, Music2 } from 'lucide-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  // Same design behavior as HomePage
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSent(true)
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
            <Link
              href="/cart"
              className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group"
            >
              Cart
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="text-[#f5f5f0] hover:text-[#ff3333] transition-all duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ff3333] transition-all duration-300 shadow-[0_0_8px_rgba(255,51,51,0.8)]"></span>
              <span className="absolute inset-0 bg-[#ff3333] opacity-10 blur-xl transition-opacity duration-300"></span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-16 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Page header */}
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff3333]/10 border border-[#ff3333]/30 mb-6"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                <MessageSquare size={16} className="text-[#ff3333]" />
                <span className="text-[#ff3333] font-bold text-xs uppercase tracking-widest">Contact</span>
              </div>

              <h1
                className="text-5xl md:text-6xl font-black uppercase tracking-tight"
                style={{
                  textShadow: '4px 4px 0 rgba(0,0,0,0.4), -1px -1px 0 rgba(255,255,255,0.08)',
                  letterSpacing: '-0.02em',
                }}
              >
                Let&apos;s talk
              </h1>

              <p className="text-[#b0b0a8] mt-3 font-medium max-w-2xl">
                Custom orders, bulk requests, collabs, or support — drop a message and we’ll get back to you.
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

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Contact Form */}
            <div
              className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-8"
              style={{
                boxShadow: '10px 10px 0 rgba(0,0,0,0.4)',
                clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
              }}
            >
              <h2 className="text-2xl font-black uppercase tracking-wide">Send us a message</h2>
              <p className="text-[#b0b0a8] mt-2 font-medium">For custom orders, bulk requests, or support.</p>

              {sent ? (
                <div
                  className="mt-6 bg-[#0f0f0f] border-2 border-[#2a2a2a] p-6"
                  style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
                >
                  <p className="text-[#f5f5f0] font-black uppercase tracking-wide">✅ Message sent!</p>
                  <p className="text-[#b0b0a8] mt-2 font-medium">
                    Thanks <span className="text-[#f5f5f0] font-black">{name}</span>. We’ll contact you soon.
                  </p>

                  <button
                    onClick={() => {
                      setSent(false)
                      setName('')
                      setEmail('')
                      setMessage('')
                    }}
                    className="mt-5 px-7 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-xs tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)',
                      boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                    }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-[#b0b0a8]">Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-2 px-4 py-3 bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:outline-none focus:border-[#ff3333] transition"
                      placeholder="Your name"
                      required
                      style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.25)' }}
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-[#b0b0a8]">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-full mt-2 px-4 py-3 bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:outline-none focus:border-[#ff3333] transition"
                      placeholder="you@email.com"
                      required
                      style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.25)' }}
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-[#b0b0a8]">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full mt-2 px-4 py-3 bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:outline-none focus:border-[#ff3333] transition min-h-[130px]"
                      placeholder="Tell us what you need..."
                      required
                      style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.25)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-7 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-xs tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300 inline-flex items-center justify-center gap-2"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)',
                      boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                    }}
                  >
                    <Send size={16} />
                    Submit
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info + Socials */}
            <div
              className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-8"
              style={{
                boxShadow: '10px 10px 0 rgba(0,0,0,0.4)',
                clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
              }}
            >
              <h2 className="text-2xl font-black uppercase tracking-wide">Reach Us</h2>
              <p className="text-[#b0b0a8] mt-2 font-medium">Connect with WearNick online or directly.</p>

              {/* Social Links */}
              <div className="mt-6 space-y-3">
                <a
                  href="https://www.instagram.com/officials_by_wearnick?igsh=MTMydXc3b3oyODF0MA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-6 py-4 border-2 border-[#2a2a2a] hover:border-[#ff3333] hover:shadow-[0_0_22px_rgba(255,51,51,0.18)] transition-all duration-300"
                  style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
                >
                  <div className="flex items-center gap-3 font-black uppercase tracking-wide">
                    <Instagram size={18} className="text-[#ff3333]" />
                    Instagram
                  </div>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-6 py-4 border-2 border-[#2a2a2a] hover:border-[#ff3333] hover:shadow-[0_0_22px_rgba(255,51,51,0.18)] transition-all duration-300"
                  style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
                >
                  <div className="flex items-center gap-3 font-black uppercase tracking-wide">
                    <Facebook size={18} className="text-[#ff3333]" />
                    Facebook
                  </div>
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-6 py-4 border-2 border-[#2a2a2a] hover:border-[#ff3333] hover:shadow-[0_0_22px_rgba(255,51,51,0.18)] transition-all duration-300"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}
                >
                  <div className="flex items-center gap-3 font-black uppercase tracking-wide">
                    <Music2 size={18} className="text-[#ff3333]" />
                    TikTok
                  </div>
                </a>
              </div>

              {/* Direct Contact */}
              <div className="mt-8 space-y-3 text-[#b0b0a8] font-medium">
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-[#ff3333]" />
                  <span className="text-[#f5f5f0] font-black uppercase tracking-wide text-xs">Email:</span>
                  <span className="ml-1">officials@wearnick.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#ff3333]" />
                  <span className="text-[#f5f5f0] font-black uppercase tracking-wide text-xs">WhatsApp:</span>
                  <span className="ml-1">+92 317 4347343</span>
                </p>
              </div>

              <div className="mt-8 flex gap-3 flex-wrap">
                <Link
                  href="/products"
                  className="px-7 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-xs tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                  }}
                >
                  Browse Products
                </Link>
                <Link
                  href="/customize"
                  className="px-7 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.25)] transition-all duration-300"
                  style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
                >
                  Customize
                </Link>
              </div>
            </div>
          </div>

          {/* Footer (added) */}
          <footer className="mt-14 border-t-2 border-[#2a2a2a] py-10 text-center">
            <div className="flex items-center justify-center gap-3 flex-wrap text-xs uppercase tracking-widest font-semibold text-[#8a8a80]">
              <span>© 2025 WearNick</span>
              <span className="opacity-40">•</span>
              <Link href="/products" className="hover:text-[#f5f5f0] transition">
                Products
              </Link>
              <span className="opacity-40">•</span>
              <Link href="/customize" className="hover:text-[#f5f5f0] transition">
                Customize
              </Link>
              <span className="opacity-40">•</span>
              <Link href="/about" className="hover:text-[#f5f5f0] transition">
                About
              </Link>
            </div>

            <p className="mt-3 text-[#8a8a80] font-semibold uppercase tracking-widest text-xs">
              Custom Street Fashion
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
