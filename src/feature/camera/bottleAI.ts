import * as cocossd from "@tensorflow-models/coco-ssd"
import * as mobilenet from "@tensorflow-models/mobilenet"
import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-backend-cpu"

// Cargar modelo preentrenado COCO-SSD
export async function loadModel() {
  const model = await cocossd.load()
  return model
}

// Detectar botellas en una imagen
export async function detectBottles(
  model: cocossd.ObjectDetection,
  imgElement: HTMLImageElement,
) {
  const predictions = await model.detect(imgElement)

  // Filtrar solo predicciones que sean botellas
  return predictions.filter(pred => pred.class === "bottle")
}

tf.setBackend("cpu")

let model: mobilenet.MobileNet | null = null

// export async function loadModel() {
//   if (!model) {
//     model = await mobilenet.load()
//   }
//   return model
// }

export async function getImageEmbedding(
  imageElement: HTMLImageElement | HTMLCanvasElement,
) {
  await loadModel()
  if (!model) throw new Error("Model not loaded")
  // Get the embedding from the intermediate layer
  // MobileNet returns a tensor of shape [1, 1024] for embeddings
  const embedding = model.infer(imageElement, true) as tf.Tensor
  const values = await embedding.data()
  embedding.dispose()
  return Array.from(values)
}

// export async function getImageEmbedding(
//   imageElement: HTMLImageElement | HTMLCanvasElement,
// ) {
//   await loadModel()
//   if (!model) throw new Error("Model not loaded")
//   // Get the embedding from the intermediate layer
//   // MobileNet returns a tensor of shape [1, 1024] for embeddings
//   const embedding = model.infer(imageElement, true) as tf.Tensor
//   const values = await embedding.data()
//   embedding.dispose()
//   return Array.from(values)
// }

export function cosineSimilarity(a: number[], b: number[]) {
  if (a.length !== b.length) return 0
  let dot = 0,
    normA = 0,
    normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}
