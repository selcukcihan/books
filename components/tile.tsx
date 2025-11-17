import { Button } from "@/components/ui/button";
import { Book } from "../core/model";
import Image from "next/image";
import Link from "next/link";

const MAX_TITLE_LENGTH = 40;

const truncateTitle = (title: string): string => {
  if (title.length <= MAX_TITLE_LENGTH) {
    return title;
  }
  return title.substring(0, MAX_TITLE_LENGTH) + "...";
};

const ArchivedBookTile = ({ book }: { book: Book }) => (
  <div className="flex">
    <div className="flex flex-1 items-center space-x-1">
      {[...Array(book.rating)].map((_, index) => (
        <StarIcon
          key={index}
          className="w-5 h-5 fill-zinc-900 dark:fill-zinc-50"
        />
      ))}
      {[...Array(5 - book.rating)].map((_, index) => (
        <StarIcon
          key={index + 5 - book.rating}
          className="w-5 h-5 fill-zinc-100 stroke-zinc-500 dark:fill-zinc-800 dark:stroke-zinc-400"
        />
      ))}
    </div>
    <div>
      {book.summary ? (
        <Link href={book.summary} target="#blank">
          <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-800 px-4 lg:px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-800/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-100/90 dark:focus-visible:ring-gray-300">
            Summary
          </Button>
        </Link>
      ) : null}
    </div>
  </div>
);

export default function Tile({ book }: { book: Book }) {
  const isTitleTruncated = book.title.length > MAX_TITLE_LENGTH;
  const displayTitle = truncateTitle(book.title);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 relative flex flex-col">
      <Link className="flex-1" href={book.externalLink} target="_blank">
        <div className="flex mb-4">
          <Image
            alt="Book Cover"
            width="640"
            height="640"
            className="w-16 h-24 rounded-md mr-4"
            src={book.cover}
          />
          <div className="flex-1 min-w-0 relative group">
            <h2 className="text-lg font-semibold">
              <span className="block">{displayTitle}</span>
            </h2>
            {isTitleTruncated && (
              <span className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 whitespace-normal max-w-xs">
                {book.title}
                <span className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></span>
              </span>
            )}
            <p className="text-gray-500 dark:text-gray-400">{book.author}</p>
          </div>
        </div>
      </Link>
      <div>
        {book.rating ? (
          <ArchivedBookTile book={book} />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Currently reading</p>
        )}
      </div>
    </div>
  );
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
  );
}
