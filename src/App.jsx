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
import WaterForm from "./components/WhenToWater/WhenToWater"
import FertForm from "./components/WhenToFertilize/WhenToFertilize"
import "./app.sass"
import { useLocation } from "react-router-dom"

export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [plants, setPlants] = useState([])
  const location = useLocation()

  const navigate = useNavigate()

  const fetchAllPlants = async () => {
    const plantsData = await plantService.index()
    setPlants(plantsData)
  }

  useEffect(() => {
    if (user) fetchAllPlants()
  }, [user])

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.backgroundImage =
        "url('/assets/nicola-zhukov-YTgoKkpS5rg-unsplash.jpg')"
      document.body.style.backgroundSize = "cover"
      document.body.style.backgroundColor = ""
    } else {
      document.body.style.backgroundImage = ""
      document.body.style.backgroundColor = "#41602c"
    }
  }, [location.pathname])

  const handleAddPlant = async (plantFormData) => {
    await plantService.create(plantFormData)
    fetchAllPlants()
    navigate("/plants")
  }

  const handleDeletePlant = async (plantId) => {
    await plantService.deletePlant(plantId)
    fetchAllPlants()
    navigate("/plants")
  }

  const handleUpdatePlant = async (plantId, plantFormData) => {
    await plantService.update(plantId, plantFormData)
    fetchAllPlants()
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
              <Route
                path="/plants/:plantId/fertilize/:whenToFertilizeId/edit"
                element={<FertForm />}
              />
              <Route
                path="/plants/:plantId/water/:whenToWaterId/edit"
                element={<WaterForm />}
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
