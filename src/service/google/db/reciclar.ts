export function getHistory() {
  return [
    {
      id: "1",
      date: "2023-10-01",
      points: 10,
      bottles: 5,
    },
    {
      id: "2",
      date: "2023-10-02",
      points: 20,
      bottles: 10,
    },
    {
      id: "3",
      date: "2023-10-03",
      points: 30,
      bottles: 15,
    },
  ]
}

export function getRanking() {
  return [
    {
      id: "1",
      name: "Usuario 1",
      points: 100,
    },
    {
      id: "2",
      name: "Usuario 2",
      points: 90,
    },
    {
      id: "3",
      name: "Usuario 3",
      points: 80,
    },
  ]
}

export function getRecyclingPoints() {
  return [
    {
      id: "1",
      name: "Punto de Reciclaje 1",
      location: "Ubicación 1",
      bottlesCollected: 100,
    },
    {
      id: "2",
      name: "Punto de Reciclaje 2",
      location: "Ubicación 2",
      bottlesCollected: 200,
    },
    {
      id: "3",
      name: "Punto de Reciclaje 3",
      location: "Ubicación 3",
      bottlesCollected: 300,
    },
  ]
}

export function getUserProfile() {
  return {
    id: "1",
    name: "Usuario Ejemplo",
    email: "prueba@outlook.com",
  }
}

export function insertRecyclingData(data: any) {
  // Simulate inserting data into a database
  console.log("Inserting recycling data:", data)
  return { success: true, message: "Data inserted successfully" }
}

export function updateRecyclingData(id: string, data: any) {
  // Simulate updating data in a database
  console.log(`Updating recycling data with id ${id}:`, data)
  return { success: true, message: "Data updated successfully" }
}

export function deleteRecyclingData(id: string) {
  // Simulate deleting data from a database
  console.log(`Deleting recycling data with id ${id}`)
  return { success: true, message: "Data deleted successfully" }
}

export function getRecyclingDataById(id: string) {
  // Simulate fetching data by ID from a database
  console.log(`Fetching recycling data with id ${id}`)
  return {
    id: id,
    name: "Punto de Reciclaje Ejemplo",
    location: "Ubicación Ejemplo",
    bottlesCollected: 150,
  }
}

export function getUserConfiguration() {
  // Simulate fetching user configuration
  return {
    theme: "light",
    notificationsEnabled: true,
  }
}
