import { useParams } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import { useState, useEffect, useContext } from "react"
import * as plantService from "../../services/plantService"
import { Link } from "react-router-dom"

const PlantDetails = (props) => {
  const { plantId } = useParams()

  const [plant, setPlant] = useState(null)

  const user = useContext(AuthedUserContext)

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
      <h1>{plant.name}</h1>
      <img src={plant.img} alt={plant.name} />
      <p>Light (hrs/day): {plant.howMuchSun}</p>
      <p>Type of Light: {plant.typeOfLight}</p>
      <p>Best Season to Plant: {plant.bestSeasonToPlant}</p>
      <p>Indoor/Outdoor: {plant.indoorOutdoor}</p>
      <p>Grow Time: {plant.growTime}</p>
      <p>When to Fertilize: {plant.whenToFertilize}</p>
      <p>Date of Day to Fertilize: {plant.dateOfDay}</p>
      <p>When to Water: {plant.whenToWater}</p>
      <p>Date of Day to Water: {plant.dateOfDay}</p>
      <p>Condition of Soil: {plant.conditionOfSoil}</p>

      <Link to={`/plants/${plantId}/edit`}>Edit Plant</Link>
      <button onClick={() => props.handleDeletePlant(plantId)}>Delete</button>
    </main>
  )
}

export default PlantDetails
