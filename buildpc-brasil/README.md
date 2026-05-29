# 🖥️ BuildPC Brasil

Monte seu PC Gamer em 3D, compare preços em tempo real e descubra quais jogos você pode rodar.

## 🚀 Funcionalidades

- **Configurador 3D** — Visualize seu PC sendo montado peça a peça com Three.js
- **Comparação de Preços** — Kabum, Terabyte Shop e Pichau atualizados diariamente
- **Compatibilidade de Jogos** — Saiba exatamente o que seu PC consegue rodar
- **Guia de Hospedagem** — Passo a passo para hospedar de graça

## 🛠 Tecnologias

- **Next.js 14** — Framework React
- **TypeScript** — Tipagem estática
- **Tailwind CSS** — Estilização
- **Three.js + React Three Fiber** — Visualizador 3D
- **Framer Motion** — Animações

## 📦 Instalação no Bolt.new

1. Acesse [bolt.new](https://bolt.new)
2. Cole o código deste projeto
3. O Bolt instala as dependências automaticamente
4. Clique em **Run** para visualizar

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── configurador/         # Configurador 3D
│   │   └── page.tsx
│   ├── precos/               # Comparação de preços
│   │   └── page.tsx
│   ├── jogos/                # Compatibilidade de jogos
│   │   └── page.tsx
│   ├── guia/                 # Guia de hospedagem
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
└── data/
    └── parts.ts              # Catálogo de peças + jogos
```

## 🌐 Deploy Gratuito

| Serviço | Uso | Custo |
|---------|-----|-------|
| GitHub | Código-fonte | Grátis |
| Vercel | Hospedagem | Grátis |
| Cloudflare R2 | Modelos 3D .glb | Grátis (10GB) |
| Supabase | Banco de dados | Grátis |
| GitHub Actions | Scraping diário | Grátis |

## 🎮 Adicionando Modelos 3D Reais

Para usar modelos .glb reais das peças:

1. Faça upload dos .glb no Cloudflare R2
2. Em `src/data/parts.ts`, atualize o campo `image` com a URL do R2
3. No componente `PCCase`, substitua as geometrias primitivas por `useGLTF(part.image)`

## 💰 Atualização de Preços

Os preços do catálogo em `src/data/parts.ts` são estáticos como base.
Para preços em tempo real, configure:

1. GitHub Actions com cron job diário
2. Script de scraping em `scripts/update-prices.js`
3. Banco Supabase para persistência
4. API Route em `src/app/api/prices/route.ts`

## 📄 Licença

MIT — Faça o que quiser com o código!
