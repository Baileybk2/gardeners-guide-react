
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import * as authService from "../../services/authService"
import * as plantService from "../../services/plantService"

import SigninForm from "../SigninForm/SigninForm"
import SignupForm from "../SignupForm/SignupForm"

const Landing = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser()) // using the method from authservice
  const [isSigninFormVisible, setIsSigninFormVisible] = useState(false)
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(false)

  useEffect(() => {
    navigate("/")
  }, [user])

  const toggleSignInVisibility = () => {
    setIsSigninFormVisible(true)
    if (isSignupFormVisible) {
      setIsSignupFormVisible(false)
    }
    if (isSigninFormVisible) {
      setIsSigninFormVisible(false)
    }
  }

  const toggleSignupVisibility = () => {
    setIsSignupFormVisible(true)
    if (isSigninFormVisible) {
      setIsSigninFormVisible(false)
    }
    if (isSignupFormVisible) {
      setIsSignupFormVisible(false)
    }
  }
  
  return (
    <main>
      <div className="container">
        <h1>Gardener's Guide.</h1>
        <h3>Get started by signing in or signing up.</h3>
      </div>
      <div>
      {isSigninFormVisible ? (
          <div className="container-sign">
            <button onClick={toggleSignupVisibility}>Sign Up</button>
            <SigninForm setUser={setUser}/>
          </div>
      ) : (
        <div className="container-sign">
        <button onClick={toggleSignInVisibility}>Sign In</button>
        <SignupForm setUser={setUser}/>
        </div>
      )}
      </div>
    </main>
  
  )
}
export default Landing

