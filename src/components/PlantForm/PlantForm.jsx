import { useState } from "react"

const PlantForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    whenToWater: [],
    whenToFertilize: [],
    howMuchSun: "",
    typeOfLight: "",
    bestSeasonToPlant: "",
    indoorOutdoor: "Indoor",
    growTime: "",
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleAddPlant(formData)
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          required
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="img">Image:</label>
        <input
          required
          type="text"
          id="img"
          name="img"
          onChange={handleChange}
        />
        <label htmlFor="whenToWater">When to Water:</label>
        <input
          id="whenToWater"
          name="whenToWater"
          value={formData.whenToWater}
          onChange={handleChange}
        />
        <label htmlFor="whenToFertilize">When to Fertilize:</label>
        <input
          id="whenToFertilize"
          name="whenToFertilize"
          value={formData.whenToFertilize}
          onChange={handleChange}
        />
        <label htmlFor="howMuchSun">How Much Sun:</label>
        <input
          type="text"
          id="howMuchSun"
          name="howMuchSun"
          value={formData.howMuchSun}
          onChange={handleChange}
        />
        <label htmlFor="typeOfLight">Type of Light:</label>
        <input
          type="text"
          id="typeOfLight"
          name="typeOfLight"
          value={formData.typeOfLight}
          onChange={handleChange}
        />
        <label htmlFor="bestSeasonToPlant">Best Season to Plant:</label>
        <input
          type="text"
          id="bestSeasonToPlant"
          name="bestSeasonToPlant"
          value={formData.bestSeasonToPlant}
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
        <label htmlFor="growTime">Grow Time:</label>
        <input
          type="text"
          id="growTime"
          name="growTime"
          value={formData.growTime}
          onChange={handleChange}
        />
        <button type="submit">Submit Plant</button>
      </form>
    </main>
  )
}

export default PlantForm
