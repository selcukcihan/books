import { bookshelf } from '../core/db'
import { NewBookshelf } from '../components/new-bookshelf'

export default function Page() {
  return <NewBookshelf bookshelf={bookshelf} />
}
