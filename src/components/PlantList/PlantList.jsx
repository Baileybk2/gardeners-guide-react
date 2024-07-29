import { Link } from "react-router-dom"

const PlantList = (props) => {
  return (
    <main>
      {props.plants.map((plant) => (
        <Link key={plant._id} to={`/plants/${plant._id}`}>
          <h2>
            {plant.name} {plant.img}
          </h2>
        </Link>
      ))}
    </main>
  )
}

export default PlantList
