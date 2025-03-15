import { faker } from "@faker-js/faker"

export interface Memecoin {
  name: string
  ticker: string
  description: string
  marketCap: number
  badges: {
    pro?: boolean
    kyc?: boolean
    trending?: number
  }
  logoSrc: string
  lastTransactionTime?: Date
}

const memeThemes = [
  "Doge",
  "Pepe",
  "Wojak",
  "Stonks",
  "Moon",
  "Ape",
  "Diamond Hands",
  "HODL",
  "Rocket",
  "Lambo",
  "Elon",
  "Shiba",
  "Tendies",
  "Pump",
  "Dump",
  "FOMO",
  "FUD",
  "Whale",
  "Bear",
  "Bull",
  "Musk",
  "SpaceX",
  "Cybertruck",
  "NFT",
  "DeFi",
  "Yield",
  "Farm",
  "Stake",
  "Burn",
  "Airdrop",
]

function generateMemecoinName(): string {
  const theme = faker.helpers.arrayElement(memeThemes)
  const suffix = faker.helpers.arrayElement([
    "Coin",
    "Token",
    "Moon",
    "Rocket",
    "Inu",
    "Cash",
    "Swap",
    "Chain",
    "Verse",
    "World",
  ])
  return `${theme}${suffix}`
}

function generateMemecoinTicker(name: string): string {
  return name
    .replace(/[aeiou]/gi, "")
    .slice(0, 4)
    .toUpperCase()
}

function generateDescription(): string {
  const descriptions = [
    "The ultimate meme-inspired crypto for true believers.",
    "Revolutionizing DeFi with cutting-edge meme technology.",
    "Bringing blockchain to the masses, one meme at a time.",
    "The people's coin: by the community, for the community.",
    "Defying gravity and logic in the crypto space.",
    "Fueling the next generation of decentralized meme economy.",
    "Where finance meets internet culture.",
    "Turning memes into dreams and profits.",
    "The chosen one of the crypto prophecy.",
    "Uniting hodlers worldwide under one banner.",
  ]
  return faker.helpers.arrayElement(descriptions)
}

export function generateMemecoin(isTrending = false): Memecoin {
  const name = generateMemecoinName()
  const marketCapValue = faker.number.int({ min: 10000, max: 1000000000 })

  return {
    name,
    ticker: generateMemecoinTicker(name),
    description: generateDescription(),
    marketCap: marketCapValue,
    badges: {
      pro: faker.datatype.boolean({ probability: 0.2 }),
      kyc: faker.datatype.boolean({ probability: 0.2 }),
      trending: isTrending ? faker.number.int({ min: 1, max: 100 }) : undefined,
    },
    logoSrc: `/placeholder.svg?height=80&width=80&text=${name.slice(0, 2)}`,
    lastTransactionTime: faker.date.recent({ days: 1 }),
  }
}

export function generateMemecoins(count: number, isTrending = false): Memecoin[] {
  const coins = Array.from({ length: count }, () => generateMemecoin(isTrending))
  return coins
}

export function sortMemecoins(coins: Memecoin[], sortType: "featured" | "topGraduated" | "highMarketCap"): Memecoin[] {
  return coins.sort((a, b) => {
    // First, sort by pro badge
    if (a.badges.pro && !b.badges.pro) return -1
    if (!a.badges.pro && b.badges.pro) return 1

    // Then, apply specific sorting logic
    switch (sortType) {
      case "featured":
        // Sort by most recent transaction for featured
        return (b.lastTransactionTime?.getTime() || 0) - (a.lastTransactionTime?.getTime() || 0)
      case "topGraduated":
      case "highMarketCap":
        // Sort by market cap for both topGraduated and highMarketCap
        return b.marketCap - a.marketCap
      default:
        return 0
    }
  })
}

