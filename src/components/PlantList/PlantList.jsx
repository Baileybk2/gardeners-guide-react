import { Link } from "react-router-dom"

const fontColor = {
  color: '#F8F9F5'
}
const PlantList = (props) => {
  return (
    <>
      <h1 style={fontColor}>Your Plants</h1>
      <main className="container-list">
        {props.plants.plantList.map((plant, index) => (
          <Link key={index} to={`/plants/${plant._id}`}>
            <div className="plantContainer">
              <img src={plant.img} alt={plant.name} className="image"/>
                <div className="midTransition">
                  <div className="plantName">{plant.name}</div>
                </div>
            </div>
          </Link>
        ))}
      </main>
    </>
  )
}

export default PlantList
