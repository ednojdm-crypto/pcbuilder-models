import { useState } from 'react'
import { PARTS_CATALOG, PCPart, formatPrice, getLowestPrice } from '@/data/parts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ExternalLink, Search, TrendingDown, RefreshCw, Filter } from 'lucide-react'

const ALL_PARTS = Object.values(PARTS_CATALOG).flat()

const CATEGORY_LABELS: Record<string, string> = {
  cpu: 'Processadores',
  gpu: 'Placas de Vídeo',
  ram: 'Memória RAM',
  motherboard: 'Placas-Mãe',
  storage: 'Armazenamento',
  psu: 'Fontes',
  cooler: 'Coolers',
  case: 'Gabinetes',
}

const STORES = [
  { key: 'kabum', label: 'Kabum', color: '#F97316', bg: '#F9731610' },
  { key: 'terabyte', label: 'Terabyte', color: '#3B82F6', bg: '#3B82F610' },
  { key: 'pichau', label: 'Pichau', color: '#10B981', bg: '#10B98110' },
]

function PriceRow({ part }: { part: PCPart }) {
  const [expanded, setExpanded] = useState(false)
  const lowest = getLowestPrice(part)
  const prices = [
    { store: 'kabum', label: 'Kabum', price: part.prices.kabum, url: part.urls.kabum, color: '#F97316' },
    { store: 'terabyte', label: 'Terabyte', price: part.prices.terabyte, url: part.urls.terabyte, color: '#3B82F6' },
    { store: 'pichau', label: 'Pichau', price: part.prices.pichau, url: part.urls.pichau, color: '#10B981' },
  ]
  const maxPrice = Math.max(...prices.filter(p => p.price).map(p => p.price!))
  const minPrice = Math.min(...prices.filter(p => p.price).map(p => p.price!))
  const savings = maxPrice - minPrice

  return (
    <div className="glass-card rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 md:p-5"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Part Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-rajdhani tracking-wider px-2 py-0.5 rounded-md" style={{ background: '#00D4FF10', color: '#00D4FF', border: '1px solid #00D4FF20' }}>
                {CATEGORY_LABELS[part.category] || part.category}
              </span>
              <span className="text-slate-600 text-xs">{part.brand}</span>
            </div>
            <h3 className="font-rajdhani font-600 text-white text-base">{part.name}</h3>
            <p className="text-slate-500 text-xs font-inter mt-0.5 truncate">{part.specs}</p>
          </div>

          {/* Price Grid - desktop */}
          <div className="hidden md:grid grid-cols-3 gap-3 w-80">
            {prices.map((p) => {
              const isLowest = lowest?.store === p.label
              return (
                <div
                  key={p.store}
                  className="text-center p-2 rounded-lg"
                  style={{
                    background: isLowest ? `${p.color}12` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isLowest ? p.color + '40' : 'transparent'}`,
                  }}
                >
                  <p className="text-slate-600 text-xs mb-1">{p.label}</p>
                  <p className={`font-rajdhani font-600 text-sm ${isLowest ? 'text-[#00FF94]' : 'text-slate-300'}`}>
                    {p.price ? `R$ ${p.price.toLocaleString('pt-BR')}` : '—'}
                  </p>
                  {isLowest && <p className="text-[#00FF94] text-xs">✓ Menor</p>}
                </div>
              )
            })}
          </div>

          {/* Savings badge */}
          {savings > 0 && (
            <div className="hidden md:flex flex-col items-end flex-shrink-0">
              <span className="text-xs text-slate-600 font-inter">economia de até</span>
              <span className="font-orbitron font-bold text-[#00FF94] text-lg">
                R$ {savings.toLocaleString('pt-BR')}
              </span>
            </div>
          )}

          {/* Mobile: just lowest price */}
          <div className="md:hidden flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs">Menor preço</p>
              <p className="text-[#00FF94] font-rajdhani font-700 text-lg">
                {lowest ? formatPrice(lowest.price) : '—'}
              </p>
              {lowest && <p className="text-slate-600 text-xs">{lowest.store}</p>}
            </div>
            {savings > 0 && (
              <div className="text-right">
                <p className="text-slate-500 text-xs">economia</p>
                <p className="text-[#F43F5E] font-rajdhani font-600">R$ {savings.toLocaleString('pt-BR')}</p>
              </div>
            )}
          </div>
        </div>
      </button>

      {/* Expanded: detailed price comparison with links */}
      {expanded && (
        <div className="border-t border-white/5 p-4 md:p-5 bg-white/[0.01]">
          <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-4">COMPRAR NAS LOJAS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {prices.map((p) => {
              const isLowest = lowest?.store === p.label
              return (
                <a
                  key={p.store}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: `${p.color}08`,
                    border: `1px solid ${p.color}${isLowest ? '50' : '20'}`,
                  }}
                >
                  <div>
                    <p className="font-rajdhani font-600 text-sm" style={{ color: p.color }}>{p.label}</p>
                    <p className={`font-orbitron font-bold text-lg ${isLowest ? 'text-[#00FF94]' : 'text-white'}`}>
                      {p.price ? formatPrice(p.price) : 'Indisponível'}
                    </p>
                    {isLowest && (
                      <span className="text-xs text-[#00FF94] font-rajdhani">✓ Melhor preço</span>
                    )}
                  </div>
                  <ExternalLink size={16} style={{ color: p.color }} />
                </a>
              )
            })}
          </div>

          {/* Performance bar */}
          <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span className="font-rajdhani tracking-wider">PERFORMANCE</span>
              <span className="font-rajdhani">{part.performance}/100</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${part.performance}%`,
                  background: 'linear-gradient(90deg, #00D4FF, #7C3AED)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PrecosPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'savings'>('price')

  const filtered = ALL_PARTS
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .filter((p) =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        const la = getLowestPrice(a)?.price ?? 999999
        const lb = getLowestPrice(b)?.price ?? 999999
        return la - lb
      }
      if (sortBy === 'savings') {
        const savA = Math.max(...Object.values(a.prices).filter(Boolean) as number[]) - Math.min(...Object.values(a.prices).filter(Boolean) as number[])
        const savB = Math.max(...Object.values(b.prices).filter(Boolean) as number[]) - Math.min(...Object.values(b.prices).filter(Boolean) as number[])
        return savB - savA
      }
      return a.name.localeCompare(b.name)
    })

  return (
    <main className="min-h-screen bg-[#05050F] grid-bg">
      <Navbar />

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#F43F5E] font-rajdhani tracking-widest text-sm uppercase mb-2">Preços em Tempo Real</p>
          <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Comparador de Preços
          </h1>
          <p className="text-slate-500 font-inter mt-2 max-w-xl mx-auto">
            Preços atualizados diariamente de Kabum, Terabyte Shop e Pichau. Sempre o menor preço para você.
          </p>
        </div>

        {/* Store Legends */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {STORES.map((s) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
              <span className="font-rajdhani text-slate-400 text-sm">{s.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-4">
            <RefreshCw size={12} className="text-slate-600 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-slate-600 text-xs font-inter">Atualizado hoje</span>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 border border-white/5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar peça ou marca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white font-inter text-sm placeholder-slate-600 focus:outline-none focus:border-[#00D4FF]/30 transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 font-rajdhani text-sm focus:outline-none focus:border-[#00D4FF]/30 transition-colors"
              >
                <option value="price">Menor Preço</option>
                <option value="savings">Maior Economia</option>
                <option value="name">Nome</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-rajdhani tracking-wide transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              }`}
            >
              Todos
            </button>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-rajdhani tracking-wide transition-all ${
                  activeCategory === key
                    ? 'bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/30'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-slate-600 text-xs font-inter mb-4">
          {filtered.length} peças encontradas
        </p>

        {/* Parts List */}
        <div className="space-y-3">
          {filtered.map((part) => (
            <PriceRow key={part.id} part={part} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-600 font-inter">Nenhuma peça encontrada para "{search}"</p>
          </div>
        )}

        {/* Info box */}
        <div className="mt-12 glass-card rounded-2xl p-6 border border-[#F59E0B]/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
              <TrendingDown size={20} className="text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="font-rajdhani font-600 text-white mb-1">Como funciona a atualização de preços?</h3>
              <p className="text-slate-500 text-sm font-inter leading-relaxed">
                Os preços são coletados automaticamente todo dia às 6h da manhã via web scraping nas lojas Kabum, Terabyte Shop e Pichau.
                Pode haver pequenas variações de centavos em relação ao preço exato do momento da sua visita.
                Sempre confirme o preço final no site da loja antes de comprar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
