import LoginButton from "../../components/Auth/LoginButton";
import { AppBar, Toolbar, Button } from "@mui/material";
import Fold from "./sections/Fold";
import bkg from "../../../public/assistants.png";
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {

    const styles = {
        container: {
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 10,
            paddingRight: "10%",
            width: "100vw",
            height: 50,
        }
    }

    const { loginWithRedirect } = useAuth0();

    return (
        <div style={styles.container}>

                <Button size="large" edge="end" onClick={loginWithRedirect}>Login</Button>
        </div>
    )
}


const LandingPage = () => {

    console.log('rendering landing page')

    return (
        <>
            <Navbar />
            <Fold 
                headline="Create custom voice assistants you can talk with" 
                subheadline="Some things are easier to get done in a conversation rather than writing them down. We make it easy to create voice assistants that can help you with those tasks."
                benefits={[
                    "⚡️ Talk in real time",
                    "📩 Share your voice assistant with others",
                    "🔊 Customize your voice assistant's personality"
                ]}
                background={bkg}
            />
        </>
    )
}

export default LandingPage