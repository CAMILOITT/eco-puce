import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { app, db } from "./config"

const auth = getAuth()

export async function saveUserData() {
  const user = auth.currentUser
  if (user) {
    const userRef = doc(db, "users", user.uid) // Referencia al documento del usuario
    await setDoc(
      userRef,
      {
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
      },
      { merge: true },
    )
  }
}

export async function login(redirect?: () => void) {
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    await saveUserData()

    redirect?.()
  } catch (error) {
    console.error("Error en la autenticación:", error)
  }
}

export async function handleRedirectLogin() {
  const result = await getRedirectResult(auth)
  if (result && result.user) {
    const user = result.user
    await ensureUserInFirestore(user)
    return user.uid
  }
  return null
}

async function ensureUserInFirestore(user: {
  uid: string
  displayName: string | null
}) {
  const userRef = doc(db, "users", user.uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      name: user.displayName ?? "Sin nombre",
      totalPoints: 0,
      totalBottles: 0,
    })
  }
}

export async function logout() {
  await signOut(auth).catch(error => {
    console.error("Error signing out:", error)
  })
}
