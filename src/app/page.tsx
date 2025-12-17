'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Sparkles, User, Zap, TrendingUp, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

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
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
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

      {/* Header - Stencil style with glassmorphism */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b-2 border-[#2a2a2a]"
        style={{
          boxShadow:
            '0 4px 30px rgba(0,0,0,0.3), 0 2px 0 rgba(245,245,240,0.1), inset 0 -1px 0 rgba(0,0,0,0.5)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo with glow effect */}
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

          {/* Navigation - Stencil links with animated underlines */}
          <nav className="flex items-center gap-5 flex-wrap justify-end text-sm md:text-base uppercase tracking-wider font-bold">
            <Link href="/" className="text-[#f5f5f0] hover:text-[#ff3333] transition-all duration-300 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff3333] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(255,51,51,0.8)]"></span>
              <span className="absolute inset-0 bg-[#ff3333] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
            </Link>
            <Link href="/products" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/customize" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group">
              Customize
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/cart" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group">
              Cart
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contact" className="text-[#d0d0c8] hover:text-[#f5f5f0] transition-all duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f5f5f0] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Protest poster style */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Animated background elements */}
        <div className="absolute top-40 right-10 w-32 h-32 border-2 border-[#ff3333] opacity-10 rotate-12 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-24 h-24 border border-[#f5f5f0] opacity-5 -rotate-6" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text - Stencil typography */}
          <div>
            {/* Animated badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff3333]/10 border border-[#ff3333]/30 mb-6 animate-pulse"
              style={{
                clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)',
                animation: 'pulse 3s ease-in-out infinite',
              }}
            >
              <Zap size={16} className="text-[#ff3333]" />
              <span className="text-[#ff3333] font-bold text-xs uppercase tracking-widest">New Collection</span>
            </div>

            <h1
              className="text-6xl md:text-7xl font-black leading-[0.95] mb-6 uppercase tracking-tight animate-[slideInLeft_0.8s_ease-out]"
              style={{
                textShadow: '4px 4px 0 rgba(0,0,0,0.4), -1px -1px 0 rgba(255,255,255,0.1)',
                letterSpacing: '-0.02em',
              }}
            >
              Design Your
              <span
                className="block text-[#ff3333] animate-[slideInLeft_1s_ease-out]"
                style={{
                  textShadow: '4px 4px 0 rgba(0,0,0,0.6), 0 0 30px rgba(255,51,51,0.4)',
                }}
              >
                Streetwear
              </span>
            </h1>

            <p className="text-xl text-[#b0b0a8] mb-10 font-medium leading-relaxed animate-[fadeIn_1.2s_ease-out]">
              Custom Hoodies, Sweatshirts, and T-Shirts with urban graffiti designs.
            </p>

            {/* Stats bar */}
            <div className="flex gap-6 mb-10 flex-wrap">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-[#ff3333]" />
                <div>
                  <div className="text-2xl font-black text-[#f5f5f0]">20+</div>
                  <div className="text-xs text-[#8a8a80] uppercase tracking-wide">Designs</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} className="text-[#ff3333]" />
                <div>
                  <div className="text-2xl font-black text-[#f5f5f0]">Premium</div>
                  <div className="text-xs text-[#8a8a80] uppercase tracking-wide">Quality</div>
                </div>
              </div>
            </div>

            {/* CTA + Product Buttons - Wheat paste poster style */}
            <div className="flex flex-col gap-6">
              {/* Main CTA - Stencil button with spray paint effect */}
              <Link
                href="/customize"
                className="inline-flex items-center justify-center gap-3 bg-[#f5f5f0] text-[#0a0a0a] px-8 py-4 text-lg font-black uppercase tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300 relative group overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)',
                  boxShadow:
                    '4px 4px 0 rgba(0,0,0,0.3), 0 0 20px rgba(255,51,51,0.2), inset -2px -2px 0 rgba(0,0,0,0.1)',
                }}
              >
                <ShoppingBag size={24} strokeWidth={3} className="relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Start Designing</span>

                <span
                  className="absolute inset-0 bg-gradient-to-r from-[#ff3333] via-[#ff5555] to-[#ff3333] opacity-0 group-hover:opacity-100 transition-all duration-500 animate-[shimmer_2s_ease-in-out_infinite]"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)',
                    backgroundSize: '200% 100%',
                  }}
                ></span>

                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-[#ff3333] transition-opacity duration-300"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}
                ></span>
              </Link>

              {/* Product Quick Buttons */}
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/products?type=shirts"
                  className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-sm tracking-wide hover:border-[#ff3333] hover:bg-[#1a1a1a] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.3)] transition-all duration-300 relative group"
                  style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
                >
                  <span className="relative z-10">Shirts</span>
                  <span
                    className="absolute inset-0 bg-[#ff3333] opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
                  ></span>
                </Link>

                <Link
                  href="/products?type=hoodies"
                  className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-sm tracking-wide hover:border-[#ff3333] hover:bg-[#1a1a1a] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.3)] transition-all duration-300 relative group"
                  style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
                >
                  <span className="relative z-10">Hoodies</span>
                  <span
                    className="absolute inset-0 bg-[#ff3333] opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
                  ></span>
                </Link>

                <Link
                  href="/products?type=sweatshirts"
                  className="px-6 py-3 border-2 border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-sm tracking-wide hover:border-[#ff3333] hover:bg-[#1a1a1a] hover:text-[#ff3333] hover:shadow-[0_0_20px_rgba(255,51,51,0.3)] transition-all duration-300 relative group"
                  style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
                >
                  <span className="relative z-10">Sweatshirts</span>
                  <span
                    className="absolute inset-0 bg-[#ff3333] opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
                  ></span>
                </Link>
              </div>

              {/* Secondary actions */}
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/products"
                  className="px-6 py-3 bg-[#2a2a2a] border border-[#3a3a3a] hover:bg-[#3a3a3a] hover:border-[#4a4a4a] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 font-semibold uppercase text-sm tracking-wide"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                >
                  Browse Catalog
                </Link>

                <Link
                  href="/cart"
                  className="px-6 py-3 bg-[#2a2a2a] border border-[#3a3a3a] hover:bg-[#3a3a3a] hover:border-[#4a4a4a] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 font-semibold uppercase text-sm tracking-wide"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>

          {/* Feature Cards - Wheat paste posters with 3D effects */}
          <div className="relative animate-[fadeInRight_1s_ease-out]">
            <div
              className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-8 relative transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,51,51,0.15)]"
              style={{
                boxShadow: '12px 12px 0 rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.03)',
                transform: 'perspective(1000px) rotateY(-2deg)',
              }}
            >
              <div
                className="absolute -top-3 left-8 w-16 h-6 bg-[#d0d0c8] opacity-50 rotate-[-5deg]"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)' }}
              ></div>
              <div
                className="absolute -top-3 right-8 w-16 h-6 bg-[#d0d0c8] opacity-50 rotate-[5deg]"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)' }}
              ></div>

              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/products?type=shirts"
                  className="bg-[#1a1a1a] p-6 border border-[#2a2a2a] relative hover:border-[#ff3333] hover:bg-[#2a2a2a] hover:shadow-[0_0_30px_rgba(255,51,51,0.2)] transition-all duration-300 cursor-pointer group"
                  style={{
                    clipPath: 'polygon(0 0, 100% 2%, 100% 100%, 2% 100%)',
                    transform: 'perspective(500px) rotateX(0deg)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(500px) rotateX(5deg) translateZ(10px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(500px) rotateX(0deg) translateZ(0px)'
                  }}
                >
                  <div className="mb-3">
                    <Sparkles className="text-[#f5f5f0] group-hover:text-[#ff3333] transition-colors duration-300" size={28} />
                  </div>
                  <h3 className="font-black mb-1 uppercase tracking-wide text-sm group-hover:text-[#ff3333] transition-colors">
                    T-Shirts
                  </h3>
                  <p className="text-[#8a8a80] text-xs leading-relaxed">Bold prints & premium fabric</p>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#ff3333]/0 via-[#ff3333]/0 to-[#ff3333]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ clipPath: 'polygon(0 0, 100% 2%, 100% 100%, 2% 100%)' }}
                  ></div>
                </Link>

                <Link
                  href="/products?type=hoodies"
                  className="bg-[#1a1a1a] p-6 border border-[#2a2a2a] relative hover:border-[#ff3333] hover:bg-[#2a2a2a] hover:shadow-[0_0_30px_rgba(255,51,51,0.2)] transition-all duration-300 cursor-pointer group"
                  style={{
                    clipPath: 'polygon(2% 0, 100% 0, 100% 100%, 0 98%)',
                    transform: 'perspective(500px) rotateX(0deg)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(500px) rotateX(5deg) translateZ(10px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(500px) rotateX(0deg) translateZ(0px)'
                  }}
                >
                  <User className="text-[#f5f5f0] mb-3 group-hover:scale-125 group-hover:text-[#ff3333] transition-all duration-300" size={32} strokeWidth={2.5} />
                  <h3 className="font-black mb-1 uppercase tracking-wide text-sm group-hover:text-[#ff3333] transition-colors">
                    Hoodies
                  </h3>
                  <p className="text-[#8a8a80] text-xs leading-relaxed">Oversized street fit</p>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#ff3333]/0 via-[#ff3333]/0 to-[#ff3333]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ clipPath: 'polygon(2% 0, 100% 0, 100% 100%, 0 98%)' }}
                  ></div>
                </Link>

                <Link
                  href="/customize"
                  className="col-span-2 bg-[#1a1a1a] p-6 border border-[#2a2a2a] relative hover:border-[#ff3333] hover:bg-[#2a2a2a] hover:shadow-[0_0_30px_rgba(255,51,51,0.3)] transition-all duration-300 cursor-pointer group"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)',
                    transform: 'perspective(500px) rotateX(0deg)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(500px) rotateX(5deg) translateZ(10px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(500px) rotateX(0deg) translateZ(0px)'
                  }}
                >
                  <Sparkles className="text-[#ff3333] mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={32} strokeWidth={2.5} />
                  <h3 className="font-black mb-1 uppercase tracking-wide text-sm group-hover:text-[#ff3333] transition-colors">
                    Graffiti Designs
                  </h3>
                  <p className="text-[#8a8a80] text-xs leading-relaxed">Urban street art inspired prints</p>
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#ff3333]/10 via-[#ff3333]/5 to-[#ff3333]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)' }}
                  ></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-black text-center mb-16 uppercase tracking-tight animate-[fadeIn_1s_ease-out]"
            style={{
              textShadow: '3px 3px 0 rgba(0,0,0,0.3), 0 0 30px rgba(255,51,51,0.2)',
            }}
          >
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose Your Style', desc: 'Pick Hoodie, Sweatshirt, or T-Shirt.', delay: '0s' },
              { step: '02', title: 'Select a Design', desc: 'Choose from the graffiti design collection.', delay: '0.2s' },
              { step: '03', title: 'Checkout', desc: 'Complete your order using a checkout flow.', delay: '0.4s' },
            ].map((x) => (
              <div
                key={x.step}
                className="bg-[#0a0a0a] border-2 border-[#2a2a2a] p-8 text-center relative hover:border-[#ff3333] hover:shadow-[0_0_40px_rgba(255,51,51,0.2)] transition-all duration-500 group cursor-pointer animate-[fadeInUp_1s_ease-out]"
                style={{
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.4)',
                  clipPath: 'polygon(0 2%, 98% 0, 100% 98%, 2% 100%)',
                  animationDelay: x.delay,
                  transform: 'perspective(500px) rotateX(0deg)',
                  transition: 'all 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'perspective(500px) rotateX(-5deg) translateY(-10px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(500px) rotateX(0deg) translateY(0px)'
                }}
              >
                <div
                  className="text-6xl font-black mb-4 text-[#ff3333] group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 relative"
                  style={{
                    textShadow: '4px 4px 0 rgba(0,0,0,0.5), 0 0 30px rgba(255,51,51,0.6)',
                  }}
                >
                  {x.step}
                  <div className="absolute inset-0 text-[#ff3333] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                    {x.step}
                  </div>
                </div>

                <h3 className="text-xl font-black mb-2 uppercase tracking-wide group-hover:text-[#ff3333] transition-colors duration-300">
                  {x.title}
                </h3>
                <p className="text-[#8a8a80] leading-relaxed">{x.desc}</p>

                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#ff3333] opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#ff3333] opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Concrete slab style */}
      <footer
        className="border-t-2 border-[#2a2a2a] py-10 px-6 bg-[#0a0a0a] relative"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 -10px 30px rgba(0,0,0,0.3)',
        }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <div
              className="relative w-44 h-12"
              style={{ filter: 'drop-shadow(0 0 14px rgba(255,51,51,0.2))' }}
            >
              <Image src="/wearnick-logo.jpeg" alt="WearNick Logo" fill className="object-contain" />
            </div>
            <p className="text-[#8a8a80] mt-4 leading-relaxed">
              Custom street fashion built for bold identity. Black, concrete, and graffiti energy — made wearable.
            </p>

            <div className="mt-4 flex gap-3 flex-wrap">
              <Link
                href="/customize"
                className="px-5 py-2 bg-[#f5f5f0] text-[#0a0a0a] font-black uppercase text-xs tracking-wide hover:bg-[#ff3333] hover:text-[#f5f5f0] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)' }}
              >
                Start Designing
              </Link>
              <Link
                href="/products"
                className="px-5 py-2 border border-[#3a3a3a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] transition-all duration-300"
                style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
              >
                Browse Catalog
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black uppercase tracking-wide text-sm mb-4 text-[#f5f5f0]">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/products">
                Products
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/customize">
                Customize
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/cart">
                Cart
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/checkout">
                Checkout
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/about">
                About
              </Link>
              <Link className="text-[#d0d0c8] hover:text-[#ff3333] transition-colors" href="/contact">
                Contact
              </Link>
            </div>
          </div>

          {/* Socials + Contact */}
          <div>
            <h4 className="font-black uppercase tracking-wide text-sm mb-4 text-[#f5f5f0]">Socials & Contact</h4>

            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/officials_by_wearnick?igsh=MTMydXc3b3oyODF0MA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 border border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 100%, 2% 100%)' }}
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 border border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(2% 0, 100% 0, 98% 100%, 0 100%)' }}
              >
                Facebook
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 border border-[#3a3a3a] bg-[#0a0a0a] text-[#f5f5f0] font-bold uppercase text-xs tracking-wide hover:border-[#ff3333] hover:text-[#ff3333] hover:shadow-[0_0_18px_rgba(255,51,51,0.25)] transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, 100% 2%, 100% 100%, 2% 98%)' }}
              >
                TikTok
              </a>

              <div className="mt-2 text-sm text-[#b0b0a8] space-y-1">
                <div>
                  <span className="text-[#f5f5f0] font-bold">Email:</span> officials@wearnick.com
                </div>
                <div>
                  <span className="text-[#f5f5f0] font-bold">WhatsApp:</span> +92 317 4347343
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#2a2a2a] text-center text-[#8a8a80] text-xs uppercase tracking-widest">
          © 2025 WearNick — Custom Street Fashion
        </div>
      </footer>
    </div>
  )
}
