'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NyzUGlHsmFq
 */
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Bookshelf } from "../core/model"
import { useState } from "react"
import Link from "next/link"
import Image from 'next/image'

export default function Component({ bookshelf }: { bookshelf: Bookshelf }) {
  const [sortColumn, setSortColumn] = useState("start")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const onClick = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }
  const sortFunction = (a: any, b: any) => {
    if (sortDirection === "desc") {
      return a[sortColumn] > b[sortColumn] ? -1 : 1
    } else {
      return a[sortColumn] < b[sortColumn] ? -1 : 1
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col">
      <div className="bg-[#1c2938] text-white py-12 px-6 text-center mb-6">
        <h1 className="text-4xl font-bold">Welcome to My Bookshelf</h1>
        <p className="text-lg mt-4 mx-auto max-w-prose">
          {"Discover the books I'm currently reading, the ones I've read and my reviews on them."}
        </p>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-grow">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-xl leading-6 font-medium text-gray-900">{"Currently reading"}</h1>
            {bookshelf.current.map((book, index) => (
              <div key={index} className="flex items-center mt-2 text-xl text-gray-700 ">
                <Image
                  alt={`${book.title} cover`}
                  className="object-cover h-16 w-10 mr-2"
                  height="60"
                  src={book.cover}
                  style={{
                    aspectRatio: "40/60",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <Link href={book.externalLink} target="_blank">
                  <p className=" text-gray-700 mt-2 hover:text-blue-500">
                    <span className="font-bold">{book.title}</span>
                    <span className="text-lg"> by {book.author}</span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <hr className="my-6 border-gray-300" />
          <h2 className="text-lg my-4 leading-6 font-medium text-gray-900">{"Books I've Read"}</h2>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-4">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4 cursor-pointer" />
                  <TableHead className="pl-4 cursor-pointer" onClick={() => onClick("title")}>
                    Title{" "}
                    <svg
                      className=" h-5 w-5 text-gray-500 inline-block ml-2"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => onClick("author")}>
                    Author{" "}
                    <svg
                      className=" h-5 w-5 text-gray-500 inline-block ml-2"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => onClick("rating")}>
                    Rating{" "}
                    <svg
                      className=" h-5 w-5 text-gray-500 inline-block ml-2"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-200">
                {bookshelf.archive.sort(sortFunction).map((book, index) => (
                  <TableRow key={index}>
                    <TableCell className="pl-4">
                      <Link href={book.externalLink} target="_blank">
                        <Image
                          alt={`${book.title} cover`}
                          className="object-cover h-12 w-8 inline-block mr-2"
                          height="60"
                          src={book.cover}
                          style={{
                            aspectRatio: "40/60",
                            objectFit: "cover",
                          }}
                          width="40"
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="pl-4">{book.title}</TableCell>
                    <TableCell className="pl-4">{book.author}</TableCell>
                    <TableCell className="pl-4">{book.rating}/10</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 px-6 text-center">
        <Link
          className="hover:text-blue-500"
          href="https://www.goodreads.com/review/list/171677638"
          target="_blank"
          >
          <p><IconBookopen className="h-5 w-5 text-gray-500 inline-block mr-2" />Check my Goodreads account</p>
        </Link>
        <p className="mt-2 text-xs">
          <a className="hover:text-blue-500" href="https://github.com/selcukcihan/books" rel="noopener noreferrer" target="_blank">
            GitHub Repo
          </a>
        </p>
        <p className="mt-2 text-xs">
          Generated using{" "}
          <a className="text-blue-500 hover:underline" href="https://v0.dev/r/HoHFHYnagmd" rel="noopener noreferrer" target="_blank">
            v0
          </a>
        </p>
      </footer>
    </div>
  )
}

function IconBookopen(props: any) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}
