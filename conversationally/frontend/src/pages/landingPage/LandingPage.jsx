import LoginButton from "../../components/Auth/LoginButton";
import { AppBar, Toolbar, Button } from "@mui/material";
import Fold from "./sections/Fold";
import bkg from "../../../public/assistants.png";
import { useAuth0 } from "@auth0/auth0-react";
import CTAButton from "../../components/CTAButton";
import Testimonials from "./sections/Testimonials";

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
const testimonialData = [
    {
        text: "Highly recommend Conversationally, the assistants are so useful!",
        img: "",
        stars: 5,
        name: "- Emily C",
    },

    {
        text: "Really interesting platform with great potential, excited to see the what comes next. ",
        img: "",
        stars: 4,
        name: "- Michael P",
    },

    {
        text: "The future is now, Conversationally has been very helpful for my daily tasks!",
        img: "",
        stars: 5,
        name: "-Morgan D",
    },


];

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
            <Testimonials testimonials={testimonialData} headline="Customers can't stop raving about their personal assistants" />
        </>
    )
}

export default LandingPage