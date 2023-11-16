export interface OngoingBook {
  title: string
  author: string
  start: Date
  cover: string
} 

export interface Book extends OngoingBook {
  rating: number
  end: Date
  externalLink: string
  cover: string
}

export interface Bookshelf {
  archive: Book[]
  current: OngoingBook[]
}
