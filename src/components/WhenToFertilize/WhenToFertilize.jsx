import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as plantService from "../../services/plantService"

const FertForm = (props) => {
  const [formData, setFormData] = useState({
    dateOfDay: null,
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
    // if (plantId) {
    //   props.handleUpdatePlant(plantId, formData)
    // } else {
      props.handleAddFertilizer(formData)
    // }
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
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default FertForm
