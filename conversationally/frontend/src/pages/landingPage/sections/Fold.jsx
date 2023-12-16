import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CTAButton from "../../../components/CTAButton";

const Fold = (props) => {
    const styles = {
        container: {
            padding: 10,
            paddingTop: "120px",
            minHeight: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "left",
            backgroundImage: `url(${props.background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.75)",
        },
        text: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
            margin: 10,
        },
        subheadline: {
            marginTop: 10,
            marginBottom: 10
        },
        benefit: {
            paddingTop: 8   ,
        },
        cta: {
            alignSelf: "left",
        }
    }

    const { loginWithRedirect } = useAuth0();

    return (
        <div style={styles.container}>
            <div style={styles.text}>
                <Typography variant="h1" sx={{typography: {sm: "h1", xs: "h2"}}}>
                    {props.headline}
                </Typography>
                <Typography variant="h4" style={styles.subheadline}>
                    {props.subheadline}
                </Typography>
                {props.benefits.map((benefit, index) => {
                    return <div style={styles.benefit} key={index} >
                        <Typography variant="h4">{benefit}</Typography>
                    </div>
                })}
            </div>
            <div>
                <CTAButton size="large" edge="end" onClick={loginWithRedirect}>Talk now</CTAButton>
            </div>
        </div>
    )
}

export default Fold;