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

  console.log("formData", formData)

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
      <form onSubmit={handleSubmit}>
        <h2>Create a plant!</h2>
        <fieldset className="container">
          <label htmlFor="name">Name:</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="img">Image URL:</label>
          <input
            required
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
          <br />
          <br />
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
          <br />
          <br />
          <label htmlFor="howMuchSun">Light (hrs/day):</label>
          <input
            type="number"
            id="howMuchSun"
            name="howMuchSun"
            value={formData.howMuchSun || ""}
            onChange={handleChange}
          />
          <br />
          <br />
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
          <br />
          <br />
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
          <br />
          <br />
          <label htmlFor="growTime">Grow Time (years to maturity):</label>
          <input
            type="text"
            id="growTime"
            name="growTime"
            value={formData.growTime || ""}
            onChange={handleChange}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  )
}

export default PlantForm
