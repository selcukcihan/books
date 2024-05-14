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
  const TOTAL_MONTHS = 7
  const now = new Date()
  const sixMonthsAgo = new Date(now)
  sixMonthsAgo.setMonth(now.getMonth() - (TOTAL_MONTHS - 1))
  const last6Months = []
  for (let i = 0; i < TOTAL_MONTHS; i++) {
    const month = new Date(sixMonthsAgo)
    month.setMonth(sixMonthsAgo.getMonth() + i)
    last6Months.push({
      name: month.toLocaleString('default', { month: 'short' }),
      count: chartData.filter(book => book.start.getMonth() === month.getMonth()).length,
    })
  }
  return last6Months
}

function monthDiff(d1: Date, d2: Date) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

// This method returns a string that tells how many books were read in how many months in total
function getOverview(archive: Book[]): string {
  const firstBook = archive[archive.length - 1]
  const months = monthDiff(firstBook.start, new Date())
  return `I've read ${archive.length} books in ${months} months`
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
    summary: book.summary,
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
    overview: getOverview(archive),
  }
}
