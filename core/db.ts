import { parse } from 'yaml'
import fs from 'fs'
import { Bookshelf, Book } from './model'
import { Title } from './meta'

export const bookshelf = getData()
const metaDescription = `I'm currently reading ${bookshelf.current[0].title} by ${bookshelf.current[0].author}`

export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: Title,
    description: metaDescription,
    siteId: '134182720',
    creator: '@scihan',
    creatorId: '134182720',
    images: [`https://books.selcukcihan.com${bookshelf.current[0].cover}`],
  },
  openGraph: {
    siteName: Title,
    title: Title,
    type: 'website',
    url: 'https://books.selcukcihan.com',
    description: metaDescription,
    images: [{
      url: `https://books.selcukcihan.com${bookshelf.current[0].cover}`,
      width: 1000,
      height: 1304,
      alt: Title,
    }],
  },
}

// This method iterates over chartData and counts the number of books read in the last 6 months
// It returns an array of { month: string, count: number } objects, ordered by month
function extractMonthlyCountsForLast6Months (chartData: Book[]) {
  const now = new Date()
  const sixMonthsAgo = new Date(now)
  sixMonthsAgo.setMonth(now.getMonth() - 6)
  const last6Months = []
  for (let i = 0; i < 6; i++) {
    const month = new Date(sixMonthsAgo)
    month.setMonth(sixMonthsAgo.getMonth() + i)
    last6Months.push({
      name: month.toLocaleString('default', { month: 'short' }),
      // .filter(book => book.start.getMonth() === month.getMonth())
      count: chartData.filter(book => book.start.getMonth() === month.getMonth()).length,
    })
  }
  return last6Months
}

function getData(): Bookshelf {
  const rawData = parse(fs.readFileSync('core/data.yaml', 'utf8'))
  const archive = rawData.archive.map((book: any) => ({
    title: book.title,
    author: book.author,
    externalLink: book.externalLink,
    cover: book.cover,
    rating: parseInt(book.rating),
    start: new Date(Date.parse(book.start)),
    end: new Date(Date.parse(book.end)),
  }))
  const current = rawData.current.map((book: any) => ({
    title: book.title,
    author: book.author,
    externalLink: book.externalLink,
    cover: book.cover,
    start: new Date(Date.parse(book.start)),
  }))

  return {
    chartData: extractMonthlyCountsForLast6Months([...archive, ...current]),
    archive,
    current,
  }
}
