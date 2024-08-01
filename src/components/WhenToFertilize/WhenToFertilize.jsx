import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as plantService from "../../services/plantService"

const FertForm = (props) => {
  const [formData, setFormData] = useState({
    dateOfDay: "",
  })
  const navigate = useNavigate()

  const { plantId, whenToFertilizeId } = useParams()

  useEffect(() => {
    const fetchPlant = async () => {
      const plantData = await plantService.show(plantId)
      setFormData(
        plantData.whenToFertilize.find(
          (fertilize) => fertilize._id === whenToFertilizeId
        )
      )
    }
    if (plantId && whenToFertilizeId) fetchPlant()
  }, [plantId, whenToFertilizeId])

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (plantId && whenToFertilizeId) {
      plantService.updateFertilizer(plantId, whenToFertilizeId, formData)
      const updatedPlant = await plantService.show(plantId)
      setFormData(
        updatedPlant.whenToFertilize.find(
          (fertilize) => fertilize._id === whenToFertilizeId
        )
      )
      navigate(`/plants/${plantId}`)
    } else {
      props.handleAddFertilizer(formData)
      setFormData({ dateOfDay: "" })
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>When to Fertilize!</legend>
          <label htmlFor="dateOfDay">Date: &nbsp;</label>
          <input
            required
            type="date"
            id="dateOfDay"
            name="dateOfDay"
            value={formData.dateOfDay}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  )
}

export default FertForm
