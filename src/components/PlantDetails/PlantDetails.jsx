import { useNavigate, useParams } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import { useState, useEffect, useContext } from "react"
import * as plantService from "../../services/plantService"
import { Link } from "react-router-dom"

import "./plantDetails.sass"

import WaterForm from "../WhenToWater/WhenToWater"
import FertForm from "../WhenToFertilize/WhenToFertilize"

const PlantDetails = (props) => {
  const [plant, setPlant] = useState(null)
  const [isWaterFormVisible, setIsWaterFormVisible] = useState(false)
  const [isFertFormVisible, setIsFertFormVisible] = useState(false)

  const user = useContext(AuthedUserContext)
  const { plantId } = useParams()

  const navigate = useNavigate()

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
  }

  const handleAddFertilizer = async (plantFormData) => {
    const plantFertilizer = await plantService.createFertilizer(
      plantId,
      plantFormData
    )
    setPlant(plant)
    fetchPlant()
    toggleFertVisibility()
  }

  const handleDeleteFertilizer = async (fertilizerId) => {
    const deletedFertilizer = await plantService.deleteFertilizer(plantId, fertilizerId)
    setPlant({...plant, whenToFertilize: plant.whenToFertilize.filter((fertilize) => fertilize._id !== deletedFertilizer._id)})
    fetchPlant()
  }

  const handleDeleteWater = async (waterId) => {
    const deletedWater = await plantService.deleteWater(plantId, waterId)
    setPlant({...plant, whenToWater: plant.whenToWater.filter((water) => water._id !== deletedWater._id)})
    fetchPlant()
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
            <p>
            {/* see attributions section  */}
            {fertilize.dateOfDay.match(/.{10}/)}
            </p>
            <div>
              <Link to={`/plants/${plantId}/fertilize/${fertilize._id}/edit`} >
                <button>Edit Fertilizer Schedule</button>
              </Link>
                <button onClick={() => handleDeleteFertilizer(fertilize._id)}>Delete Fertilizer Schedule</button>
            </div>
          </article>
        ))}
          {!plant.whenToFertilize.length && (
            <div>
              <button onClick={toggleFertVisibility}>Add Fertilizer Schedule</button>
              {isFertFormVisible && <FertForm handleAddFertilizer={handleAddFertilizer} /> }
            </div>
          )}
      </section>

      <section>
        <h4>When to Water:</h4>
        {plant.whenToWater.map((water) => (
          <article key={water._id}>
            <header>
              <p>Water every {water.dateOfDay} days</p>
            </header>
            <p>Notes: {water.conditionOfSoil}</p>
            <div>
            <Link to={`/plants/${plantId}/water/${water._id}/edit`} >
              <button>Edit Water Schedule</button>
            </Link>
              <button onClick={() => handleDeleteWater(water._id)}>Delete Water Schedule</button>
            </div>
          </article>
        ))}
          {!plant.whenToWater.length && (
            <div>
              <button onClick={toggleWaterVisibility}>Add Water Schedule</button>
              {isWaterFormVisible && <WaterForm handleAddWater={handleAddWater} />}
            </div>
          )}

      </section>

      <Link to={`/plants/${plantId}/edit`}>Edit Plant</Link>
      <button onClick={() => props.handleDeletePlant(plantId)}>Delete</button>
    </main>
  )
}

export default PlantDetails
