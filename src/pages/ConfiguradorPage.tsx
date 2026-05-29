import { useState, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Box, Cylinder, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { PARTS_CATALOG, PCBuild, PCPart, getLowestPrice, formatPrice, getBuildTotalPrice } from '@/data/parts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ShoppingCart, ChevronRight, RotateCcw, ExternalLink, Cpu, HardDrive, Zap, Server, Box as BoxIcon, Wind, Monitor } from 'lucide-react'

function PCCase({ build }: { build: PCBuild }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  const hasGPU = !!build.gpu
  const hasCPU = !!build.cpu
  const hasRAM = !!build.ram
  const hasCooler = !!build.cooler

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <RoundedBox args={[2.2, 3.5, 2.8]} radius={0.08} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0A0A1E" metalness={0.9} roughness={0.1} />
      </RoundedBox>

      <RoundedBox args={[0.04, 3.3, 2.6]} radius={0.02} position={[1.12, 0, 0]}>
        <meshStandardMaterial color="#00D4FF" transparent opacity={0.08} metalness={0.5} roughness={0} />
      </RoundedBox>

      <Box args={[0.05, 2.4, 2.0]} position={[0.6, 0, 0]}>
        <meshStandardMaterial color="#1A1A3E" metalness={0.6} roughness={0.4} />
      </Box>

      {hasCPU && (
        <group position={[0.55, 0.5, 0.2]}>
          <Box args={[0.04, 0.35, 0.35]}>
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
          </Box>
          {hasCooler && (
            <group>
              <Box args={[0.08, 0.5, 0.5]} position={[0, 0.4, 0]}>
                <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
              </Box>
              <Cylinder args={[0.2, 0.2, 0.04, 16]} position={[0.06, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
              </Cylinder>
            </group>
          )}
        </group>
      )}

      {hasRAM && (
        <>
          <Box args={[0.04, 0.8, 0.06]} position={[0.55, 0.5, -0.1]}>
            <meshStandardMaterial color="#1E1E6E" metalness={0.7} roughness={0.3} emissive="#7C3AED" emissiveIntensity={0.3} />
          </Box>
          <Box args={[0.04, 0.8, 0.06]} position={[0.55, 0.5, -0.18]}>
            <meshStandardMaterial color="#1E1E6E" metalness={0.7} roughness={0.3} emissive="#7C3AED" emissiveIntensity={0.3} />
          </Box>
        </>
      )}

      {hasGPU && (
        <group position={[0.5, -0.4, 0]}>
          <Box args={[0.08, 0.28, 1.2]}>
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </Box>
          <Cylinder args={[0.1, 0.1, 0.04, 16]} position={[0.07, 0, 0.3]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
          </Cylinder>
          <Cylinder args={[0.1, 0.1, 0.04, 16]} position={[0.07, 0, -0.3]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
          </Cylinder>
          <Box args={[0.02, 0.02, 1.2]} position={[0.05, -0.15, 0]}>
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.5} />
          </Box>
        </group>
      )}

      {build.storage && (
        <Box args={[0.04, 0.08, 0.22]} position={[0.55, -0.9, 0.3]}>
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </Box>
      )}

      {build.psu && (
        <Box args={[0.4, 0.35, 0.7]} position={[0, -1.4, -0.5]}>
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </Box>
      )}

      <Box args={[0.01, 3.3, 0.01]} position={[0.95, 0, 1.35]}>
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2} />
      </Box>
      <Box args={[0.01, 3.3, 0.01]} position={[0.95, 0, -1.35]}>
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={2} />
      </Box>

      <Box args={[0.15, 3.5, 2.8]} position={[-1.0, 0, 0]}>
        <meshStandardMaterial color="#050510" metalness={0.95} roughness={0.05} />
      </Box>

      <Cylinder args={[0.05, 0.05, 0.06, 16]} position={[-1.09, 1.4, -0.9]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1} />
      </Cylinder>
    </group>
  )
}

function EmptySlotCube({ color = '#7C3AED' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
    }
  })
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial color={color} wireframe opacity={0.3} transparent />
    </mesh>
  )
}

const CATEGORIES = [
  { key: 'cpu', label: 'Processador', icon: <Cpu size={16} />, color: '#00D4FF' },
  { key: 'gpu', label: 'Placa de Vídeo', icon: <Monitor size={16} />, color: '#F43F5E' },
  { key: 'ram', label: 'Memória RAM', icon: <Server size={16} />, color: '#7C3AED' },
  { key: 'motherboard', label: 'Placa-Mãe', icon: <Zap size={16} />, color: '#00FF94' },
  { key: 'storage', label: 'Armazenamento', icon: <HardDrive size={16} />, color: '#F59E0B' },
  { key: 'psu', label: 'Fonte', icon: <Zap size={16} />, color: '#EC4899' },
  { key: 'cooler', label: 'Cooler', icon: <Wind size={16} />, color: '#06B6D4' },
  { key: 'case', label: 'Gabinete', icon: <BoxIcon size={16} />, color: '#8B5CF6' },
] as const

type CategoryKey = typeof CATEGORIES[number]['key']

const EMPTY_BUILD: PCBuild = {
  cpu: null, gpu: null, ram: null, motherboard: null,
  storage: null, psu: null, cooler: null, case: null,
}

function PriceCard({ part }: { part: PCPart }) {
  const lowestStore = getLowestPrice(part)
  const prices = [
    { store: 'Kabum', price: part.prices.kabum, url: part.urls.kabum, color: '#F97316' },
    { store: 'Terabyte', price: part.prices.terabyte, url: part.urls.terabyte, color: '#3B82F6' },
    { store: 'Pichau', price: part.prices.pichau, url: part.urls.pichau, color: '#10B981' },
  ]

  return (
    <div className="glass-card rounded-xl p-4 border border-white/5 mt-3">
      <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-3">COMPARAR PREÇOS</p>
      <div className="space-y-2">
        {prices.map((p) => {
          const isLowest = lowestStore?.store === p.store
          return (
            <a
              key={p.store}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg transition-all hover:bg-white/5"
              style={{
                background: isLowest ? `${p.color}10` : 'transparent',
                border: `1px solid ${isLowest ? p.color + '30' : 'transparent'}`,
              }}
            >
              <div className="flex items-center gap-2">
                {isLowest && <span className="text-[#00FF94] text-xs">&#10003;</span>}
                <span className="font-rajdhani text-sm" style={{ color: isLowest ? p.color : '#94A3B8' }}>
                  {p.store}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-rajdhani font-600 text-sm ${isLowest ? 'text-[#00FF94]' : 'text-slate-300'}`}>
                  {p.price ? formatPrice(p.price) : 'Indisponível'}
                </span>
                <ExternalLink size={10} className="text-slate-600" />
              </div>
            </a>
          )
        })}
      </div>
      <p className="text-slate-700 text-xs mt-2 font-inter">* Preços atualizados diariamente</p>
    </div>
  )
}

export default function ConfiguradorPage() {
  const [build, setBuild] = useState<PCBuild>(EMPTY_BUILD)
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('cpu')
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null)

  const currentParts = PARTS_CATALOG[activeCategory] || []
  const totalPrice = getBuildTotalPrice(build)

  const selectPart = (part: PCPart) => {
    setBuild((prev) => ({ ...prev, [part.category]: part }))
    setSelectedPartId(part.id)
  }

  const resetBuild = () => {
    setBuild(EMPTY_BUILD)
    setSelectedPartId(null)
  }

  const currentCategory = CATEGORIES.find((c) => c.key === activeCategory)

  return (
    <main className="min-h-screen bg-[#05050F] grid-bg">
      <Navbar />

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[#00D4FF] font-rajdhani tracking-widest text-sm uppercase mb-2">Configurador</p>
          <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white">Monte seu PC em 3D</h1>
          <p className="text-slate-500 font-inter mt-2">Selecione as peças e veja seu PC ganhar vida</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Category Selector + Parts */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-2xl p-3 border border-white/5">
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => {
                  const hasPart = !!build[cat.key]
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all text-sm font-rajdhani font-500 tracking-wide ${
                        activeCategory === cat.key
                          ? 'text-white'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      style={
                        activeCategory === cat.key
                          ? { background: `${cat.color}15`, border: `1px solid ${cat.color}40`, color: cat.color }
                          : { border: '1px solid transparent' }
                      }
                    >
                      <span style={{ color: hasPart ? cat.color : undefined }}>{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                      {hasPart && (
                        <span className="ml-auto w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-slate-500 text-xs font-rajdhani tracking-wider px-1">
                ESCOLHER {currentCategory?.label.toUpperCase()}
              </p>
              {currentParts.map((part) => {
                const isSelected = build[activeCategory]?.id === part.id
                const lowest = getLowestPrice(part)
                return (
                  <div key={part.id}>
                    <button
                      onClick={() => selectPart(part)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        isSelected ? 'component-card-active' : 'glass-card border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-rajdhani font-600 text-white text-sm">{part.name}</p>
                          <p className="text-slate-500 text-xs font-inter mt-0.5">{part.specs}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[#00FF94] font-rajdhani font-600 text-sm">
                            {lowest ? formatPrice(lowest.price) : '—'}
                          </p>
                          {lowest && (
                            <p className="text-slate-600 text-xs">{lowest.store}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>Performance</span>
                          <span>{part.performance}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${part.performance}%`,
                              background: `linear-gradient(90deg, ${currentCategory?.color}, ${currentCategory?.color}80)`,
                            }}
                          />
                        </div>
                      </div>
                    </button>

                    {isSelected && <PriceCard part={part} />}
                  </div>
                )
              })}
            </div>
          </div>

          {/* CENTER: 3D Viewer */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl border border-white/5 overflow-hidden sticky top-24">
              <div className="h-80 md:h-96 relative">
                <Canvas camera={{ position: [5, 2, 5], fov: 45 }} shadows>
                  <ambientLight intensity={0.2} />
                  <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
                  <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7C3AED" />
                  <spotLight position={[0, 10, 0]} intensity={0.8} castShadow />
                  <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                      <PCCase build={build} />
                    </Float>
                    <Environment preset="night" />
                  </Suspense>
                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={4}
                    maxDistance={10}
                    autoRotate={false}
                  />
                </Canvas>
                <div className="absolute bottom-3 left-3 text-slate-600 text-xs font-inter">
                  Arraste para girar | Scroll para zoom
                </div>
              </div>

              <div className="p-5 border-t border-white/5">
                <div className="space-y-2 mb-4">
                  {CATEGORIES.map((cat) => {
                    const part = build[cat.key]
                    return (
                      <div key={cat.key} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 font-rajdhani text-xs tracking-wide">{cat.label}</span>
                        <span className="text-slate-300 font-inter text-xs truncate max-w-[140px]">
                          {part ? part.name : <span className="text-slate-700">— não selecionado</span>}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between mb-4">
                  <span className="font-rajdhani text-slate-400 tracking-wide text-sm">TOTAL ESTIMADO</span>
                  <span className="font-orbitron font-bold text-[#00FF94] text-lg">
                    {totalPrice > 0 ? formatPrice(totalPrice) : '—'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={resetBuild}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm font-rajdhani transition-all hover:border-white/20"
                  >
                    <RotateCcw size={14} />
                    Resetar
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-white font-rajdhani font-600 text-sm tracking-wide hover:opacity-90 transition-all">
                    <ShoppingCart size={14} />
                    Ver Compras
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Info + Power Calc */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-2xl p-5 border border-white/5">
              <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-4">CONSUMO DE ENERGIA</p>
              {(() => {
                const totalPower = Object.values(build)
                  .filter(Boolean)
                  .reduce((sum, p) => sum + (p as PCPart).power, 0)
                const recommended = Math.ceil((totalPower * 1.2) / 50) * 50
                return (
                  <>
                    <div className="flex items-end gap-2 mb-3">
                      <span className="font-orbitron font-bold text-3xl text-white">{totalPower}W</span>
                      <span className="text-slate-500 text-sm mb-1 font-inter">consumo estimado</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((totalPower / 600) * 100, 100)}%`,
                          background: totalPower > 450 ? '#F43F5E' : totalPower > 300 ? '#F59E0B' : '#00FF94',
                        }}
                      />
                    </div>
                    {totalPower > 0 && (
                      <p className="text-slate-500 text-xs font-inter">
                        Fonte mínima recomendada: <span className="text-[#00D4FF]">{recommended}W</span>
                      </p>
                    )}
                  </>
                )
              })()}
            </div>

            {build[activeCategory] && (
              <div className="glass-card rounded-2xl p-5 border border-white/5">
                <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-3">PEÇA SELECIONADA</p>
                <h3 className="font-rajdhani font-700 text-white text-lg mb-1">
                  {build[activeCategory]!.name}
                </h3>
                <p className="text-[#7C3AED] text-sm font-inter mb-3">{build[activeCategory]!.brand}</p>
                <p className="text-slate-400 text-sm font-inter leading-relaxed">
                  {build[activeCategory]!.specs}
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[#00D4FF]/5 border border-[#00D4FF]/10">
                  <p className="text-xs text-slate-600 mb-1 font-rajdhani">MELHOR PREÇO</p>
                  {(() => {
                    const lowest = getLowestPrice(build[activeCategory]!)
                    return lowest ? (
                      <p className="text-[#00FF94] font-orbitron font-bold text-xl">
                        {formatPrice(lowest.price)}
                        <span className="text-slate-500 text-xs font-inter ml-2">no {lowest.store}</span>
                      </p>
                    ) : null
                  })()}
                </div>
              </div>
            )}

            <div className="glass-card rounded-2xl p-5 border border-white/5">
              <p className="text-slate-500 text-xs font-rajdhani tracking-wider mb-3">DICAS DE COMPATIBILIDADE</p>
              <div className="space-y-3">
                {!build.cpu && (
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B] mt-1.5 flex-shrink-0" />
                    <p className="text-slate-400 font-inter text-xs">Selecione um processador primeiro para verificar compatibilidade com a placa-mãe</p>
                  </div>
                )}
                {build.cpu && !build.motherboard && (
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#F43F5E] mt-1.5 flex-shrink-0" />
                    <p className="text-slate-400 font-inter text-xs">Escolha uma placa-mãe compatível com seu processador {build.cpu.brand}</p>
                  </div>
                )}
                {build.cpu && build.gpu && !build.psu && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B] mt-1.5 flex-shrink-0" />
                    <p className="text-slate-400 font-inter text-xs">Lembre de adicionar uma fonte com potência adequada para CPU + GPU</p>
                  </div>
                )}
                {Object.values(build).every(Boolean) && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00FF94] mt-1.5 flex-shrink-0" />
                    <p className="text-[#00FF94] font-inter text-xs">Build completa! Veja a compatibilidade com jogos</p>
                  </div>
                )}
                {Object.values(build).every((v) => !v) && (
                  <p className="text-slate-600 text-xs font-inter">Selecione as peças para ver dicas de compatibilidade</p>
                )}
              </div>
            </div>

            <Link
              to="/jogos"
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#F43F5E]/10 to-[#7C3AED]/10 border border-[#F43F5E]/20 hover:border-[#F43F5E]/40 transition-all group"
            >
              <div>
                <p className="font-rajdhani font-600 text-white text-sm">Ver Compatibilidade de Jogos</p>
                <p className="text-slate-500 text-xs font-inter">Descubra o que seu PC pode rodar</p>
              </div>
              <ChevronRight size={18} className="text-[#F43F5E] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
