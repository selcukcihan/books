'use client'

import { useState } from "react"
import { Bookshelf } from "../core/model"
import Tile from "./tile"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export const SearchableBooks = ({ bookshelf }: { bookshelf: Bookshelf }) => {
  const [search, setSearch] = useState("")
  const [kindleOnly, setKindleOnly] = useState(false)
  const filteredBooks = [...bookshelf.current, ...bookshelf.archive]
    .filter((book) => {
      return (book.title + ' ' + book.author).toLowerCase().includes(search.toLowerCase())
    })
    .filter((book) => {
      return !kindleOnly || book.kindle
    })

  return (
    <>
      <div className="mb-8">{/*To remove search for mobile: hidden lg:block */}
        <div className="flex flex-col md:flex-row">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="rounded-md border border-gray-200 bg-white px-8 py-2 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-primary dark:focus:ring-primary"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by title or author"
          />
          <div className="flex flex-row items-center space-x-2 w-48 md:justify-end pt-2 md:pt-0">
            <Switch
              id="kindle-filter"
              checked={kindleOnly}
              onCheckedChange={setKindleOnly}
            />
            <Label htmlFor="kindle-filter">Kindle only</Label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, index) => (
          <Tile key={index} book={book as any} />
        ))}
      </div>
      {filteredBooks.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No books found, try another search term.
        </div>
      )}
    </>
  )
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
