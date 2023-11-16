export interface OngoingBook {
  title: string
  author: string
  start: Date
} 

export interface Book extends OngoingBook {
  rating: number
  end: Date
}

export interface Bookshelf {
  archive: Book[]
  current: OngoingBook[]
}
