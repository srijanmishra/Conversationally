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
            title={"Start taking AI photos now"} 
            description={"Generate photorealistic images of people with AI.Save money and use AI to da photo shoot from your laptop or phone instead of hirining an expensive photographer"}
            benefits={[{title:'Upload selfies and create photorealistic AI characters', id:1},
            {title:'Take 100% AI photos in any pose, place or action', id:2},
            {title:'Get photo packs like AI Yearbook, Old Money and Naughty Halloween',id:3}, 
            {title:'Create AI-generated fashion designs with Sketch2image',id:4}]} 
             ctaPrompt={"Try it out now"}
             background={bkg}
             img={image}
            />

            
        </>
    )
}

export default LandingPage