export interface OngoingBook {
  title: string
  author: string
  start: Date
  cover: string
  externalLink: string
} 

export interface Book extends OngoingBook {
  rating: number
  end: Date
  summary?: string
}

export interface Bookshelf {
  archive: Book[]
  current: OngoingBook[]
  chartData: { name: string, count: number }[]
  overview: string
}
