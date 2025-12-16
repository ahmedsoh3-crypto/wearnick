'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Graffiti background */}
      <div className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-20 -z-10" />

      <section className="pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
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
              <h1 className="text-4xl font-extrabold">Contact</h1>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link href="/" className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition">
                Home
              </Link>
              <Link href="/products" className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition">
                Products
              </Link>
              <Link href="/about" className="px-5 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition">
                About
              </Link>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Contact Form */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-extrabold">Send us a message</h2>
              <p className="text-white/70 mt-2">
                For custom orders, bulk requests, or support.
              </p>

              {sent ? (
                <div className="mt-6 bg-white/10 border border-white/10 rounded-2xl p-6">
                  <p className="text-white font-semibold">✅ Message sent!</p>
                  <p className="text-white/70 mt-2">
                    Thanks {name}. We’ll contact you soon.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false)
                      setName('')
                      setEmail('')
                      setMessage('')
                    }}
                    className="mt-5 px-6 py-3 rounded-full bg-white text-black font-bold hover:opacity-90 transition"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm text-white/70">Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-1 px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-white"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/70">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-full mt-1 px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-white"
                      placeholder="you@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white/70">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full mt-1 px-4 py-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-white min-h-[120px]"
                      placeholder="Tell us what you need..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-full bg-white text-black font-bold hover:opacity-90 transition"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info + Socials */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-extrabold">Reach Us</h2>
              <p className="text-white/70 mt-2">
                Connect with WearNick online or directly.
              </p>

              {/* Social Links */}
              <div className="mt-6 space-y-3">
                <a
                  href="https://www.instagram.com/officials_by_wearnick?igsh=MTMydXc3b3oyODF0MA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-6 py-4 rounded-2xl border border-white/20 hover:bg-white hover:text-black transition"
                >
                  Instagram
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-6 py-4 rounded-2xl border border-white/20 hover:bg-white hover:text-black transition"
                >
                  Facebook
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-6 py-4 rounded-2xl border border-white/20 hover:bg-white hover:text-black transition"
                >
                  TikTok
                </a>
              </div>

              {/* Direct Contact */}
              <div className="mt-8 text-white/70 space-y-2">
                <p>
                  <span className="font-semibold text-white">Email:</span>{' '}
                  umar@wearnick.com
                </p>
                <p>
                  <span className="font-semibold text-white">WhatsApp:</span>{' '}
                  +92 317 4347343
                </p>
              </div>

              <div className="mt-8 flex gap-3 flex-wrap">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-full bg-white text-black font-bold hover:opacity-90 transition"
                >
                  Browse Products
                </Link>
                <Link
                  href="/customize"
                  className="px-6 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
                >
                  Customize
                </Link>
              </div>
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
