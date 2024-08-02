import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as plantService from "../../services/plantService"

const PlantForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    img: "https://cdn-icons-png.flaticon.com/512/739/739249.png",
    whenToWater: [],
    whenToFertilize: [],
    howMuchSun: "",
    typeOfLight: "Direct Sunlight",
    bestSeasonToPlant: "Spring",
    indoorOutdoor: "Indoor",
    growTime: "",
  })

  const { plantId } = useParams()

  useEffect(() => {
    const fetchPlant = async () => {
      const plantData = await plantService.show(plantId)
      setFormData(plantData)
    }
    if (plantId) fetchPlant()
  }, [plantId])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (plantId) {
      props.handleUpdatePlant(plantId, formData)
    } else {
      props.handleAddPlant(formData)
    }
  }

  return (
    <main>
      <form className="form-center" onSubmit={handleSubmit}>
        <h2>Create a Plant!</h2>
        <div className="container-plant">
          <label htmlFor="name">Name:</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="img">Image URL:</label>
          <input
            required
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
          <label htmlFor="indoorOutdoor">Indoor/Outdoor:</label>
            <select
              id="indoorOutdoor"
              name="indoorOutdoor"
              value={formData.indoorOutdoor}
              onChange={handleChange}
            >
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          <label htmlFor="howMuchSun">Light (hrs/day):</label>
            <input
              type="number"
              id="howMuchSun"
              name="howMuchSun"
              value={formData.howMuchSun || ""}
              onChange={handleChange}
            />
          <label htmlFor="typeOfLight">Type of Light:</label>
            <select
              id="typeOfLight"
              name="typeOfLight"
              value={formData.typeOfLight}
              onChange={handleChange}
            >
              <option value="Direct Sunlight">Direct Sunlight</option>
              <option value="Indirect Light">Indirect Light</option>
              <option value="Medium Light">Medium Light</option>
              <option value="Low Light">Low Light</option>
              <option value="Full Sun">Full Sun</option>
              <option value="Partial Sun">Partial Sun</option>
              <option value="Full Shade">Full Shade</option>
            </select>
          <label htmlFor="bestSeasonToPlant">Best Season to Plant:</label>
            <select
              id="bestSeasonToPlant"
              name="bestSeasonToPlant"
              value={formData.bestSeasonToPlant}
              onChange={handleChange}
            >
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>
          <label htmlFor="growTime">Grow Time (years to maturity):</label>
            <input
              type="text"
              id="growTime"
              name="growTime"
              value={formData.growTime || ""}
              onChange={handleChange}
            />
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  )
}

export default PlantForm
