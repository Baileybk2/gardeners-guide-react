import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as plantService from "../../services/plantService"

const PlantDetails = (props) => {
  const { plantId } = useParams()

  const [plant, setPlant] = useState(null)

  useEffect(() => {
    const fetchPlant = async () => {
      const plantData = await plantService.show(plantId)
      console.log("plantData:", plantData)
      setPlant(plantData)
    }
    fetchPlant()
  }, [plantId])

  console.log("plant state:", plant)

  if (!plant) return <main>Loading...</main>
  return (
    <main>
      <header>
        <h1>{plant.name}</h1>
        <p>{plant.img}</p>
      </header>
      <p>Details:</p>
    </main>
  )
}

export default PlantDetails
