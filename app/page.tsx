import { bookshelf, metadata } from '../core/db'
import { NewBookshelf } from '../components/new-bookshelf'

export { metadata }

export default function Page() {
  return <NewBookshelf bookshelf={bookshelf} />
}
