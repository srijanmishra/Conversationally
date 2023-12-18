
import {Box, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import CTAButton from "../../../components/CTAButton";
import { useAuth0 } from "@auth0/auth0-react";
const styles = {
        container: {
            // position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            // margin: "40px",
            backgroundColor: "black",
            flexWrap: "wrap",
        },
        img: {
            minWidth: '430px',
            width: '30%',
            height: "100%",
        },
        content: {
            minWidth: "300px",
            // minWidth: '300px',
            width: "60%",
            flexGrow: 1,
        }
    }

function CTASection(props) {

    const { loginWithRedirect } = useAuth0();
    return(
        <Card style={styles.container}>
            <Box style={styles.content}>
                <CardContent>
                    <Typography sx={{typography: {sm: "h2", xs: "h3"}}}>
                        {props.title}
                    </Typography>
                    <Typography variant="h4">
                        {props.description}
                    </Typography> 
                    {props.benefits.map((benefit, index) => {
                    return <div style={styles.benefit} key={index} >
                        <Typography variant="h4" style={{marginTop: "10px"}}>
                            {benefit}
                        </Typography>
                    </div>
                    })}
                </CardContent>
                <CardActions>
                    <CTAButton size="large" onClick={loginWithRedirect}>
                        {props.ctaPrompt}
                    </CTAButton>
                </CardActions>
            </Box>
            <CardMedia
                component="img"
                style={styles.img}
                // sx={{ width:  500}}
                image={props.img}
            />
        </Card>
    )
}
export default CTASection