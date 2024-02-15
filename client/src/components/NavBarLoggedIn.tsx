import { Button, Navbar } from "react-bootstrap"
import { User } from "../models/user"
import * as UserApi from "../network/users_api"

interface NavBarLogInProps {
    user: User,
    onLogoutSuccesful: () => void,
}

const NavBarLogIn = ({user, onLogoutSuccesful}:NavBarLogInProps) => {
    
    async function logout() {
        try {
            await UserApi.logout()
            onLogoutSuccesful()
        } catch (error) {
           alert(error)
           console.error(error) 
        }
    }
    
    return (
        <>
        <Navbar.Text className="me-2">
            Signed in as: {user.username}
        </Navbar.Text>
        <Button onClick={logout}>Log out</Button>
        </>
    )
}

export default NavBarLogIn