
import {Box, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import CTAButton from "../../../components/CTAButton";
import { useAuth0 } from "@auth0/auth0-react";
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

function CTASection(props) {

    const { loginWithRedirect } = useAuth0();
    return(
    <Card sx={{display:"flex", flexWrap:{sm: "none", xs: "none"},backgroundColor:"black", margin:"20px" }}>  
        <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: "center" }}>
            <div style={{padding: "20px",  maxWidth:"800px"}}>  
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{typography: {sm: "h2", xs: "h3"}}}>
                        {props.title}
                    </Typography>
                    <Typography variant="h4">   
                        <p style={{marginBottom:"15px", marginTop:"15px"}}>{props.description}</p>
                    </Typography> 
                    {props.benefits.map((benefit, index) => {
                    return <div style={styles.benefit} key={index} >
                        <Typography variant="h4">{benefit}</Typography>
                    </div>
                    })}
                </CardContent>
                <CardActions>
                    <Typography variant="body1">
                        <CTAButton size="large" edge="end" onClick={loginWithRedirect}>{props.ctaPrompt}</CTAButton>
                    </Typography> 
                </CardActions>
                
            </div>
        </Box>
        <CardMedia
            component="img"
            sx={{ width:  500}}
            image={props.img}
        />
     </Card>
    )
    
}
export default CTASection