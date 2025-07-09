import { IconCameraRotate, IconPhotoSensor } from "@tabler/icons-react"
import css from "./InteractiveBtn.module.css"

interface PropInteractiveBtn {
  videoRef: React.RefObject<HTMLVideoElement | null>
  setStreaming: React.Dispatch<React.SetStateAction<boolean>>
  startCamera: () => void
  takePhoto: () => void
  setFacingMode: React.Dispatch<React.SetStateAction<"user" | "environment">>
}

export default function InteractiveBtn({
  videoRef,
  setStreaming,
  startCamera,
  setFacingMode,
  takePhoto,
}: PropInteractiveBtn) {
  async function switchCamera() {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
      setStreaming(false)
    }
    setFacingMode(prev => (prev === "user" ? "environment" : "user"))
    const idTime = setTimeout(() => {
      startCamera()
    }, 200)

    return () => {
      clearTimeout(idTime)
    }
  }
  return (
    <div className={css.interactive_btn}>
      <button onClick={takePhoto} className={css.take_photo}>
        <IconPhotoSensor />
      </button>
      <button onClick={switchCamera} className={css.change_camera}>
        <IconCameraRotate />
      </button>
    </div>
  )
}
