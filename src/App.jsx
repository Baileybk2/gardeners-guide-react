import { useState, createContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import Landing from "./components/Landing/Landing"
import Dashboard from "./components/Dashboard/Dashboard"
import SignupForm from "./components/SignupForm/SignupForm"
import SigninForm from "./components/SigninForm/SigninForm"
import * as authService from "../src/services/authService"
import PlantList from "./components/PlantList/PlantList"
import * as plantService from "./services/plantService"

export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser()) // using the method from authservice
  const [plants, setPlants] = useState([])

  useEffect(() => {
    const fetchAllPlants = async () => {
      const plantsData = await plantService.index()
      setPlants(plantsData)
    }
    if (user) fetchAllPlants()
  }, [user])

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
