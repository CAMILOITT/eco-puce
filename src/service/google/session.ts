import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { auth } from "./config"

const provider = new GoogleAuthProvider()

export async function login(redirect: () => void) {
  await signInWithRedirect(auth, provider)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result
      // console.log("User signed in:", user)
    })
    .then(() => redirect())
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error("Error during Google Sign-In:", errorCode, errorMessage)
    })
}

export async function logout() {
  await auth
    .signOut()
    .then(() => {
      console.log("User signed out successfully.")
    })
    .catch(error => {
      console.error("Error signing out:", error)
    })
}
