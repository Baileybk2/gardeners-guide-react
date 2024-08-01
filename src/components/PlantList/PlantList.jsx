import { Link } from "react-router-dom"

const fontColor1 = {
  color: '#B1B5A5',
}

const fontColor2 = {
  color: '#F8F9F5'
}
const PlantList = (props) => {
  return (
    <>
      <h1 style={fontColor2}>Your Plants</h1>
      <main className="container">
        {props.plants.map((plant, index) => (
          <Link key={index} to={`/plants/${plant._id}`}>
            <h2>
              {plant.name} <img src={plant.img} alt={plant.name} />
            </h2>
          </Link>
        ))}
      </main>
    </>
  )
}

export default PlantList
