import { useState, createContext, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import Landing from "./components/Landing/Landing"
import Dashboard from "./components/Dashboard/Dashboard"
import SignupForm from "./components/SignupForm/SignupForm"
import SigninForm from "./components/SigninForm/SigninForm"
import * as authService from "../src/services/authService"
import PlantList from "./components/PlantList/PlantList"
import * as plantService from "./services/plantService"
import PlantDetails from "./components/PlantDetails/PlantDetails"
import PlantForm from "./components/PlantForm/PlantForm"

export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser()) // using the method from authservice
  const [plants, setPlants] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllPlants = async () => {
      const plantsData = await plantService.index()
      setPlants(plantsData)
    }
    if (user) fetchAllPlants()
  }, [user])

  const handleAddPlant = async (plantFormData) => {
    const newPlant = await plantService.create(plantFormData)
    setPlants([newPlant, ...plants])
    navigate("/plants")
  }

  const handleDeletePlant = async (plantId) => {
    const deletedPlant = await plantService.deletePlant(plantId)
    setPlants(plants.filter((plant) => plant._id !== deletedPlant._Id))
    navigate("/plants")
  }

  const handleUpdatePlant = async (plantId, plantFormData) => {
    const updatedPlant = await plantService.update(plantId, plantFormData)
    setPlants(
      plants.map((plant) => (plantId === plant._id ? updatedPlant : plant))
    )
    navigate(`plants/${plantId}`)
  }

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/plants" element={<PlantList plants={plants} />} />
              <Route
                path="/plants/:plantId"
                element={<PlantDetails handleDeletePlant={handleDeletePlant} />}
              />
              <Route
                path="/plants/new"
                element={<PlantForm handleAddPlant={handleAddPlant} />}
              />
              <Route
                path="/plants/:plantId/edit"
                element={<PlantForm handleUpdatePlant={handleUpdatePlant} />}
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  )
}

export default App
