import { parse } from 'yaml'
import fs from 'fs'
import { Bookshelf, Book } from './model'

export const bookshelf = getData()

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
      count: chartData.filter(book => {
        const bookStart = book.start
        const bookEnd = book.end || new Date() // If no end date, use current date
        const monthStart = new Date(month.getFullYear(), month.getMonth(), 1)
        const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0)
        
        // Check if the book's date range overlaps with this month
        return bookStart <= monthEnd && bookEnd >= monthStart
      }).length,
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
function getOverview(archive: Book[]) {
  const firstBook = archive[archive.length - 1]
  const months = monthDiff(firstBook.start, new Date())
  return {
    overview: `I've read ${archive.length} books in ${months} months`,
    title: `Progress Chart (${Math.ceil(archive.length / months)} books / month)`
  }
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
    kindle: book.kindle,
    audible: !!book.audible,
  }))
  const current = rawData.current.map((book: any) => ({
    title: book.title,
    author: book.author,
    externalLink: book.externalLink,
    cover: book.cover,
    start: new Date(Date.parse(book.start)),
    kindle: book.kindle,
    audible: !!book.audible,
  }))
  return {
    chartData: extractMonthlyCountsForLast6Months([...archive, ...current]),
    archive,
    current,
    ...getOverview(archive),
  }
}
