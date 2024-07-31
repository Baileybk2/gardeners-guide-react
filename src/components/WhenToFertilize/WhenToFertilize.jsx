import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as plantService from "../../services/plantService"

const FertForm = (props) => {
  const [formData, setFormData] = useState({
    dateOfDay: "",
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleAddFertilizer(formData)
    setFormData({ dateOfDay: "" })
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
