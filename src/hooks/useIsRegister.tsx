import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { auth } from "../service/google/config"

export function useIsRegister() {
  const [Login, setLogin] = useState(false)

  function checkSession(callback: (user: any) => void) {
    onAuthStateChanged(auth, user => {
      if (user) {
        callback(user)
      } else {
      }
    })
  }

  return { checkSession }
}

//  https://www.fixtergeek.com/blog/5-buenas-practicas-en-react-que-debes-conocer/
//  https://medium.com/womenintechnology/react-hooks-best-practices-unlocking-efficiency-and-elegance-da23f7e1418a
//
//
