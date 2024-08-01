import { Link } from "react-router-dom"
import { AuthedUserContext } from "../../App"
import { useContext } from "react"

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext)

  return (
    <>
      {user && (
        <nav className="navbar">
          <ul>
            <div>
              <li>
                <Link to="/plants">PLANTS</Link>
              </li>
              <li>
                <Link to="/plants/new">NEW PLANT</Link>
              </li>
            </div>
            <div>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="" onClick={handleSignout}>
                  SIGN OUT
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      )}
    </>
  )
}
export default NavBar
