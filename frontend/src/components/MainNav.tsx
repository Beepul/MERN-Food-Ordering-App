import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UsernameMenu from "./UsernameMenu"
import { Link } from "react-router-dom"


type Props = {
  isHome?: boolean;
}

function MainNav({isHome}:Props) {

  const { loginWithRedirect, isAuthenticated } = useAuth0()
  return (
    <span className="flex space-x-2 items-center">
      {
        isAuthenticated ?
        <>
          <Link to={'/order-status'} className={`font-bold ${isHome ? 'text-white' : 'text-gray-900'} hover:text-orange-500 transition-all duration-300`}>
            Order Status
          </Link>
          <UsernameMenu isHome={isHome} />
        </> 
        : 
        <Button 
          onClick={async () => await loginWithRedirect()}
          variant={'ghost'} 
          className={`${isHome && 'text-white border border-white'} font-bold hover:text-orange-500 hover:bg-white`}>
          Log In
        </Button>
      }
    </span>
  )
}

export default MainNav
