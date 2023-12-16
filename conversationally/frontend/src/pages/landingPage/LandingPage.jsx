import LoginButton from "../../components/Auth/LoginButton";
import { AppBar, Toolbar, Button } from "@mui/material";
import Fold from "./sections/Fold";
import bkg from "../../../public/assistants.png";
import { useAuth0 } from "@auth0/auth0-react";
import CTAButton from "../../components/CTAButton";
import FAQs from "./sections/FAQs.jsx"

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

    const faqData = [ // Questions and Answers for the FAQ section
        { question: "How does Conversationally work?", answer: "Converationally lets you  use your voice to open up a world of endless possibilities. Create AI assitants and then share them with your friends. We teach the AI how you look and then it's able to generate photorealistic images of you. You can put yourself in different settings, with different outfits, doing different actions, with different expressions. And best of all, you can do all this from your laptop or phone without having to pay an expensive photographer $100s or $1000s." },
        { question: "Can you create pictures with Conversationally?", answer: "Yes" },
        { question: "Does Conversationally work as a personal assistant?", answer: " Yes, Amongst other things" },
        { question: "How Many assistants can I have?", answer: "As many as you want" },
        { question: "Are the assitants sentient?", answer: "Not yet, but watch this space" },
    ];

    return (
        <>
            <Navbar />
            <FAQs img='conversationally/frontend/public/wav.png' faqs={faqData} />
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