export interface PCPart {
  id: string
  category: keyof PCBuild
  name: string
  brand: string
  specs: string
  performance: number // 0-100
  power: number // TDP in watts
  image: string // URL or placeholder
  prices: {
    kabum: number | null
    terabyte: number | null
    pichau: number | null
  }
  urls: {
    kabum: string
    terabyte: string
    pichau: string
  }
  lastUpdated: string
}

export interface PCBuild {
  cpu: PCPart | null
  gpu: PCPart | null
  ram: PCPart | null
  motherboard: PCPart | null
  storage: PCPart | null
  psu: PCPart | null
  cooler: PCPart | null
  case: PCPart | null
}

export interface Game {
  id: string
  name: string
  genre: string
  image: string
  requirements: {
    min: { cpu: number; gpu: number; ram: number }
    recommended: { cpu: number; gpu: number; ram: number }
  }
  resolution: '720p' | '1080p' | '1440p' | '4K'
}

// Static PC parts catalog (prices updated via API daily)
export const PARTS_CATALOG: Record<string, PCPart[]> = {
  cpu: [
    {
      id: 'ryzen-5-5600x',
      category: 'cpu',
      name: 'Ryzen 5 5600X',
      brand: 'AMD',
      specs: '6 núcleos / 12 threads / 4.6GHz Boost',
      performance: 70,
      power: 65,
      image: '/parts/cpu-ryzen5.png',
      prices: { kabum: 749, terabyte: 739, pichau: 755 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/ryzen-5-5600x',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=ryzen+5+5600x',
        pichau: 'https://www.pichau.com.br/search?q=ryzen+5+5600x',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'ryzen-7-5700x',
      category: 'cpu',
      name: 'Ryzen 7 5700X',
      brand: 'AMD',
      specs: '8 núcleos / 16 threads / 4.6GHz Boost',
      performance: 80,
      power: 65,
      image: '/parts/cpu-ryzen7.png',
      prices: { kabum: 1099, terabyte: 1089, pichau: 1099 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/ryzen-7-5700x',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=ryzen+7+5700x',
        pichau: 'https://www.pichau.com.br/search?q=ryzen+7+5700x',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'i5-12400f',
      category: 'cpu',
      name: 'Core i5-12400F',
      brand: 'Intel',
      specs: '6 núcleos / 12 threads / 4.4GHz Turbo',
      performance: 72,
      power: 65,
      image: '/parts/cpu-i5.png',
      prices: { kabum: 799, terabyte: 785, pichau: 790 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/i5-12400f',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=i5+12400f',
        pichau: 'https://www.pichau.com.br/search?q=i5-12400f',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'i7-13700k',
      category: 'cpu',
      name: 'Core i7-13700K',
      brand: 'Intel',
      specs: '16 núcleos / 24 threads / 5.4GHz Turbo',
      performance: 92,
      power: 125,
      image: '/parts/cpu-i7.png',
      prices: { kabum: 2199, terabyte: 2150, pichau: 2189 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/i7-13700k',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=i7+13700k',
        pichau: 'https://www.pichau.com.br/search?q=i7-13700k',
      },
      lastUpdated: new Date().toISOString(),
    },
  ],
  gpu: [
    {
      id: 'rtx-3060',
      category: 'gpu',
      name: 'GeForce RTX 3060',
      brand: 'NVIDIA',
      specs: '12GB GDDR6 / 3584 CUDA Cores',
      performance: 65,
      power: 170,
      image: '/parts/gpu-rtx3060.png',
      prices: { kabum: 1599, terabyte: 1579, pichau: 1589 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/rtx-3060',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=rtx+3060',
        pichau: 'https://www.pichau.com.br/search?q=rtx+3060',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'rtx-4060',
      category: 'gpu',
      name: 'GeForce RTX 4060',
      brand: 'NVIDIA',
      specs: '8GB GDDR6 / 3072 CUDA Cores / DLSS 3',
      performance: 75,
      power: 115,
      image: '/parts/gpu-rtx4060.png',
      prices: { kabum: 2199, terabyte: 2149, pichau: 2179 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/rtx-4060',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=rtx+4060',
        pichau: 'https://www.pichau.com.br/search?q=rtx+4060',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'rx-6700-xt',
      category: 'gpu',
      name: 'Radeon RX 6700 XT',
      brand: 'AMD',
      specs: '12GB GDDR6 / 2560 Stream Processors',
      performance: 72,
      power: 230,
      image: '/parts/gpu-rx6700xt.png',
      prices: { kabum: 1899, terabyte: 1849, pichau: 1869 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/rx-6700-xt',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=rx+6700+xt',
        pichau: 'https://www.pichau.com.br/search?q=rx+6700+xt',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'rtx-4070',
      category: 'gpu',
      name: 'GeForce RTX 4070',
      brand: 'NVIDIA',
      specs: '12GB GDDR6X / 5888 CUDA Cores / DLSS 3',
      performance: 88,
      power: 200,
      image: '/parts/gpu-rtx4070.png',
      prices: { kabum: 3199, terabyte: 3149, pichau: 3179 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/rtx-4070',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=rtx+4070',
        pichau: 'https://www.pichau.com.br/search?q=rtx+4070',
      },
      lastUpdated: new Date().toISOString(),
    },
  ],
  ram: [
    {
      id: 'xpg-8gb-3200',
      category: 'ram',
      name: 'XPG Gammix D30 8GB',
      brand: 'ADATA',
      specs: '8GB DDR4 3200MHz',
      performance: 50,
      power: 3,
      image: '/parts/ram-8gb.png',
      prices: { kabum: 149, terabyte: 145, pichau: 147 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/memoria-ram-8gb-ddr4',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=ram+8gb+ddr4',
        pichau: 'https://www.pichau.com.br/search?q=ram+8gb+ddr4',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'xpg-16gb-3600',
      category: 'ram',
      name: 'XPG Gammix D45 16GB (2x8)',
      brand: 'ADATA',
      specs: '16GB DDR4 3600MHz Dual Channel',
      performance: 70,
      power: 6,
      image: '/parts/ram-16gb.png',
      prices: { kabum: 299, terabyte: 289, pichau: 295 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/memoria-ram-16gb-ddr4',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=ram+16gb+ddr4',
        pichau: 'https://www.pichau.com.br/search?q=ram+16gb+ddr4',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'corsair-32gb-6000',
      category: 'ram',
      name: 'Corsair Vengeance 32GB (2x16)',
      brand: 'Corsair',
      specs: '32GB DDR5 6000MHz Dual Channel',
      performance: 90,
      power: 10,
      image: '/parts/ram-32gb.png',
      prices: { kabum: 699, terabyte: 679, pichau: 689 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/memoria-ram-32gb-ddr5',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=ram+32gb+ddr5',
        pichau: 'https://www.pichau.com.br/search?q=ram+32gb+ddr5',
      },
      lastUpdated: new Date().toISOString(),
    },
  ],
  motherboard: [
    {
      id: 'b450-tomahawk',
      category: 'motherboard',
      name: 'B450 Tomahawk MAX',
      brand: 'MSI',
      specs: 'Socket AM4 / DDR4 / PCIe 3.0',
      performance: 60,
      power: 15,
      image: '/parts/mb-b450.png',
      prices: { kabum: 699, terabyte: 689, pichau: 695 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/b450-tomahawk',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=b450+tomahawk',
        pichau: 'https://www.pichau.com.br/search?q=b450+tomahawk',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'b660-gaming',
      category: 'motherboard',
      name: 'B660M Gaming X',
      brand: 'Gigabyte',
      specs: 'Socket LGA1700 / DDR5 / PCIe 4.0',
      performance: 70,
      power: 15,
      image: '/parts/mb-b660.png',
      prices: { kabum: 899, terabyte: 879, pichau: 889 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/b660-gaming',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=b660+gaming',
        pichau: 'https://www.pichau.com.br/search?q=b660+gaming',
      },
      lastUpdated: new Date().toISOString(),
    },
  ],
  storage: [
    {
      id: 'ssd-500gb',
      category: 'storage',
      name: 'SSD XPG S40G 500GB',
      brand: 'ADATA',
      specs: '500GB NVMe PCIe 3.0 / 3500MB/s',
      performance: 60,
      power: 4,
      image: '/parts/ssd-500.png',
      prices: { kabum: 249, terabyte: 239, pichau: 245 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/ssd-nvme-500gb',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=ssd+nvme+500gb',
        pichau: 'https://www.pichau.com.br/search?q=ssd+nvme+500gb',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'ssd-1tb',
      category: 'storage',
      name: 'SSD Kingston NV2 1TB',
      brand: 'Kingston',
      specs: '1TB NVMe PCIe 4.0 / 3500MB/s',
      performance: 75,
      power: 5,
      image: '/parts/ssd-1tb.png',
      prices: { kabum: 399, terabyte: 385, pichau: 389 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/ssd-nvme-1tb',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=ssd+nvme+1tb',
        pichau: 'https://www.pichau.com.br/search?q=ssd+nvme+1tb',
      },
      lastUpdated: new Date().toISOString(),
    },
  ],
  psu: [
    {
      id: 'psu-500w',
      category: 'psu',
      name: 'EVGA 500W 80+ Bronze',
      brand: 'EVGA',
      specs: '500W / 80+ Bronze / Semi-modular',
      performance: 55,
      power: 0,
      image: '/parts/psu-500.png',
      prices: { kabum: 349, terabyte: 335, pichau: 339 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/fonte-500w',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=fonte+500w',
        pichau: 'https://www.pichau.com.br/search?q=fonte+500w',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'psu-750w',
      category: 'psu',
      name: 'Corsair RM750x 750W',
      brand: 'Corsair',
      specs: '750W / 80+ Gold / Full modular',
      performance: 85,
      power: 0,
      image: '/parts/psu-750.png',
      prices: { kabum: 699, terabyte: 679, pichau: 689 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/fonte-750w',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=fonte+750w',
        pichau: 'https://www.pichau.com.br/search?q=fonte+750w',
      },
      lastUpdated: new Date().toISOString(),
    },
  ],
  cooler: [
    {
      id: 'cooler-hyper212',
      category: 'cooler',
      name: 'Hyper 212 Black Edition',
      brand: 'Cooler Master',
      specs: 'Air Cooler / 120mm / TDP 150W',
      performance: 65,
      power: 5,
      image: '/parts/cooler-hyper.png',
      prices: { kabum: 199, terabyte: 189, pichau: 195 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/cooler-hyper-212',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=hyper+212',
        pichau: 'https://www.pichau.com.br/search?q=hyper+212',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'cooler-aio-240',
      category: 'cooler',
      name: 'Kraken X53 240mm',
      brand: 'NZXT',
      specs: 'Water Cooler / 240mm / TDP 300W',
      performance: 88,
      power: 10,
      image: '/parts/cooler-aio.png',
      prices: { kabum: 599, terabyte: 579, pichau: 589 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/water-cooler-240mm',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=water+cooler+240mm',
        pichau: 'https://www.pichau.com.br/search?q=water+cooler+240mm',
      },
      lastUpdated: new Date().toISOString(),
    },
  ],
  case: [
    {
      id: 'case-masterbox',
      category: 'case',
      name: 'MasterBox Q300L',
      brand: 'Cooler Master',
      specs: 'MicroATX / 2x USB 3.0 / Painel Magnético',
      performance: 60,
      power: 0,
      image: '/parts/case-q300.png',
      prices: { kabum: 299, terabyte: 285, pichau: 289 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/gabinete-microatx',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=gabinete+microatx',
        pichau: 'https://www.pichau.com.br/search?q=gabinete+microatx',
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'case-h510',
      category: 'case',
      name: 'H510 Flow',
      brand: 'NZXT',
      specs: 'ATX Mid-Tower / 2x USB 3.2 / Mesh Front',
      performance: 80,
      power: 0,
      image: '/parts/case-h510.png',
      prices: { kabum: 549, terabyte: 529, pichau: 539 },
      urls: {
        kabum: 'https://www.kabum.com.br/busca/gabinete-nzxt-h510',
        terabyte: 'https://www.terabyteshop.com.br/busca?str=nzxt+h510',
        pichau: 'https://www.pichau.com.br/search?q=nzxt+h510',
      },
      lastUpdated: new Date().toISOString(),
    },
  ],
}

// Games catalog with system requirements mapped to performance scores
export const GAMES_CATALOG: Game[] = [
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    genre: 'FPS',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg',
    requirements: {
      min: { cpu: 40, gpu: 30, ram: 30 },
      recommended: { cpu: 60, gpu: 55, ram: 50 },
    },
    resolution: '1080p',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    genre: 'FPS Tático',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2073850/header.jpg',
    requirements: {
      min: { cpu: 35, gpu: 25, ram: 25 },
      recommended: { cpu: 55, gpu: 50, ram: 45 },
    },
    resolution: '1080p',
  },
  {
    id: 'gta5',
    name: 'GTA V',
    genre: 'Ação / Mundo Aberto',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
    requirements: {
      min: { cpu: 40, gpu: 40, ram: 35 },
      recommended: { cpu: 65, gpu: 60, ram: 55 },
    },
    resolution: '1080p',
  },
  {
    id: 'cyberpunk2077',
    name: 'Cyberpunk 2077',
    genre: 'RPG / Ação',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    requirements: {
      min: { cpu: 55, gpu: 55, ram: 50 },
      recommended: { cpu: 80, gpu: 80, ram: 70 },
    },
    resolution: '1080p',
  },
  {
    id: 'eldenring',
    name: 'Elden Ring',
    genre: 'RPG / Souls',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    requirements: {
      min: { cpu: 50, gpu: 50, ram: 45 },
      recommended: { cpu: 70, gpu: 70, ram: 60 },
    },
    resolution: '1080p',
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    genre: 'Battle Royale',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1092640/header.jpg',
    requirements: {
      min: { cpu: 35, gpu: 30, ram: 30 },
      recommended: { cpu: 60, gpu: 60, ram: 55 },
    },
    resolution: '1080p',
  },
  {
    id: 'hogwarts',
    name: 'Hogwarts Legacy',
    genre: 'RPG',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
    requirements: {
      min: { cpu: 60, gpu: 60, ram: 55 },
      recommended: { cpu: 80, gpu: 80, ram: 70 },
    },
    resolution: '1080p',
  },
  {
    id: 'witcher3',
    name: 'The Witcher 3',
    genre: 'RPG',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg',
    requirements: {
      min: { cpu: 40, gpu: 40, ram: 35 },
      recommended: { cpu: 65, gpu: 65, ram: 55 },
    },
    resolution: '1080p',
  },
  {
    id: 'rdr2',
    name: 'Red Dead Redemption 2',
    genre: 'Ação / Mundo Aberto',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    requirements: {
      min: { cpu: 55, gpu: 55, ram: 50 },
      recommended: { cpu: 80, gpu: 80, ram: 70 },
    },
    resolution: '1080p',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    genre: 'Sandbox',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg',
    requirements: {
      min: { cpu: 20, gpu: 15, ram: 20 },
      recommended: { cpu: 40, gpu: 35, ram: 40 },
    },
    resolution: '1080p',
  },
  {
    id: 'warzone',
    name: 'Call of Duty: Warzone',
    genre: 'Battle Royale FPS',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg',
    requirements: {
      min: { cpu: 50, gpu: 50, ram: 45 },
      recommended: { cpu: 70, gpu: 70, ram: 65 },
    },
    resolution: '1080p',
  },
  {
    id: 'lol',
    name: 'League of Legends',
    genre: 'MOBA',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg',
    requirements: {
      min: { cpu: 25, gpu: 20, ram: 25 },
      recommended: { cpu: 45, gpu: 40, ram: 40 },
    },
    resolution: '1080p',
  },
]

export function getLowestPrice(part: PCPart): { store: string; price: number } | null {
  const prices = [
    { store: 'Kabum', price: part.prices.kabum },
    { store: 'Terabyte', price: part.prices.terabyte },
    { store: 'Pichau', price: part.prices.pichau },
  ].filter((p) => p.price !== null) as { store: string; price: number }[]

  if (prices.length === 0) return null
  return prices.reduce((min, p) => (p.price < min.price ? p : min))
}

export function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function getBuildTotalPrice(build: PCBuild): number {
  return Object.values(build)
    .filter(Boolean)
    .reduce((total, part) => {
      const lowest = getLowestPrice(part as PCPart)
      return total + (lowest?.price ?? 0)
    }, 0)
}

export function getBuildPerformance(build: PCBuild): { cpu: number; gpu: number; ram: number } {
  return {
    cpu: build.cpu?.performance ?? 0,
    gpu: build.gpu?.performance ?? 0,
    ram: build.ram?.performance ?? 0,
  }
}

export function checkGameCompatibility(game: Game, build: PCBuild): 'incompatível' | 'mínimo' | 'recomendado' | 'ultra' {
  const perf = getBuildPerformance(build)
  const { min, recommended } = game.requirements

  const meetsMin = perf.cpu >= min.cpu && perf.gpu >= min.gpu && perf.ram >= min.ram
  const meetsRecommended = perf.cpu >= recommended.cpu && perf.gpu >= recommended.gpu && perf.ram >= recommended.ram
  const meetsUltra = perf.cpu >= recommended.cpu * 1.2 && perf.gpu >= recommended.gpu * 1.2

  if (!meetsMin) return 'incompatível'
  if (meetsUltra) return 'ultra'
  if (meetsRecommended) return 'recomendado'
  return 'mínimo'
}
