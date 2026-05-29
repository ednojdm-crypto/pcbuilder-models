import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GAMES_CATALOG,
  PARTS_CATALOG,
  PCBuild,
  PCPart,
  Game,
  checkGameCompatibility,
  getBuildPerformance,
  formatPrice,
  getBuildTotalPrice,
  getLowestPrice,
} from '@/data/parts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Gamepad2, Monitor, Cpu, Zap, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle, Star, ChevronRight } from 'lucide-react'

const EMPTY_BUILD: PCBuild = {
  cpu: null, gpu: null, ram: null, motherboard: null,
  storage: null, psu: null, cooler: null, case: null,
}

const COMPAT_CONFIG = {
  incompatível: { label: 'Incompatível', color: '#F43F5E', bg: '#F43F5E10', icon: <XCircle size={16} />, bar: 0 },
  mínimo:       { label: 'Roda no Mínimo', color: '#F59E0B', bg: '#F59E0B10', icon: <AlertCircle size={16} />, bar: 40 },
  recomendado:  { label: 'Roda no Recomendado', color: '#00D4FF', bg: '#00D4FF10', icon: <CheckCircle size={16} />, bar: 75 },
  ultra:        { label: 'Ultra / Max Settings', color: '#00FF94', bg: '#00FF9410', icon: <Star size={16} />, bar: 100 },
}

const QUICK_BUILDS = [
  {
    name: 'Build Básica',
    build: {
      cpu: PARTS_CATALOG.cpu[0],
      gpu: PARTS_CATALOG.gpu[0],
      ram: PARTS_CATALOG.ram[1],
      motherboard: PARTS_CATALOG.motherboard[0],
      storage: PARTS_CATALOG.storage[1],
      psu: PARTS_CATALOG.psu[0],
      cooler: PARTS_CATALOG.cooler[0],
      case: PARTS_CATALOG.case[0],
    },
  },
  {
    name: 'Build Intermediária',
    build: {
      cpu: PARTS_CATALOG.cpu[1],
      gpu: PARTS_CATALOG.gpu[1],
      ram: PARTS_CATALOG.ram[1],
      motherboard: PARTS_CATALOG.motherboard[1],
      storage: PARTS_CATALOG.storage[1],
      psu: PARTS_CATALOG.psu[1],
      cooler: PARTS_CATALOG.cooler[0],
      case: PARTS_CATALOG.case[1],
    },
  },
  {
    name: 'Build High-End',
    build: {
      cpu: PARTS_CATALOG.cpu[3],
      gpu: PARTS_CATALOG.gpu[3],
      ram: PARTS_CATALOG.ram[2],
      motherboard: PARTS_CATALOG.motherboard[1],
      storage: PARTS_CATALOG.storage[1],
      psu: PARTS_CATALOG.psu[1],
      cooler: PARTS_CATALOG.cooler[1],
      case: PARTS_CATALOG.case[1],
    },
  },
]

function PerformanceMeter({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="text-xs font-rajdhani w-8 text-right" style={{ color }}>{value}</span>
    </div>
  )
}

function GameCard({ game, build }: { game: Game; build: PCBuild }) {
  const hasCPUAndGPU = build.cpu && build.gpu && build.ram
  const compat = hasCPUAndGPU ? checkGameCompatibility(game, build) : null
  const config = compat ? COMPAT_CONFIG[compat] : null
  const perf = getBuildPerformance(build)

  return (
    <div
      className="glass-card rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{ borderColor: config ? `${config.color}30` : 'rgba(255,255,255,0.05)' }}
    >
      {/* Game header */}
      <div className="relative h-28 bg-gradient-to-br from-[#0F0F2D] to-[#1A1A3E] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Gamepad2 size={40} className="text-slate-700" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <p className="font-rajdhani font-700 text-white text-sm">{game.name}</p>
          <p className="text-slate-500 text-xs">{game.genre}</p>
        </div>
        {config && (
          <div
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-rajdhani font-600"
            style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}40` }}
          >
            {config.icon}
            {config.label}
          </div>
        )}
      </div>

      {/* Requirements */}
      <div className="p-4">
        {hasCPUAndGPU ? (
          <>
            <div className="space-y-3 mb-3">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span className="font-rajdhani tracking-wider">CPU</span>
                  <span className="text-slate-600">mín {game.requirements.min.cpu} / rec {game.requirements.recommended.cpu}</span>
                </div>
                <PerformanceMeter value={perf.cpu} color={config?.color ?? '#00D4FF'} />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span className="font-rajdhani tracking-wider">GPU</span>
                  <span className="text-slate-600">mín {game.requirements.min.gpu} / rec {game.requirements.recommended.gpu}</span>
                </div>
                <PerformanceMeter value={perf.gpu} color={config?.color ?? '#00D4FF'} />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span className="font-rajdhani tracking-wider">RAM</span>
                  <span className="text-slate-600">mín {game.requirements.min.ram} / rec {game.requirements.recommended.ram}</span>
                </div>
                <PerformanceMeter value={perf.ram} color={config?.color ?? '#00D4FF'} />
              </div>
            </div>

            {config && (
              <div
                className="mt-3 p-2 rounded-lg text-center text-xs font-rajdhani font-600 tracking-wide"
                style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}20` }}
              >
                {compat === 'ultra' && '🔥 '}
                {compat === 'recomendado' && '✅ '}
                {compat === 'mínimo' && '⚠️ '}
                {compat === 'incompatível' && '❌ '}
                {config.label}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-slate-600 text-xs font-inter">Selecione CPU, GPU e RAM para ver compatibilidade</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function JogosPage() {
  const [build, setBuild] = useState<PCBuild>(EMPTY_BUILD)
  const [activeQuickBuild, setActiveQuickBuild] = useState<number | null>(null)
  const [filterCompat, setFilterCompat] = useState<string>('all')
  const [activeCPU, setActiveCPU] = useState<string>('')
  const [activeGPU, setActiveGPU] = useState<string>('')
  const [activeRAM, setActiveRAM] = useState<string>('')

  const applyQuickBuild = (index: number) => {
    setActiveQuickBuild(index)
    const qb = QUICK_BUILDS[index].build
    setBuild(qb)
    setActiveCPU(qb.cpu?.id ?? '')
    setActiveGPU(qb.gpu?.id ?? '')
    setActiveRAM(qb.ram?.id ?? '')
  }

  const updatePart = (category: keyof PCBuild, id: string) => {
    const parts = PARTS_CATALOG[category as string] as PCPart[] | undefined
    const part = parts?.find((p) => p.id === id) ?? null
    setBuild((prev) => ({ ...prev, [category]: part }))
    setActiveQuickBuild(null)
  }

  const hasBuild = build.cpu && build.gpu && build.ram
  const perf = getBuildPerformance(build)
  const totalPrice = getBuildTotalPrice(build)

  const filteredGames = GAMES_CATALOG.filter((game) => {
    if (!hasBuild || filterCompat === 'all') return true
    return checkGameCompatibility(game, build) === filterCompat
  })

  const compatCount = hasBuild
    ? {
        ultra: GAMES_CATALOG.filter((g) => checkGameCompatibility(g, build) === 'ultra').length,
        recomendado: GAMES_CATALOG.filter((g) => checkGameCompatibility(g, build) === 'recomendado').length,
        mínimo: GAMES_CATALOG.filter((g) => checkGameCompatibility(g, build) === 'mínimo').length,
        incompatível: GAMES_CATALOG.filter((g) => checkGameCompatibility(g, build) === 'incompatível').length,
      }
    : null

  return (
    <main className="min-h-screen bg-[#05050F] grid-bg">
      <Navbar />

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#F43F5E] font-rajdhani tracking-widest text-sm uppercase mb-2">Verificador de Jogos</p>
          <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Compatibilidade de Jogos
          </h1>
          <p className="text-slate-500 font-inter mt-2 max-w-xl mx-auto">
            Selecione seu processador, placa de vídeo e memória RAM para ver quais jogos seu PC consegue rodar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ── Sidebar: Build Selector ── */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick Builds */}
            <div className="glass-card rounded-2xl p-4 border border-white/5">
              <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-3">BUILDS RÁPIDAS</p>
              <div className="space-y-2">
                {QUICK_BUILDS.map((qb, i) => (
                  <button
                    key={i}
                    onClick={() => applyQuickBuild(i)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-rajdhani tracking-wide transition-all ${
                      activeQuickBuild === i
                        ? 'bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/30'
                        : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
                    }`}
                  >
                    {qb.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Part Selection */}
            <div className="glass-card rounded-2xl p-4 border border-white/5">
              <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-3">SELECIONAR PEÇAS</p>
              <div className="space-y-3">
                {/* CPU */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-rajdhani tracking-wider">
                    <Cpu size={12} /> PROCESSADOR
                  </label>
                  <select
                    value={activeCPU}
                    onChange={(e) => { setActiveCPU(e.target.value); updatePart('cpu', e.target.value) }}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 text-sm font-inter focus:outline-none focus:border-[#00D4FF]/30"
                  >
                    <option value="">— Selecionar —</option>
                    {PARTS_CATALOG.cpu.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* GPU */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-rajdhani tracking-wider">
                    <Monitor size={12} /> PLACA DE VÍDEO
                  </label>
                  <select
                    value={activeGPU}
                    onChange={(e) => { setActiveGPU(e.target.value); updatePart('gpu', e.target.value) }}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 text-sm font-inter focus:outline-none focus:border-[#00D4FF]/30"
                  >
                    <option value="">— Selecionar —</option>
                    {PARTS_CATALOG.gpu.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* RAM */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-rajdhani tracking-wider">
                    <Zap size={12} /> MEMÓRIA RAM
                  </label>
                  <select
                    value={activeRAM}
                    onChange={(e) => { setActiveRAM(e.target.value); updatePart('ram', e.target.value) }}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 text-sm font-inter focus:outline-none focus:border-[#00D4FF]/30"
                  >
                    <option value="">— Selecionar —</option>
                    {PARTS_CATALOG.ram.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            {hasBuild && (
              <div className="glass-card rounded-2xl p-4 border border-white/5">
                <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-3">PERFORMANCE</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-rajdhani">CPU</span>
                      <span className="text-[#00D4FF] font-rajdhani">{perf.cpu}/100</span>
                    </div>
                    <PerformanceMeter value={perf.cpu} color="#00D4FF" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-rajdhani">GPU</span>
                      <span className="text-[#F43F5E] font-rajdhani">{perf.gpu}/100</span>
                    </div>
                    <PerformanceMeter value={perf.gpu} color="#F43F5E" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-rajdhani">RAM</span>
                      <span className="text-[#7C3AED] font-rajdhani">{perf.ram}/100</span>
                    </div>
                    <PerformanceMeter value={perf.ram} color="#7C3AED" />
                  </div>
                </div>

                {totalPrice > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-1">CUSTO ESTIMADO</p>
                    <p className="font-orbitron font-bold text-[#00FF94] text-lg">{formatPrice(totalPrice)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Compat Summary */}
            {compatCount && (
              <div className="glass-card rounded-2xl p-4 border border-white/5">
                <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-3">RESUMO</p>
                <div className="space-y-2">
                  {Object.entries(COMPAT_CONFIG).map(([key, cfg]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2" style={{ color: cfg.color }}>
                        {cfg.icon}
                        <span className="text-xs font-rajdhani">{cfg.label}</span>
                      </div>
                      <span className="font-orbitron font-bold text-sm" style={{ color: cfg.color }}>
                        {compatCount[key as keyof typeof compatCount]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Go to configurator */}
            <Link
              to="/configurador"
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#00D4FF]/10 to-[#7C3AED]/10 border border-[#00D4FF]/20 hover:border-[#00D4FF]/40 transition-all group"
            >
              <div>
                <p className="font-rajdhani font-600 text-white text-sm">Montar em 3D</p>
                <p className="text-slate-500 text-xs font-inter">Visualize seu PC completo</p>
              </div>
              <ChevronRight size={18} className="text-[#00D4FF] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ── Main: Game Grid ── */}
          <div className="lg:col-span-3">
            {/* Filter by compatibility */}
            {hasBuild && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setFilterCompat('all')}
                  className={`px-4 py-2 rounded-lg text-xs font-rajdhani tracking-wide transition-all ${
                    filterCompat === 'all'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-slate-500 hover:text-slate-300 border border-transparent'
                  }`}
                >
                  Todos ({GAMES_CATALOG.length})
                </button>
                {Object.entries(COMPAT_CONFIG).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => setFilterCompat(key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-rajdhani tracking-wide transition-all ${
                      filterCompat === key
                        ? 'border'
                        : 'text-slate-500 hover:text-slate-300 border border-transparent'
                    }`}
                    style={
                      filterCompat === key
                        ? { background: cfg.bg, color: cfg.color, borderColor: `${cfg.color}40` }
                        : {}
                    }
                  >
                    {cfg.icon}
                    {cfg.label} ({compatCount?.[key as keyof typeof compatCount] ?? '—'})
                  </button>
                ))}
              </div>
            )}

            {/* No build selected banner */}
            {!hasBuild && (
              <div className="glass-card rounded-2xl p-8 border border-white/5 text-center mb-6">
                <Gamepad2 size={40} className="text-slate-700 mx-auto mb-4" />
                <h3 className="font-rajdhani font-600 text-white text-lg mb-2">Selecione suas peças</h3>
                <p className="text-slate-500 font-inter text-sm">
                  Escolha CPU, GPU e RAM no painel ao lado ou use uma das builds rápidas para ver a compatibilidade com os jogos.
                </p>
              </div>
            )}

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} build={build} />
              ))}
            </div>

            {filteredGames.length === 0 && hasBuild && (
              <div className="text-center py-16">
                <XCircle size={40} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-inter">Nenhum jogo nessa categoria de compatibilidade.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
