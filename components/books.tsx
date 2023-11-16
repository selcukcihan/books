import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Book } from "../core/model"

export default function Component({ books }: { books: Book[]}) {
  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#1f2937]">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">{"Books I've Read"}</h2>
          <div className="py-5">
            <div className="grid md:grid-cols-3 gap-6">
              <Input
                className="p-2 rounded-md border border-gray-300 w-full"
                placeholder="Search by name"
                type="text"
              />
              <Input
                className="p-2 rounded-md border border-gray-300 w-full"
                placeholder="Search by author"
                type="text"
              />
              <Input
                className="p-2 rounded-md border border-gray-300 w-full"
                placeholder="Search by rating"
                type="number"
              />
            </div>
          </div>
          <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Book Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date Started</TableHead>
                  <TableHead>Date Finished</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {books.map((book, index) => (
                  <TableRow key={index} className="dark:text-gray-400">
                    <TableCell className="pl-4">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.rating}/10</TableCell>
                    <TableCell>{book.start.toDateString()}</TableCell>
                    <TableCell>{book.end.toDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}