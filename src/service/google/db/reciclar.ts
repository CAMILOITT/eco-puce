import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import type { UserHistory } from "../../../types/history.type"
import { db } from "../config"

export async function getHistory(userId: string): Promise<UserHistory[]> {
  const historiesRef = collection(db, "users", userId, "histories")
  const q = query(historiesRef, orderBy("date", "desc"))
  const snapshot = await getDocs(q)
  const result = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as { date: Timestamp; points: number }),
  }))
  return result
}

export async function getRanking(topN: number) {
  const usersRef = collection(db, "users")
  const q = query(usersRef, orderBy("totalPoints", "desc"), limit(topN))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as {
      name: string
      totalPoints: number
      totalBottles: number
    }),
  }))
}

export async function registerBottle(userId: string, points: number) {
  try {
    const userRef = doc(db, "users", userId)
    const historiesRef = collection(userRef, "histories")
    await addDoc(historiesRef, {
      date: serverTimestamp(),
      points,
    })
    await updateDoc(userRef, {
      totalBottles: increment(1),
      totalPoints: increment(points),
    })
  } catch (error) {}
}

export async function getUserPosition(userId: string) {
  const usersRef = collection(db, "users")
  const q = query(usersRef, orderBy("totalPoints", "desc"))
  const snapshot = await getDocs(q)

  const list = snapshot.docs.map((doc, index) => {
    const data = doc.data() as {
      name: string
      totalPoints: number
      totalBottles: number
    }

    return {
      position: index + 1,
      id: doc.id,
      name: data.name,
      totalPoints: data.totalPoints,
      totalBottles: data.totalBottles,
    }
  })

  return list.find(user => user.id === userId) ?? null
}
