import type { Metadata } from "next"
import { Nunito } from 'next/font/google'
import './globals.css'
import { Title } from '../core/meta'
import { bookshelf } from '../core/db'

const font = Nunito({ subsets: ["latin"] })

const metaDescription = `I'm currently reading ${bookshelf.current[0].title} by ${bookshelf.current[0].author}`

const images = [{
  url: `https://books.selcukcihan.com${bookshelf.current[0].cover}`,
  width: 360,
  height: 360,
  alt: metaDescription,
}]

export const metadata: Metadata = {
  title: Title,
  description: metaDescription,
  applicationName: Title,
  keywords: ['books', 'reading', 'bookshelf', 'personal', 'list', 'notes', 'ratings', 'library', 'bookworm', 'booklover', 'kindle', 'goodreads', 'bookclub', 'bookstore', 'bookshop', 'bookcase', 'bookstack', 'bookshelfie', 'bookstagram', 'bookphotography', 'bookcommunity', 'bookaddict', 'bookaholic', 'booknerd', 'bookgeek', 'bookish', 'bookdragon', 'bookworms', 'booklovers', 'bookclubs', 'bookstores', 'bookshops', 'bookcases', 'bookstacks', 'bookshelves', 'bookstagrammer', 'bookphotographer', 'bookcommunitys', 'bookaddicts', 'bookaholics', 'booknerds', 'bookgeeks', 'bookishs', 'bookdragons'],
  twitter: {
    card: 'summary',
    title: Title,
    description: metaDescription,
    creator: '@scihan',
    site: '@scihan',
    images,
  },
  openGraph: {
    siteName: Title,
    title: Title,
    type: 'website',
    url: 'https://books.selcukcihan.com',
    description: metaDescription,
    images,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
