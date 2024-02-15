import { Button } from "react-bootstrap"

interface NavBarLogOutProps {
    onSignupClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLogOut = ({onSignupClicked, onLoginClicked}:NavBarLogOutProps) => {
    return (
        <>
        <Button onClick={onLoginClicked}>Log in</Button>
        <Button onClick={onSignupClicked}>Sign up</Button>
        </>
    )
}

export default NavBarLogOut