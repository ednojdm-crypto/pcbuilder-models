import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BuildPC Brasil — Monte Seu PC dos Sonhos',
  description: 'Monte seu PC em 3D, compare preços em tempo real nas maiores lojas do Brasil e descubra quais jogos você pode rodar.',
  keywords: 'montar pc, comparar preços pc, kabum, terabyte, pichau, pc gamer brasil',
  openGraph: {
    title: 'BuildPC Brasil',
    description: 'Monte seu PC em 3D e compare preços em tempo real',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="scan-overlay">
        {children}
      </body>
    </html>
  )
}
