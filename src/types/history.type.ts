import type { Timestamp } from "firebase/firestore"

export interface UserHistory {
  id: string
  date: Timestamp
  points: number
}
