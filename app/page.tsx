import { parse } from 'yaml'
import fs from 'fs'
import { Bookshelf } from '../core/model'
import BooksComponent from '@/components/books'
import Head from 'next/head'
import { Title, Description } from '../core/meta'

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
    start: new Date(Date.parse(book.start)),
  }))
  return {
    archive,
    current,
  }
}

export default function Page() {
  const bookshelf = getData()
  const metaDescription = Description + `Currently reading ${bookshelf.current[0].title} by ${bookshelf.current[0].author}}`
  return (
    <>
      <Head>
        <title>My Bookshelf</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
        <meta property='og:title' content={Title} />
        <meta property='og:description' content={metaDescription} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://books.selcukcihan.com' />
        <meta property='og:image' content={`https://books.selcukcihan.com/${bookshelf.current[0].cover}`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@scihan' />
        <meta name='twitter:creator' content='@scihan' />
        <meta name='twitter:title' content={Title} />
        <meta name='twitter:description' content={metaDescription} />
        <meta name='twitter:image' content={`https://books.selcukcihan.com/${bookshelf.current[0].cover}`} />
      </Head>
      <main>
        <BooksComponent bookshelf={bookshelf} />
      </main>
    </>
  )
}
