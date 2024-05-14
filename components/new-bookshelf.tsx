/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/hl7f7IRHWIo
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Book, Bookshelf, OngoingBook } from "../core/model"
import BooksChart from './books-chart'
import Image from 'next/image'
import Link from "next/link"

const ArchivedBookTile = ({ book }: { book: Book }) => (
  <div className="flex">
    <div className="flex flex-1 items-center space-x-1">
      {[...Array(book.rating)].map((_, index) => (
        <StarIcon key={index} className="w-5 h-5 fill-zinc-900 dark:fill-zinc-50" />
      ))}
      {[...Array(5 - book.rating)].map((_, index) => (
        <StarIcon key={index + 5 - book.rating} className="w-5 h-5 fill-zinc-100 stroke-zinc-500 dark:fill-zinc-800 dark:stroke-zinc-400" />
      ))}
    </div>
    <div>
      {book.summary
        ? <Link href={book.summary} target="#blank">
            <Button className="inline-flex h-8 items-center justify-center rounded-md bg-gray-800 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-100/90 dark:focus-visible:ring-gray-300">
              Summary
            </Button>
          </Link>
        : null
      }
    </div>
  </div>
)

const Tile = ({ book }: { book: Book }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col">
    <Link className="flex-1" href={book.externalLink} target="_blank">
      <div className="flex mb-4">
        <Image alt="Book Cover" width="640" height="640" className="w-16 h-24 rounded-md mr-4" src={book.cover} />
        <div>
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-gray-500 dark:text-gray-400">{book.author}</p>
        </div>
      </div>
    </Link>
    <div className="">
      {book.rating
        ? <ArchivedBookTile book={book} />
        : <p className="text-gray-500 dark:text-gray-400">Currently reading</p>}
    </div>
  </div>
)

export function NewBookshelf({ bookshelf }: { bookshelf: Bookshelf }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 dark:text-white">
      <div className="max-w-4xl w-full px-4 md:px-6">
        <div className="flex my-4 lg:my-8 justify-center items-center">
          <BookshelfIcon className="dark:fill-white"/>
          <h1 className="text-3xl mx-4 font-bold">{`My bookshelf`}</h1>
        </div>
        <div className="my-4 lg:my-8 flex flex-col place-items-center">
          <h2 className="text-lg font-light mb-4 text-center">{bookshelf.overview}</h2>
          <Card className="h-full w-full max-w-2xl dark:bg-gray-300 dark:text-black">
            <CardHeader>
              <CardTitle>Books read per month</CardTitle>
            </CardHeader>
            <CardContent>
              <BooksChart className="aspect-[9/4] lg:aspect-[9/3]" bookshelf={bookshelf} />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...bookshelf.current, ...bookshelf.archive].map((book, index) => (
            <Tile key={index} book={book as any} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function BookshelfIcon(props: any) {
  return (
    <svg {...props} width="64" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g id="Glyph"><path d="M32,35.002h6v-28H32Zm2-26h2v2H34Zm0,4h2v20H34Z"/><rect x="24" y="9.00195" width="6" height="12"/><polygon points="40 35.002 43.781 35.002 40 16.1 40 35.002"/><polygon points="50.58 29.002 49.38 23.002 43.419 23.002 44.619 29.002 50.58 29.002"/><rect x="24" y="23.00195" width="6" height="6"/><polygon points="46.181 7.002 40.22 7.002 43.02 21.002 48.98 21.002 46.181 7.002"/><rect x="18" y="7.00195" width="4" height="28"/><rect x="8" y="43.00195" width="2" height="14"/><rect x="54" y="43.00195" width="2" height="14"/><rect x="4" y="37.00195" width="56" height="4"/><rect x="14" y="9.00195" width="2" height="26"/><polygon points="51.78 35.002 50.98 31.002 45.019 31.002 45.819 35.002 51.78 35.002"/><rect x="24" y="31.00195" width="6" height="4"/></g></svg>
  )
}
