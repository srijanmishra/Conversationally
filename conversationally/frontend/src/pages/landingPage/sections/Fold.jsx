import { Typography } from "@mui/material";


const Fold = (props) => {
    const styles = {
        container: {
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundImage: `url(${props.background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.75)"

        },
        text: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
            margin: 10,
        },
        benefit: {
            paddingTop: 8   ,
        }
    }
    return (
        <div style={styles.container}>
            <div style={styles.text}>
                <Typography variant="h1">
                    {props.headline}
                </Typography>
                <Typography variant="h4">
                    {props.subheadline}
                </Typography>
                {props.benefits.map((benefit, index) => {
                    return <div style={styles.benefit}>
                        <Typography key={index} variant="h4">{benefit}</Typography>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Fold;