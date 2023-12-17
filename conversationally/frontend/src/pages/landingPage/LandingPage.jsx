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
        { question: "How does Conversationally work?", answer: "Converationally enables you to use your voice to open up a world of endless possibilities. Create AI assitants and then share them with your friends." },
        { question: "Can you create pictures with Conversationally?", answer: "Yes and more to come soon." },
        { question: "Can I join straight away?", answer: " Yes, try giving it a go and let us know what you think." },
        { question: "How many assistants can I use?", answer: "As many as you like, they're your bespoke helpers designed to make your day to day life easier." },
        { question: "Why can't I just use Siri or Alexa?", answer: "At conversationally our assistants are fine-tuned to help you to get through your day due which gives us an advantage over voice assistants in order to complete many tasks." },
        { question: "Do you store my data?", answer: "No, here at Conversationally we just create helpful assistants, the models to generate assistants are not trained on any of your converations." },

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
            <FAQs img='./public/FAQ.png' faqs={faqData} />
        </>
    )
}

export default LandingPage