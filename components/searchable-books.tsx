"use client";

import { useState } from "react";
import { Bookshelf } from "../core/model";
import Tile from "./tile";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export const SearchableBooks = ({ bookshelf }: { bookshelf: Bookshelf }) => {
  const [search, setSearch] = useState("");
  const [formatFilter, setFormatFilter] = useState("all");

  // Calculate counts for each category
  const allBooks = [...bookshelf.current, ...bookshelf.archive];
  const searchFilteredBooks = allBooks.filter((book) => {
    return (book.title + " " + book.author)
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const counts = {
    all: searchFilteredBooks.length,
    "hard-copy": searchFilteredBooks.filter(
      (book) => !book.kindle && !book.audible
    ).length,
    kindle: searchFilteredBooks.filter((book) => book.kindle).length,
    audible: searchFilteredBooks.filter((book) => book.audible).length,
  };

  const formatOptions = [
    { value: "all", label: `All (${counts.all})` },
    { value: "hard-copy", label: `Hard copy (${counts["hard-copy"]})` },
    { value: "kindle", label: `Kindle (${counts.kindle})` },
    { value: "audible", label: `Audible (${counts.audible})` },
  ];

  const filteredBooks = searchFilteredBooks.filter((book) => {
    switch (formatFilter) {
      case "hard-copy":
        return !book.kindle && !book.audible;
      case "kindle":
        return book.kindle;
      case "audible":
        return book.audible;
      case "all":
      default:
        return true;
    }
  });

  return (
    <>
      <div className="mb-8">
        {/*To remove search for mobile: hidden lg:block */}
        <div className="flex flex-col md:flex-row">
          <Input
            className="rounded-md border border-gray-200 bg-white px-8 py-2 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-800 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-primary dark:focus:ring-primary"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by title or author"
          />
          <div className="flex flex-row items-center space-x-2 w-48 md:justify-end pt-2 md:pt-0">
            <Select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              options={formatOptions}
            />
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
  );
};
