import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { auth } from "./config"

const provider = new GoogleAuthProvider()

export async function login(redirect: () => void) {
  await signInWithRedirect(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result
      console.log("User signed in:", user)
      console.log("Google Access Token:", token)
      redirect()
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      // const email = error.customData.email
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error)
      console.error("Error during Google Sign-In:", errorCode, errorMessage)
      // ...
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
