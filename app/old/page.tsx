import BooksComponent from '@/components/books'
import { bookshelf, metadata } from '../../core/db'

export { metadata }

export default function Page() {
  return <BooksComponent bookshelf={bookshelf} />
}
