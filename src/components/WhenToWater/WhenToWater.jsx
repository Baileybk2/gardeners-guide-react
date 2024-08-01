import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import * as plantService from "../../services/plantService"

const WaterForm = (props) => {
  const [formData, setFormData] = useState({
    dateOfDay: "",
    conditionOfSoil: "",
  })
  const navigate = useNavigate()

  const { plantId, whenToWaterId } = useParams()

  useEffect(() => {
    const fetchPlant = async () => {
      const plantData = await plantService.show(plantId)
      setFormData(
        plantData.whenToWater.find((water) => water._id === whenToWaterId)
      )
    }
    if (plantId && whenToWaterId) fetchPlant()
  }, [plantId, whenToWaterId])

  console.log(whenToWaterId)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (plantId && whenToWaterId) {
      plantService.updateWater(plantId, whenToWaterId, formData)
      const updatedPlant = await plantService.show(plantId)
      setFormData(
        updatedPlant.whenToWater.find((water) => water._id === whenToWaterId)
      )
      navigate(`/plants/${plantId}`)
    } else {
      props.handleAddWater(formData)
      setFormData({
        dateOfDay: "",
        conditionOfSoil: "",
      })
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>When to Water!</legend>
          <label htmlFor="dateOfDay">
            Water every &nbsp;
            <input
              required
              type="number"
              id="dateOfDay"
              name="dateOfDay"
              min="1"
              max="31"
              value={formData.dateOfDay}
              onChange={handleChange}
            />
            &nbsp; day(s).
          </label>
          <br />
          <br />
          <label htmlFor="conditionOfSoil">Notes: &nbsp;</label>
          <textarea
            required
            type="text"
            id="conditionOfSoil"
            name="conditionOfSoil"
            value={formData.conditionOfSoil}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  )
}

export default WaterForm
