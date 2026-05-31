import Link from 'next/link'
import { Cpu, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center">
                <Cpu size={16} className="text-white" />
              </div>
              <span className="font-orbitron font-bold text-white text-lg">
                BUILD<span className="text-[#00D4FF]">PC</span>
                <span className="text-xs font-rajdhani text-[#7C3AED] ml-1">BRASIL</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm font-inter leading-relaxed max-w-xs">
              Monte seu PC dos sonhos em 3D, compare preços em tempo real e descubra quais jogos você pode rodar.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-500 hover:text-[#00D4FF] transition-colors">
                <Github size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-slate-500 hover:text-[#00D4FF] transition-colors">
                <Twitter size={15} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-rajdhani font-600 text-white mb-4 tracking-wider text-sm">NAVEGAÇÃO</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/configurador', label: 'Configurador 3D' },
                { href: '/precos', label: 'Comparar Preços' },
                { href: '/jogos', label: 'Compatibilidade' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-[#00D4FF] text-sm font-inter transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-rajdhani font-600 text-white mb-4 tracking-wider text-sm">LOJAS PARCEIRAS</h4>
            <ul className="space-y-2">
              {[
                { href: 'https://www.kabum.com.br', label: 'Kabum' },
                { href: 'https://www.terabyteshop.com.br', label: 'Terabyte Shop' },
                { href: 'https://www.pichau.com.br', label: 'Pichau' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#00D4FF] text-sm font-inter transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-xs font-inter">
            © 2024 BuildPC Brasil. Preços atualizados diariamente. Pode haver variações.
          </p>
          <p className="text-slate-700 text-xs font-inter">
            Feito com 💜 para gamers brasileiros
          </p>
        </div>
      </div>
    </footer>
  )
}
