import { useEffect, useRef, useState } from "react"
import { Link } from "wouter"
import { detectBottles, loadModel } from "./bottleAI"
import css from "./Camera.module.css"

interface PropCamera {}

export default function Camera({}: PropCamera) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [streaming, setStreaming] = useState(false)
  // const [lastEmbedding, setLastEmbedding] = useState<number[] | null>(null)
  const [result, setResult] = useState<string>("")
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  )
  const dialogRef = useRef<null | any>(null)

  // const [loading, SetLoading] = useState(false)

  useEffect(() => {
    startCamera()
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

  async function switchCamera() {
    // Detener cámara actual si está activa
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setStreaming(false)
    }
    setFacingMode(prev => (prev === "user" ? "environment" : "user"))
    // Esperar a que facingMode cambie y luego iniciar cámara
    const idTime = setTimeout(() => {
      startCamera()
    }, 200)
    return () => {
      clearTimeout(idTime)
    }
  }

  async function takePhoto() {
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
        console.log("Detectando botellas...")
        console.log(img.src)
        console.log(await detectBottles(await loadModel(), img))
        setResult("registrando botella")
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

  // function stopCamera() {
  //   if (videoRef.current && videoRef.current.srcObject) {
  //     const stream = videoRef.current.srcObject as MediaStream
  //     stream.getTracks().forEach(track => track.stop())
  //     videoRef.current.srcObject = null
  //     setStreaming(false)
  //   }
  // }

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
        <>
          <div className={css.interactive_btn}>
            <button onClick={takePhoto}>Tomar foto</button>
            <button onClick={switchCamera}>
              Cambiar a cámara {facingMode === "user" ? "trasera" : "frontal"}
            </button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Link to="/dashboard" className={css.back}>
        dash
      </Link>
      <dialog ref={dialogRef} className={css.dialog}>
        validando imagen...
        <div style={{ marginTop: 8, fontWeight: "bold" }}>
          resultado: {result}
        </div>
        {photo && (
          <div>
            <h4>Foto tomada:</h4>
            <img
              src={photo}
              alt="Foto tomada"
              style={{ width: 320, height: 240 }}
            />
          </div>
        )}
      </dialog>
    </main>
  )
}
