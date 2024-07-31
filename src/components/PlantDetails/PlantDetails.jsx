import { useParams } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import { useState, useEffect, useContext } from "react"
import * as plantService from "../../services/plantService"
import { Link } from "react-router-dom"

import WaterForm from "../WhenToWater/WhenToWater"
import FertForm from "../WhenToFertilize/WhenToFertilize"

const PlantDetails = (props) => {
  const [plant, setPlant] = useState(null)
  const [isWaterFormVisible, setIsWaterFormVisible] = useState(false)
  const [isFertFormVisible, setIsFertFormVisible] = useState(false)
  const [isWaterFormSubmitted, setIsWaterFormSubmitted] = useState(false)
  const [isFertFormSubmitted, setIsFertFormSubmitted] = useState(false)

  const user = useContext(AuthedUserContext)
  const { plantId } = useParams()

  const fetchPlant = async () => {
    const plantData = await plantService.show(plantId)
    setPlant(plantData)
  }

  const toggleFertVisibility = () => {
    setIsFertFormVisible(true)
    if (isFertFormVisible) {
      setIsFertFormVisible(false)
    }
  }

  const toggleWaterVisibility = () => {
    setIsWaterFormVisible(true)
    if (isWaterFormVisible) {
      setIsWaterFormVisible(false)
    }
  }

  useEffect(() => {
    fetchPlant()
  }, [plantId])

  const handleAddWater = async (plantFormData) => {
    const plantWater = await plantService.createWater(plantId, plantFormData)
    setPlant({ ...plant, whenToWater: [...plant.whenToWater, plantWater] })
    fetchPlant()
    toggleWaterVisibility()
    setIsWaterFormSubmitted(true)
  }

  const handleAddFertilizer = async (plantFormData) => {
    const plantFertilizer = await plantService.createFertilzer(
      plantId,
      plantFormData
    )
    setPlant(plant)
    fetchPlant()
    toggleFertVisibility()
    setIsFertFormSubmitted(true)
  }

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

      <section>
        <h4>When to Fertilize:</h4>
        {plant.whenToFertilize.map((fertilize) => (
          <article key={fertilize._id}>
            {/* see attributions section  */}
            {fertilize.dateOfDay.match(/.{10}/)}
          </article>
        ))}
      </section>

      <section>
        <h4>When to Water:</h4>
        {plant.whenToWater.map((water) => (
          <article key={water._id}>
            <header>
              <p>Water every {water.dateOfDay} days</p>
            </header>
            <p>Notes: {water.conditionOfSoil}</p>
          </article>
        ))}
      </section>

      {isFertFormSubmitted ? (
        <button onClick={toggleFertVisibility}>Edit Fertilizer Schedule</button>
      ) : (
        <button onClick={toggleFertVisibility}>Add Fertilizer Schedule</button>
      )}
      {isFertFormVisible && (
        <FertForm handleAddFertilizer={handleAddFertilizer} />
      )}

      {isWaterFormSubmitted ? (
        <button onClick={toggleWaterVisibility}>Edit Water Schedule</button>
      ) : (
        <button onClick={toggleWaterVisibility}>Add Water Schedule</button>
      )}
      {isWaterFormVisible && <WaterForm handleAddWater={handleAddWater} />}

      <Link to={`/plants/${plantId}/edit`}>Edit Plant</Link>
      <button onClick={() => props.handleDeletePlant(plantId)}>Delete</button>
    </main>
  )
}

export default PlantDetails
