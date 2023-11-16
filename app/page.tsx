import { parse } from 'yaml'
import fs from 'fs'
import { Book } from '../core/model'
import BooksComponent from '@/components/books'

function getBooks(): Book[] {
  const books = parse(fs.readFileSync('core/books.yaml', 'utf8'))
  return books.map((book: any) => ({
    title: book.title,
    author: book.author,
    rating: parseInt(book.rating),
    start: new Date(Date.parse(book.start)),
    end: new Date(Date.parse(book.end)),
  }))
}

export default function Page() {
  const books = getBooks()
  return (
    <main>
      <BooksComponent books={books} />
    </main>
  )
}
