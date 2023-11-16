import { parse } from 'yaml'
import fs from 'fs'

interface Book {
  title: string
  author: string
  rating: number
  start: Date
  end: Date
}

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
    <main className='mx-auto max-w-[600px]'>
      <header className=' text-gray-1 p-2 px-6 rounded-lg text-center'>
        <p className='italic'>{"Books I've read"}</p>
      </header>
      <div>
        {books.map(book => (<div key={book.title}>
          <h2 className='text-xl font-semibold'>{book.title}</h2>
          <p className='text-gray-1'>{book.author}</p>
          <p className='text-gray-1'>{book.rating}/10</p>
          <p className='text-gray-1'>{book.start.toDateString()} - {book.end.toDateString()}</p>
        </div>))}
      </div>
    </main>
  )
}
