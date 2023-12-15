import LoginButton from "../../components/Auth/LoginButton";
import { AppBar } from "@mui/material";
import Fold from "./sections/Fold";
import bkg from "../../../public/assistants.png";

const Navbar = () => {
    return (
        <AppBar>
            <LoginButton />
        </AppBar>
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