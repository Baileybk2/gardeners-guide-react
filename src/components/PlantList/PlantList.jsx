import { Link } from "react-router-dom"

const PlantList = (props) => {
  return (
    <main>
      <h1>Your Plants</h1>
      {props.plants.map((plant, index) => (
        <Link key={index} to={`/plants/${plant._id}`}>
          <h2>
            {plant.name} <img src={plant.img} alt={plant.name} />
          </h2>
        </Link>
      ))}
    </main>
  )
}

export default PlantList
