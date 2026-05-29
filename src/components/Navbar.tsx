'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Cpu, ChevronRight } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/configurador', label: 'Montar PC' },
  { href: '/precos', label: 'Comparar Preços' },
  { href: '/jogos', label: 'Compatibilidade' },
  { href: '/guia', label: 'Hospedar Site' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-card border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center neon-blue">
            <Cpu size={16} className="text-white" />
          </div>
          <span className="font-orbitron font-bold text-white text-lg tracking-wider group-hover:text-[#00D4FF] transition-colors">
            BUILD<span className="text-[#00D4FF]">PC</span>
            <span className="text-xs font-rajdhani text-[#7C3AED] ml-1 font-normal">BRASIL</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg font-rajdhani font-500 text-sm text-slate-400 hover:text-[#00D4FF] hover:bg-[#00D4FF]/5 transition-all duration-200 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/configurador"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-white font-rajdhani font-600 text-sm tracking-wide hover:opacity-90 transition-all hover:scale-105 neon-blue"
        >
          Montar Agora
          <ChevronRight size={14} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden glass-card border-t border-white/5 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg font-rajdhani text-slate-300 hover:text-[#00D4FF] hover:bg-[#00D4FF]/5 transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/configurador"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-white font-rajdhani font-600 text-center tracking-wide"
          >
            Montar Agora
          </Link>
        </div>
      )}
    </header>
  )
}
