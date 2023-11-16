import { parse } from 'yaml'
import fs from 'fs'
import { Bookshelf } from '../core/model'
import BooksComponent from '@/components/books'
import Head from 'next/head'
import { Title, Description } from '../core/meta'

const bookshelf = getData()
const metaDescription = Description + `Currently reading ${bookshelf.current[0].title} by ${bookshelf.current[0].author}`

export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: Title,
    site: '@scihan',
    description: metaDescription,
    creator: '@scihan',
    images: [`https://books.selcukcihan.com${bookshelf.current[0].cover}`],
  },
  openGraph: {
    title: Title,
    type: 'website',
    url: 'https://books.selcukcihan.com',
    description: metaDescription,
    images: [`https://books.selcukcihan.com${bookshelf.current[0].cover}`],
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
