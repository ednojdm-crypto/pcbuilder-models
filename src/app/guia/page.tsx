'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Globe, Github, Server, CircleCheck as CheckCircle, Copy, ExternalLink, ChevronDown, ChevronUp, Terminal, Zap, Database } from 'lucide-react'

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative mt-3 mb-2 rounded-xl overflow-hidden border border-white/5">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
        <span className="text-xs text-slate-600 font-rajdhani tracking-wider">{lang.toUpperCase()}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#00D4FF] transition-colors font-inter"
        >
          <Copy size={12} />
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre className="p-4 text-sm text-[#00FF94] font-mono overflow-x-auto bg-black/20">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Step({ number, title, color, children }: {
  number: number; title: string; color: string; children: React.ReactNode
}) {
  const [open, setOpen] = useState(number <= 2)

  return (
    <div
      className="glass-card rounded-2xl border overflow-hidden transition-all"
      style={{ borderColor: open ? `${color}30` : 'rgba(255,255,255,0.05)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-orbitron font-bold text-sm flex-shrink-0"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
        >
          {number}
        </div>
        <h3 className="flex-1 font-rajdhani font-600 text-white text-base tracking-wide">{title}</h3>
        {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 text-slate-400 font-inter text-sm leading-relaxed space-y-3">
          {children}
        </div>
      )}
    </div>
  )
}

const PLATFORM_TABS = [
  { id: 'vercel', label: 'Vercel (Recomendado)', icon: <Zap size={16} />, color: '#00D4FF' },
  { id: 'cloudflare', label: 'Cloudflare Pages', icon: <Globe size={16} />, color: '#F97316' },
  { id: 'github', label: 'GitHub Pages', icon: <Github size={16} />, color: '#7C3AED' },
]

const VERCEL_STEPS = [
  {
    number: 1,
    title: 'Criar conta no GitHub',
    color: '#00D4FF',
    content: (
      <>
        <p>Primeiro, crie uma conta gratuita no GitHub — onde seu código ficará armazenado.</p>
        <div className="flex gap-3 mt-3">
          <a
            href="https://github.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-rajdhani transition-all hover:opacity-80"
            style={{ background: '#00D4FF15', color: '#00D4FF', border: '1px solid #00D4FF30' }}
          >
            <Github size={14} /> Criar conta no GitHub
            <ExternalLink size={12} />
          </a>
        </div>
      </>
    ),
  },
  {
    number: 2,
    title: 'Subir o código para o GitHub',
    color: '#7C3AED',
    content: (
      <>
        <p>Crie um novo repositório no GitHub e suba os arquivos do projeto. Pelo terminal na pasta do projeto:</p>
        <CodeBlock
          code={`git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/buildpc-brasil.git
git push -u origin main`}
        />
        <p className="text-slate-500 text-xs">Substitua <code className="text-[#00D4FF]">SEU_USUARIO</code> pelo seu usuário do GitHub.</p>
      </>
    ),
  },
  {
    number: 3,
    title: 'Criar conta na Vercel',
    color: '#00FF94',
    content: (
      <>
        <p>Acesse a Vercel e crie uma conta gratuita usando sua conta do GitHub. Isso conecta os dois automaticamente.</p>
        <a
          href="https://vercel.com/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg text-sm font-rajdhani transition-all hover:opacity-80"
          style={{ background: '#00FF9415', color: '#00FF94', border: '1px solid #00FF9430' }}
        >
          <Zap size={14} /> Criar conta na Vercel
          <ExternalLink size={12} />
        </a>
      </>
    ),
  },
  {
    number: 4,
    title: 'Importar o projeto na Vercel',
    color: '#F43F5E',
    content: (
      <>
        <p>No painel da Vercel:</p>
        <ol className="list-none space-y-2 mt-2">
          {[
            'Clique em "Add New Project"',
            'Selecione o repositório "buildpc-brasil"',
            'A Vercel detecta Next.js automaticamente',
            'Clique em "Deploy"',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-orbitron flex-shrink-0 mt-0.5" style={{ background: '#F43F5E15', color: '#F43F5E', border: '1px solid #F43F5E30' }}>
                {i + 1}
              </div>
              <span className="text-slate-400">{item}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-slate-500">Em 1-2 minutos seu site estará no ar!</p>
      </>
    ),
  },
  {
    number: 5,
    title: 'Seu site está no ar!',
    color: '#00FF94',
    content: (
      <>
        <p>A Vercel vai gerar um link gratuito no formato:</p>
        <div className="mt-2 px-4 py-3 rounded-xl font-mono text-[#00D4FF] text-sm" style={{ background: '#00D4FF08', border: '1px solid #00D4FF20' }}>
          https://buildpc-brasil.vercel.app
        </div>
        <p className="mt-3">A partir de agora, cada vez que você fizer <code className="text-[#00D4FF]">git push</code>, o site é atualizado automaticamente!</p>

        <div className="mt-4 p-4 rounded-xl space-y-2" style={{ background: '#00FF9408', border: '1px solid #00FF9420' }}>
          <p className="text-[#00FF94] font-rajdhani font-600">✅ Plano Hobby (Gratuito) inclui:</p>
          {['Domínio .vercel.app gratuito', 'HTTPS automático', 'Deploy automático via Git', 'Funções serverless (APIs)', '100GB de bandwidth/mês'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-slate-400 text-xs">
              <CheckCircle size={12} className="text-[#00FF94]" />
              {item}
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    number: 6,
    title: '(Opcional) Domínio personalizado',
    color: '#F59E0B',
    content: (
      <>
        <p>Quer um domínio como <span className="text-[#00D4FF]">buildpcbrasil.com.br</span>? Opções:</p>
        <div className="space-y-3 mt-3">
          <div className="p-3 rounded-xl" style={{ background: '#F59E0B08', border: '1px solid #F59E0B20' }}>
            <p className="text-[#F59E0B] font-rajdhani font-600 text-sm mb-1">Registro.br — R$ 40/ano</p>
            <p className="text-slate-500 text-xs">Domínio .com.br oficial e barato. Após registrar, configure o DNS apontando para a Vercel.</p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: '#00D4FF08', border: '1px solid #00D4FF20' }}>
            <p className="text-[#00D4FF] font-rajdhani font-600 text-sm mb-1">Namecheap — US$ 8-12/ano</p>
            <p className="text-slate-500 text-xs">Domínio .com internacional. Interface simples e suporte ao DNS da Vercel.</p>
          </div>
        </div>
        <p className="mt-3 text-slate-500 text-xs">Após comprar, vá em <strong className="text-slate-300">Vercel → Project → Domains</strong> e adicione seu domínio.</p>
        <CodeBlock code={`# Configuração DNS no seu provedor de domínio:
CNAME  www   cname.vercel-dns.com
A      @     76.76.21.21`} lang="dns" />
      </>
    ),
  },
]

const HOSTING_FILES_STEPS = [
  {
    title: 'Hospedar arquivos .glb no Cloudflare R2',
    color: '#F97316',
    steps: [
      'Crie conta gratuita em cloudflare.com',
      'Acesse R2 Object Storage no painel',
      'Crie um Bucket chamado "pc-parts-models"',
      'Faça upload dos seus arquivos .glb',
      'Configure acesso público ao bucket',
      'Use a URL gerada no código (ex: r2.dev/pc-parts-models/cpu.glb)',
    ],
  },
]

export default function GuiaPage() {
  const [activePlatform, setActivePlatform] = useState('vercel')

  return (
    <main className="min-h-screen bg-[#05050F] grid-bg">
      <Navbar />

      <div className="pt-24 pb-16 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#00FF94] font-rajdhani tracking-widest text-sm uppercase mb-2">Passo a Passo</p>
          <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Hospedar seu Site de Graça
          </h1>
          <p className="text-slate-500 font-inter mt-3 max-w-xl mx-auto">
            Guia completo para colocar o BuildPC Brasil no ar gratuitamente, incluindo onde guardar os modelos 3D.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: <Github size={22} />, title: 'GitHub', desc: 'Armazena seu código-fonte gratuitamente', color: '#7C3AED' },
            { icon: <Zap size={22} />, title: 'Vercel', desc: 'Hospeda o site com deploy automático', color: '#00D4FF' },
            { icon: <Server size={22} />, title: 'Cloudflare R2', desc: 'Guarda os arquivos 3D (.glb) na CDN', color: '#F97316' },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-5 border border-white/5 text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${item.color}15`, color: item.color }}
              >
                {item.icon}
              </div>
              <h3 className="font-rajdhani font-700 text-white mb-1">{item.title}</h3>
              <p className="text-slate-500 text-xs font-inter">{item.desc}</p>
              <span
                className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-rajdhani"
                style={{ background: `${item.color}10`, color: item.color }}
              >
                GRÁTIS
              </span>
            </div>
          ))}
        </div>

        {/* Section 1: Deploy do Site */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center">
              <Globe size={18} className="text-[#00D4FF]" />
            </div>
            <h2 className="font-orbitron font-bold text-xl text-white">Parte 1 — Hospedar o Site</h2>
          </div>

          {/* Platform Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {PLATFORM_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePlatform(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-rajdhani tracking-wide transition-all ${
                  activePlatform === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
                style={
                  activePlatform === tab.id
                    ? { background: `${tab.color}15`, border: `1px solid ${tab.color}40`, color: tab.color }
                    : { border: '1px solid rgba(255,255,255,0.05)' }
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {activePlatform === 'vercel' && (
            <div className="space-y-3">
              {VERCEL_STEPS.map((step) => (
                <Step key={step.number} number={step.number} title={step.title} color={step.color}>
                  {step.content}
                </Step>
              ))}
            </div>
          )}

          {activePlatform === 'cloudflare' && (
            <div className="space-y-3">
              <Step number={1} title="Crie conta na Cloudflare" color="#F97316">
                <p>Acesse <a href="https://cloudflare.com" className="text-[#F97316]" target="_blank" rel="noopener noreferrer">cloudflare.com</a> e crie uma conta gratuita.</p>
              </Step>
              <Step number={2} title="Conecte o repositório GitHub" color="#F97316">
                <p>No painel Cloudflare, vá em <strong className="text-white">Pages → Create a project</strong> e conecte seu repositório GitHub.</p>
              </Step>
              <Step number={3} title="Configure o build" color="#F97316">
                <p>Nas configurações de build:</p>
                <CodeBlock code={`Framework preset: Next.js
Build command: npm run build
Build output directory: .next`} lang="config" />
              </Step>
              <Step number={4} title="Deploy!" color="#F97316">
                <p>Clique em <strong className="text-white">Save and Deploy</strong>. Você receberá um URL no formato <code className="text-[#F97316]">buildpc-brasil.pages.dev</code></p>
              </Step>
            </div>
          )}

          {activePlatform === 'github' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl" style={{ background: '#F59E0B08', border: '1px solid #F59E0B20' }}>
                <p className="text-[#F59E0B] font-rajdhani font-600 text-sm mb-1">⚠️ Limitação importante</p>
                <p className="text-slate-400 text-sm font-inter">GitHub Pages só funciona bem com sites estáticos. Como o BuildPC Brasil usa Next.js com API Routes, recomendamos Vercel ou Cloudflare Pages.</p>
              </div>
              <Step number={1} title="Exportar como site estático" color="#7C3AED">
                <p>No <code className="text-[#00D4FF]">next.config.js</code>, adicione:</p>
                <CodeBlock code={`const nextConfig = {
  output: 'export',
  trailingSlash: true,
}`} lang="js" />
              </Step>
              <Step number={2} title="Ativar GitHub Pages" color="#7C3AED">
                <p>No seu repositório GitHub, vá em <strong className="text-white">Settings → Pages</strong> e selecione a branch <code className="text-[#00D4FF]">main</code> como source.</p>
              </Step>
            </div>
          )}
        </div>

        {/* Section 2: Arquivos .glb */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center">
              <Database size={18} className="text-[#F97316]" />
            </div>
            <h2 className="font-orbitron font-bold text-xl text-white">Parte 2 — Hospedar Modelos 3D (.glb)</h2>
          </div>

          <div className="space-y-3">
            <Step number={1} title="Criar conta no Cloudflare R2" color="#F97316">
              <p>O Cloudflare R2 oferece 10GB gratuitos por mês — mais que suficiente para os modelos 3D das peças.</p>
              <a href="https://cloudflare.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg text-sm font-rajdhani" style={{ background: '#F9731615', color: '#F97316', border: '1px solid #F9731630' }}>
                <ExternalLink size={12} /> Acessar Cloudflare
              </a>
            </Step>

            <Step number={2} title="Criar o Bucket R2" color="#F97316">
              <p>No painel da Cloudflare:</p>
              <ol className="space-y-1 mt-2">
                {['Clique em R2 no menu lateral', 'Clique em "Create Bucket"', 'Nome: pc-parts-models', 'Clique em "Create"'].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="text-[#F97316] text-xs font-orbitron">{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>
            </Step>

            <Step number={3} title="Fazer upload dos arquivos .glb" color="#F97316">
              <p>Arraste e solte seus arquivos <code className="text-[#00D4FF]">.glb</code> dentro do bucket criado. Exemplo de organização:</p>
              <CodeBlock code={`pc-parts-models/
├── cpu/
│   ├── ryzen-5-5600x.glb
│   └── i7-13700k.glb
├── gpu/
│   ├── rtx-4060.glb
│   └── rtx-4070.glb
├── ram/
│   └── corsair-16gb.glb
└── case/
    └── nzxt-h510.glb`} lang="estrutura" />
            </Step>

            <Step number={4} title="Ativar acesso público" color="#F97316">
              <p>No bucket, vá em <strong className="text-white">Settings → Public Access</strong> e ative o R2.dev subdomain. Você receberá uma URL base como:</p>
              <div className="mt-2 px-4 py-3 rounded-xl font-mono text-[#F97316] text-sm" style={{ background: '#F9731608', border: '1px solid #F9731620' }}>
                https://pub-xxxxxxxx.r2.dev
              </div>
            </Step>

            <Step number={5} title="Usar os modelos no código" color="#F97316">
              <p>No configurador 3D, substitua o caminho local pela URL do R2:</p>
              <CodeBlock code={`// Em src/data/parts.ts, troque o campo image:
{
  id: 'rtx-4060',
  name: 'GeForce RTX 4060',
  // Antes (local, só dev):
  // image: '/parts/gpu-rtx4060.png',
  
  // Depois (R2, produção):
  image: 'https://pub-SEU_ID.r2.dev/gpu/rtx-4060.glb',
}

// No componente 3D, usar useGLTF do @react-three/drei:
import { useGLTF } from '@react-three/drei'

function GPUModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}`} lang="typescript" />
            </Step>
          </div>
        </div>

        {/* Section 3: Price Updates */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#00FF94]/10 flex items-center justify-center">
              <Terminal size={18} className="text-[#00FF94]" />
            </div>
            <h2 className="font-orbitron font-bold text-xl text-white">Parte 3 — Atualização Diária de Preços</h2>
          </div>

          <div className="space-y-3">
            <Step number={1} title="Criar banco de dados gratuito (Supabase)" color="#00FF94">
              <p>O Supabase oferece um banco PostgreSQL gratuito para armazenar os preços.</p>
              <ol className="space-y-1 mt-2">
                {['Crie conta em supabase.com', 'Crie um novo projeto', 'Copie a DATABASE_URL nas configurações', 'Crie a tabela de preços:'].map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="text-[#00FF94] text-xs font-orbitron">{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>
              <CodeBlock code={`CREATE TABLE prices (
  id        SERIAL PRIMARY KEY,
  part_id   TEXT NOT NULL,
  store     TEXT NOT NULL,
  price     DECIMAL(10,2),
  url       TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);`} lang="sql" />
            </Step>

            <Step number={2} title="Script de scraping (GitHub Actions)" color="#00FF94">
              <p>Crie o arquivo <code className="text-[#00D4FF]">.github/workflows/update-prices.yml</code>:</p>
              <CodeBlock code={`name: Atualizar Preços Diariamente

on:
  schedule:
    - cron: '0 9 * * *'  # Todo dia às 6h (BRT = UTC-3)
  workflow_dispatch:      # Permite rodar manualmente

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node scripts/update-prices.js
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}`} lang="yaml" />
            </Step>

            <Step number={3} title="Script Node.js de coleta de preços" color="#00FF94">
              <p>Crie o arquivo <code className="text-[#00D4FF]">scripts/update-prices.js</code>:</p>
              <CodeBlock code={`// Exemplo básico com fetch (sem scraping pesado)
// Para produção, use Puppeteer ou API de afiliados

const PARTS = [
  { id: 'rtx-4060', kabumId: '123456', terabyteId: '789' },
  // ... outras peças
]

async function fetchPrice(storeUrl) {
  // Lógica de scraping ou API aqui
  // Retorna o preço como número
}

async function main() {
  for (const part of PARTS) {
    const kabumPrice = await fetchPrice(\`https://kabum.com.br/produto/\${part.kabumId}\`)
    
    // Salva no banco
    await fetch(process.env.SUPABASE_URL + '/rest/v1/prices', {
      method: 'POST',
      headers: {
        'apikey': process.env.SUPABASE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        part_id: part.id,
        store: 'kabum',
        price: kabumPrice,
      })
    })
    
    console.log(\`✅ \${part.id} - Kabum: R$ \${kabumPrice}\`)
  }
}

main().catch(console.error)`} lang="javascript" />
            </Step>

            <Step number={4} title="Configurar variáveis de ambiente na Vercel" color="#00FF94">
              <p>No painel da Vercel, vá em <strong className="text-white">Project → Settings → Environment Variables</strong> e adicione:</p>
              <CodeBlock code={`DATABASE_URL=postgresql://...seu-supabase-url...
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_URL=https://xxxx.supabase.co`} lang="env" />
              <p className="text-slate-500 text-xs mt-2">⚠️ Nunca coloque essas chaves diretamente no código. Sempre use variáveis de ambiente.</p>
            </Step>
          </div>
        </div>

        {/* Final Summary */}
        <div className="glass-card rounded-2xl p-8 border border-[#00FF94]/15 text-center">
          <CheckCircle size={40} className="text-[#00FF94] mx-auto mb-4" />
          <h2 className="font-orbitron font-bold text-2xl text-white mb-3">Resumo dos Custos</h2>
          <p className="text-slate-500 font-inter mb-6">Tudo que você precisa para rodar o BuildPC Brasil</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              { service: 'GitHub', plan: 'Free', cost: 'R$ 0/mês', feature: 'Código-fonte', color: '#7C3AED' },
              { service: 'Vercel', plan: 'Hobby', cost: 'R$ 0/mês', feature: 'Hospedagem do site', color: '#00D4FF' },
              { service: 'Cloudflare R2', plan: 'Free (10GB)', cost: 'R$ 0/mês', feature: 'Modelos 3D .glb', color: '#F97316' },
              { service: 'Supabase', plan: 'Free', cost: 'R$ 0/mês', feature: 'Banco de dados', color: '#00FF94' },
              { service: 'GitHub Actions', plan: 'Free (2000 min)', cost: 'R$ 0/mês', feature: 'Scraping diário', color: '#F43F5E' },
              { service: 'Domínio .com.br', plan: 'Registro.br', cost: '~R$ 40/ano', feature: 'Endereço próprio', color: '#F59E0B' },
            ].map((item) => (
              <div
                key={item.service}
                className="p-4 rounded-xl"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-rajdhani font-600 text-white text-sm">{item.service}</p>
                  <span className="font-orbitron font-bold text-xs" style={{ color: item.color }}>
                    {item.cost}
                  </span>
                </div>
                <p className="text-slate-500 text-xs font-inter">{item.feature}</p>
                <p className="text-xs mt-1 font-rajdhani" style={{ color: item.color }}>{item.plan}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl" style={{ background: '#00FF9408', border: '1px solid #00FF9420' }}>
            <p className="font-orbitron font-bold text-[#00FF94] text-xl">Total: R$ 0/mês</p>
            <p className="text-slate-500 text-sm font-inter mt-1">(ou ~R$ 3,33/mês se quiser o domínio .com.br)</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
