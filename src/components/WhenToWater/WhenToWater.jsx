import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as plantService from "../../services/plantService"

const WaterForm = (props) => {
  const [formData, setFormData] = useState({
    dateOfDay: "",
    conditionOfSoil: ""
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
      props.handleAddWater(formData)
    // }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>When to Water!</legend>
            <label htmlFor="dateOfDay">Water every &nbsp;
              <input
                required
                type="number"
                id="dateOfDay"
                name="dateOfDay"
                min = "1"
                max = "31"
                value={formData.dateOfDay}
                onChange={handleChange}
              /> 
              &nbsp; day(s).
            </label>
         <br /><br />
            <label htmlFor="conditionOfSoil">Notes: &nbsp;</label>
              <textarea 
                required
                type="text"
                id="conditionOfSoil"
                name="conditionOfSoil"
                value={formData.conditionOfSoil}
                onChange={handleChange}
              ></textarea>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default WaterForm
