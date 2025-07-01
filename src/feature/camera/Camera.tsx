import { useRef, useState } from "react"
import { getImageEmbedding, cosineSimilarity } from "./bottleAI"

interface PropCamera {}

export default function Camera({}: PropCamera) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [streaming, setStreaming] = useState(false)
  const [lastEmbedding, setLastEmbedding] = useState<number[] | null>(null)
  const [result, setResult] = useState<string>("")
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  )

  const startCamera = async () => {
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

  const switchCamera = async () => {
    // Detener cámara actual si está activa
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setStreaming(false)
    }
    setFacingMode(prev => (prev === "user" ? "environment" : "user"))
    // Esperar a que facingMode cambie y luego iniciar cámara
    setTimeout(() => {
      startCamera()
    }, 200)
  }

  const takePhoto = async () => {
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
        // Analizar la botella
        const embedding = await getImageEmbedding(canvasRef.current)
        if (lastEmbedding) {
          const similarity = cosineSimilarity(lastEmbedding, embedding)
          setResult(
            similarity > 0.85 ? "Es la misma botella" : "Es diferente botella",
          )
        } else {
          setResult("Primera botella registrada")
        }
        setLastEmbedding(embedding)
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setStreaming(false)
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
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        {!streaming && <button onClick={startCamera}>Iniciar cámara</button>}
        <button onClick={switchCamera}>
          Cambiar a cámara {facingMode === "user" ? "trasera" : "frontal"}
        </button>
      </div>
      <video ref={videoRef} autoPlay style={{ width: 320, height: 240 }} />
      {streaming && (
        <>
          <div>
            <button onClick={takePhoto}>Tomar foto</button>
            <button onClick={stopCamera}>Detener cámara</button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
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
      <div style={{ marginTop: 8, fontWeight: "bold" }}>
        resultado: {result}
      </div>
    </div>
  )
}
