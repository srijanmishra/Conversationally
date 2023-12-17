import LoginButton from "../../components/Auth/LoginButton";
import { AppBar, Toolbar, Button } from "@mui/material";
import Fold from "./sections/Fold";
import bkg from "../../../public/assistants.png";
import { useAuth0 } from "@auth0/auth0-react";
import CTAButton from "../../components/CTAButton";
import FAQs from "./sections/FAQs"

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

    const faqData = [
        { question: "How does Conversationally work?", answer: "Converationally allows you to use your voice in order to open up a world of endless possibilities. Create AI assitants and then share them with your friends." },
        { question: "Can you create pictures with Conversationally?", answer: "Yes and more to come soon," },
        { question: "Does Conversationally work as a personal assistant?", answer: " Yes, try giving it us a go and let us know what you think." },
        { question: "How many assistants can I use?", answer: "As many as you like, they're your bespoke helpers designed to make your day to day life easier." },
        { question: "Why can't I just use Siri or Alexa?", answer: "At conversationally our assistants are fine-tuned to help you get through your day due to our multiple modalities which are capable of completeing many tasks." },

    ];


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
            <FAQs img='conversationally/frontend/public/FAQ.png' faqs={faqData} />
        </>
    )
}

export default LandingPage