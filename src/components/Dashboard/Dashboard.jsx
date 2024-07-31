import { AuthedUserContext } from "../../App"
import { useContext } from "react"
import './dashboard.sass'

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext)
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>This is your personalized garden profile.</p>
    </main>
  )
}

export default Dashboard
