import { parse } from 'yaml'
import fs from 'fs'
import { Bookshelf } from '../core/model'
import BooksComponent from '@/components/books'
import { Title } from '../core/meta'

const bookshelf = getData()
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
    archive,
    current,
  }
}

export default function Page() {

  return (
    <>
      <BooksComponent bookshelf={bookshelf} />
    </>
  )
}
