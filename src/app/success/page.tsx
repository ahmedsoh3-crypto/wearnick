'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
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
      {/* Spotlight */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.03] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,51,51,0.4) 0%, transparent 70%)',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
      />

      {/* Concrete texture */}
      <div
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px)`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Graffiti */}
      <div
        className="absolute inset-0 bg-[url('/graffiti-bg.png')] bg-cover bg-center opacity-[0.08] -z-10 mix-blend-multiply"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b-2 border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="relative w-44 h-12">
            <Image
              src="/wearnick-logo.jpeg"
              alt="WearNick Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <nav className="flex gap-5 uppercase tracking-wider font-bold text-sm">
            <Link href="/" className="text-[#d0d0c8] hover:text-[#f5f5f0]">Home</Link>
            <Link href="/products" className="text-[#d0d0c8] hover:text-[#f5f5f0]">Products</Link>
            <Link href="/customize" className="text-[#d0d0c8] hover:text-[#f5f5f0]">Customize</Link>
            <Link href="/cart" className="text-[#d0d0c8] hover:text-[#f5f5f0]">Cart</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="pt-36 pb-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div
            className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-12"
            style={{
              clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
              boxShadow: '12px 12px 0 rgba(0,0,0,0.45)',
            }}
          >
            <div className="flex justify-center mb-6">
              <CheckCircle size={72} className="text-[#ff3333]" />
            </div>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Payment Successful
            </h1>

            <p className="text-[#b0b0a8] mt-4 leading-relaxed">
              Your order has been placed successfully.
              <br />
              <span className="text-xs uppercase tracking-widest opacity-70">
                Congrats — order locked in
              </span>
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link
                href="/products"
                className="px-7 py-3 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-xs tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.35)',
                }}
              >
                Shop More
              </Link>

              <Link
                href="/customize"
                className="px-7 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] transition"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                Customize Again
              </Link>

              <Link
                href="/"
                className="px-7 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] transition"
                style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#2a2a2a] py-10 text-center text-xs uppercase tracking-widest text-[#8a8a80]">
        © 2025 WearNick — Custom Street Fashion
      </footer>
    </div>
  )
}
