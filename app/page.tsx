import { parse } from 'yaml'
import fs from 'fs'
import { Bookshelf } from '../core/model'
import BooksComponent from '@/components/books'

function getData(): Bookshelf {
  const rawData = parse(fs.readFileSync('core/data.yaml', 'utf8'))
  const archive = rawData.archive.map((book: any) => ({
    title: book.title,
    author: book.author,
    rating: parseInt(book.rating),
    start: new Date(Date.parse(book.start)),
    end: new Date(Date.parse(book.end)),
  }))
  const current = rawData.current.map((book: any) => ({
    title: book.title,
    author: book.author,
    start: new Date(Date.parse(book.start)),
  }))
  return {
    archive,
    current,
  }
}

export default function Page() {
  const bookshelf = getData()
  return (
    <main>
      <BooksComponent bookshelf={bookshelf} />
    </main>
  )
}
