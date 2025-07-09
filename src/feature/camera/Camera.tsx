import { IconChevronsLeft } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "wouter"
import { auth } from "../../service/google/config"
import { registerBottle } from "../../service/google/db/reciclar"
import { login } from "../../service/google/session"
import { detectBottles, loadModel } from "./bottleAI"
import css from "./Camera.module.css"
import InteractiveBtn from "./interactiveBtn/InteractiveBtn"
import Loading from "./loading/Loading"

interface PropCamera {}

export default function Camera({}: PropCamera) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [_, setPhoto] = useState<string>("")
  const [streaming, setStreaming] = useState(false)
  // const [lastEmbedding, setLastEmbedding] = useState<number[] >(null)
  const [result, setResult] = useState<string>("")
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  )
  const dialogRef = useRef<null | any>(null)
  const [loading, setLoading] = useState(false)
  const [hasBottle, setHasBottle] = useState(false)
  const [_, navigate] = useLocation()

  const dialogAuthRef = useRef<HTMLDialogElement | null>(null)

  // const [loading, SetLoading] = useState(false)

  useEffect(() => {
    startCamera()

    if (!auth.currentUser) {
      dialogAuthRef.current?.showModal()
    } else {
      dialogAuthRef.current?.close()
    }
  }, [])

  async function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setStreaming(true)
        }
      } catch (err) {
        alert("No se pudo acceder a la cámara")
      }
    }
  }

  async function takePhoto() {
    setLoading(true)
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
    if (videoRef.current && canvasRef.current) {
      const width = videoRef.current.videoWidth
      const height = videoRef.current.videoHeight
      canvasRef.current.width = width
      canvasRef.current.height = height
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        const dataUrl = canvasRef.current.toDataURL("image/png")
        setPhoto(dataUrl)
        const img: HTMLImageElement = new Image()
        img.src = dataUrl
        // Obtener embedding de la imagen
        // const embedding = await getImageEmbedding(img)
        const detections = await detectBottles(await loadModel(), img)
        if (detections && detections.length > 0) {
          setResult("Botella detectada en la imagen")
          setHasBottle(true)
          if (!auth.currentUser?.uid)
            throw new Error("no se pudo obtener al usuario")
          await registerBottle(auth.currentUser?.uid, 2)
        } else {
          setResult("No se detectó una botella visible en la foto")
          setHasBottle(false)
        }

        setLoading(false)
        // if (!hasBottleInImage(embedding)) {
        //   setResult("No se detectó una botella visible en la foto")
        //   return
        // }
        // if (lastEmbedding) {
        //   const similarity = cosineSimilarity(lastEmbedding, embedding!)
        //   setResult(
        //     similarity > 0.85 ? "Es la misma botella" : "Es diferente botella",
        //   )
        // } else {
        //   setResult("Primera botella registrada")
        // }
        // setLastEmbedding(embedding!)
      }
    }
  }

  /*
   ver cuantas cámaras tiene el dispositivo
  
navigator.mediaDevices.enumerateDevices().then(devices => {
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  console.log(videoDevices);
});

  */

  return (
    <main className={css.main}>
      <video ref={videoRef} autoPlay className={css.video} />
      {streaming && (
        <InteractiveBtn
          setFacingMode={setFacingMode}
          setStreaming={setStreaming}
          startCamera={startCamera}
          takePhoto={takePhoto}
          videoRef={videoRef}
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Link to="/dashboard" className={css.back}>
        <IconChevronsLeft />{" "}
      </Link>
      <dialog ref={dialogRef} className={css.dialog}>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <p style={{ marginTop: 8, fontWeight: "bold" }}>{result}</p>
            <div>
              <button
                onClick={() => {
                  if (dialogRef.current) {
                    dialogRef.current.close()
                  }
                }}>
                tomar otra foto
              </button>
              {hasBottle && (
                <button
                  onClick={() => {
                    navigate("/dashboard")
                  }}>
                  {" "}
                  ir al inicio
                </button>
              )}
            </div>
          </div>
        )}
      </dialog>

      <dialog ref={dialogAuthRef} className={css.dialog}>
        <p>
          para utilizar este servicio necesitas iniciar session con una cuenta
          de google
        </p>
        <button
          onClick={() => {
            login()
            dialogAuthRef.current?.close()
          }}>
          iniciar session con google
        </button>
      </dialog>
    </main>
  )
}
