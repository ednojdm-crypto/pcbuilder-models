'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Zap, ChartBar as BarChart2, Gamepad2, Globe, ArrowRight, Star, TrendingDown, Monitor } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const STATS = [
  { label: 'Peças Catalogadas', value: '200+', icon: <Monitor size={18} /> },
  { label: 'Jogos na Base', value: '50+', icon: <Gamepad2 size={18} /> },
  { label: 'Lojas Monitoradas', value: '3', icon: <TrendingDown size={18} /> },
  { label: 'Atualização', value: 'Diária', icon: <Zap size={18} /> },
]

const FEATURES = [
  {
    icon: <Monitor size={28} />,
    title: 'Configurador 3D',
    desc: 'Monte seu PC peça por peça e veja o resultado em tempo real com modelos 3D interativos.',
    href: '/configurador',
    color: '#00D4FF',
  },
  {
    icon: <BarChart2 size={28} />,
    title: 'Comparação de Preços',
    desc: 'Preços atualizados diariamente de Kabum, Terabyte Shop e Pichau. Sempre o menor preço.',
    href: '/precos',
    color: '#7C3AED',
  },
  {
    icon: <Gamepad2 size={28} />,
    title: 'Compatibilidade de Jogos',
    desc: 'Saiba exatamente quais jogos seu PC pode rodar e em qual qualidade gráfica.',
    href: '/jogos',
    color: '#F43F5E',
  },
  {
    icon: <Globe size={28} />,
    title: 'Guia de Hospedagem',
    desc: 'Aprenda como hospedar seu site gratuitamente com um passo a passo simples e direto.',
    href: '/guia',
    color: '#00FF94',
  },
]

const POPULAR_BUILDS = [
  {
    name: 'Custo-Benefício',
    price: 'R$ 2.800',
    cpu: 'Ryzen 5 5600X',
    gpu: 'RTX 3060',
    ram: '16GB DDR4',
    games: ['CS2', 'Valorant', 'GTA V'],
    tier: 'BOAS CONFIGURAÇÕES',
    tierColor: '#00D4FF',
  },
  {
    name: 'Gamer Intermediário',
    price: 'R$ 4.500',
    cpu: 'Ryzen 7 5700X',
    gpu: 'RTX 4060',
    ram: '16GB DDR4',
    games: ['Cyberpunk 2077', 'Elden Ring', 'Warzone'],
    tier: 'RECOMENDADO',
    tierColor: '#7C3AED',
  },
  {
    name: 'High-End',
    price: 'R$ 7.200',
    cpu: 'Core i7-13700K',
    gpu: 'RTX 4070',
    ram: '32GB DDR5',
    games: ['Hogwarts Legacy', 'RDR2', 'Cyberpunk RT'],
    tier: 'TOP TIER',
    tierColor: '#F43F5E',
  },
]

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    ref.current = true
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return count
}

// Floating particles background
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            background: i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#7C3AED' : '#F43F5E',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
            animationDelay: Math.random() * 4 + 's',
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#05050F] grid-bg">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <Particles />

        {/* Background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00D4FF]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#00D4FF]/20 text-[#00D4FF] text-xs font-rajdhani tracking-widest mb-8 uppercase">
            <Zap size={12} className="animate-pulse" />
            Preços atualizados hoje
          </div>

          {/* Title */}
          <h1 className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Monte seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#F43F5E] neon-text-blue">
              PC Gamer
            </span>
            <br />
            em{' '}
            <span className="text-[#00D4FF] neon-text-blue">3D</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl font-inter leading-relaxed max-w-2xl mx-auto mb-10">
            Visualize seu PC montado em 3D, compare preços em tempo real nas maiores lojas do Brasil e descubra exatamente quais jogos você pode rodar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/configurador"
              className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-white font-rajdhani font-700 text-lg tracking-wide hover:opacity-90 hover:scale-105 transition-all duration-200 neon-blue"
            >
              <Monitor size={20} />
              Iniciar Configurador 3D
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/precos"
              className="flex items-center gap-3 px-8 py-4 rounded-xl glass-card border border-white/10 text-white font-rajdhani font-500 text-lg tracking-wide hover:border-[#00D4FF]/40 hover:text-[#00D4FF] transition-all duration-200"
            >
              <BarChart2 size={20} />
              Ver Preços Agora
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-center gap-2 text-[#00D4FF] mb-2">
                  {stat.icon}
                </div>
                <div className="font-orbitron font-bold text-2xl text-white">{stat.value}</div>
                <div className="text-slate-500 text-xs font-inter mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#00D4FF] font-rajdhani tracking-widest text-sm uppercase mb-3">Funcionalidades</p>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Tudo que você precisa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feat) => (
            <Link
              key={feat.title}
              href={feat.href}
              className="group glass-card rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${feat.color}15`, color: feat.color, boxShadow: `0 0 20px ${feat.color}20` }}
              >
                {feat.icon}
              </div>
              <h3 className="font-rajdhani font-700 text-xl text-white mb-3 tracking-wide">{feat.title}</h3>
              <p className="text-slate-500 font-inter text-sm leading-relaxed mb-4">{feat.desc}</p>
              <div className="flex items-center gap-2 text-sm font-rajdhani transition-colors" style={{ color: feat.color }}>
                Acessar
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR BUILDS ── */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#7C3AED] font-rajdhani tracking-widest text-sm uppercase mb-3">Configurações Prontas</p>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Builds Populares
          </h2>
          <p className="text-slate-500 font-inter mt-3 max-w-xl mx-auto">
            Configurações pré-montadas com melhor custo-benefício. Personalize ou use como ponto de partida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POPULAR_BUILDS.map((build, i) => (
            <div
              key={build.name}
              className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-300"
            >
              {/* Tier badge */}
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-orbitron font-bold tracking-widest"
                style={{ background: `${build.tierColor}15`, color: build.tierColor }}
              >
                {build.tier}
              </div>

              <h3 className="font-orbitron font-bold text-white text-lg mb-1">{build.name}</h3>
              <div className="font-rajdhani font-700 text-2xl mb-4" style={{ color: build.tierColor }}>
                {build.price}
              </div>

              {/* Parts */}
              <div className="space-y-2 mb-6">
                {[
                  { label: 'CPU', value: build.cpu },
                  { label: 'GPU', value: build.gpu },
                  { label: 'RAM', value: build.ram },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-slate-600 text-xs font-rajdhani tracking-wider">{item.label}</span>
                    <span className="text-slate-300 text-sm font-inter">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Games */}
              <div className="border-t border-white/5 pt-4">
                <p className="text-slate-600 text-xs font-rajdhani tracking-wider mb-2">JOGOS COMPATÍVEIS</p>
                <div className="flex flex-wrap gap-2">
                  {build.games.map((game) => (
                    <span
                      key={game}
                      className="px-2 py-1 rounded-md text-xs font-inter text-slate-400"
                      style={{ background: `${build.tierColor}10`, border: `1px solid ${build.tierColor}20` }}
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/configurador"
                className="mt-5 w-full py-3 rounded-xl font-rajdhani font-600 text-sm tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: `${build.tierColor}20`, color: build.tierColor, border: `1px solid ${build.tierColor}30` }}
              >
                Personalizar Build
                <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICE COMPARISON PREVIEW ── */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-10 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#F43F5E] font-rajdhani tracking-widest text-sm uppercase mb-3">Economia Real</p>
              <h2 className="font-orbitron font-bold text-3xl text-white mb-4">
                Compare preços e economize centenas de reais
              </h2>
              <p className="text-slate-500 font-inter leading-relaxed mb-6">
                Monitoramos preços diariamente em Kabum, Terabyte Shop e Pichau. Na hora de comprar, você sabe exatamente onde está o menor preço para cada peça.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {['Atualização diária automática', 'Histórico de variação de preço', 'Link direto para compra', 'Alerta de promoções'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#00FF94]" />
                    </div>
                    <span className="text-slate-400 text-sm font-inter">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/precos" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F43F5E] text-white font-rajdhani font-600 tracking-wide hover:opacity-90 transition-all hover:scale-105">
                Ver Comparativo de Preços
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mini price comparison preview */}
            <div className="space-y-3">
              {[
                { part: 'RTX 4060 8GB', kabum: 2199, terabyte: 2149, pichau: 2179 },
                { part: 'Ryzen 5 5600X', kabum: 749, terabyte: 739, pichau: 755 },
                { part: 'SSD NVMe 1TB', kabum: 399, terabyte: 385, pichau: 389 },
              ].map((item) => {
                const lowest = Math.min(item.kabum, item.terabyte, item.pichau)
                return (
                  <div key={item.part} className="rounded-xl p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-white text-sm font-rajdhani font-500 mb-3">{item.part}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { store: 'Kabum', price: item.kabum },
                        { store: 'Terabyte', price: item.terabyte },
                        { store: 'Pichau', price: item.pichau },
                      ].map((s) => (
                        <div
                          key={s.store}
                          className="rounded-lg p-2 text-center"
                          style={{
                            background: s.price === lowest ? 'rgba(0,255,148,0.08)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${s.price === lowest ? 'rgba(0,255,148,0.25)' : 'rgba(255,255,255,0.05)'}`,
                          }}
                        >
                          <p className="text-slate-500 text-xs mb-1">{s.store}</p>
                          <p className={`text-sm font-rajdhani font-600 ${s.price === lowest ? 'text-[#00FF94]' : 'text-slate-300'}`}>
                            R$ {s.price.toLocaleString('pt-BR')}
                          </p>
                          {s.price === lowest && (
                            <span className="text-[#00FF94] text-xs">✓ Menor</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <div className="glass-card rounded-3xl p-12 border border-[#7C3AED]/20 relative overflow-hidden gradient-border">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-[#00D4FF]/5 pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 text-[#00D4FF]">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-4">
              Pronto para montar<br />seu PC dos sonhos?
            </h2>
            <p className="text-slate-400 font-inter mb-8 max-w-lg mx-auto">
              Gratuito, sem cadastro. Monte agora e descubra quanto vai custar nas melhores lojas do Brasil.
            </p>
            <Link
              href="/configurador"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-white font-rajdhani font-700 text-xl tracking-wide hover:opacity-90 hover:scale-105 transition-all neon-blue"
            >
              <Monitor size={22} />
              Montar PC em 3D Agora
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
