import BooksComponent from '@/components/books'
import { bookshelf } from '../../core/db'

export default function Page() {
  return <BooksComponent bookshelf={bookshelf} />
}
