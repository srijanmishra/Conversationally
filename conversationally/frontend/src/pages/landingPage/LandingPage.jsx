import LoginButton from "../../components/Auth/LoginButton";
import { AppBar, Toolbar, Button } from "@mui/material";
import Fold from "./sections/Fold";
import image from "../../../public/source.png";
import { useAuth0 } from "@auth0/auth0-react";
import CTAButton from "../../components/CTAButton";
import CTASection from "./sections/CTASection";
import bkg from "../../images/assistants.png";
import Testimonials from "./sections/Testimonials";
import FAQs from "./sections/FAQs";

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
            <Testimonials testimonials={testimonialData} headline="Customers can't stop raving about their personal assistants" />
            <FAQs img='./public/FAQ.png' faqs={faqData} />
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