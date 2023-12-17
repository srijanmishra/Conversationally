import LoginButton from "../../components/Auth/LoginButton";
import { AppBar, Toolbar, Button } from "@mui/material";
import Fold from "./sections/Fold";
import bkg from "../../../public/assistants.png";
import image from "../../../public/source.png";
import { useAuth0 } from "@auth0/auth0-react";
import CTAButton from "../../components/CTAButton";
import CTASection from "./sections/CTASection";

const Navbar = () => {

    const styles = {
        container: {
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 5,
            width: "100vw",
            border:"none",
        }
    }

    const { loginWithRedirect } = useAuth0();

    return (
        <div style={styles.container}>
            <CTAButton size="large" edge="end" onClick={loginWithRedirect}>Login</CTAButton>
        </div>
    )
}


const LandingPage = () => {

    console.log('rendering landing page')

    return (
        <>
            <Navbar />
            <Fold 
                headline="Create characters you can talk with" 
                subheadline="Some things are easier to get done in a conversation rather than writing them down. We make it easy to create voice assistants that can help you with those tasks."
                benefits={[
                    "⚡️ Talk in real time",
                    "📩 Share your voice assistant with others",
                    "🔊 Customize your voice assistant's personality"
                ]}
                background={bkg}
            />
            
            <CTASection
                title={"Become an amazing AI character creator!"} 
                description={"Ever wondered what it is like to have your own personalized AI assistant? Well, wonder no more!"}
                benefits={[
                    "⚡️ Engage in live conversations",
                    "📩 Bring your voice assistant into the spotlight and share the magic with others", 
                    "🔊 Tailor your voice assistant's charm to match your style"]} 
                ctaPrompt={"Try it out!"}
                background={bkg}
                img={image}
            />

            
        </>
    )
}

export default LandingPage