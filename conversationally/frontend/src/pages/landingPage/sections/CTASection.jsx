
import {Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'


const style = {
    fontSize: "16px",
    backgroundImage: "linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)",
    margin: "10px",
    padding: "10px 45px",
    textAlign: "center",
    textTransform: "uppercase",
    transition: "0.5s",
    backgroundSize: "200% auto",
    color: "white",            
    boxShadow: "0 0 20px #eee",
    borderRadius: "10px",
    display: "block",
    textDecoration: "none",
    size:"large",
     edge:"end",
}
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

    const benefits=props.benefits.map(benefit=>
        <li key={benefit.id}>{benefit.title}</li>)
    return(
    <Card>
        <div style={{display:"flex", flexDirection:"row",backgroundColor:"black" }}>    
            <div style={{padding: "40px", alignSelf: "center"}}>  
                <CardContent>
                    <Typography variant="h1">
                        <h1 style={{fontSize: '48px', marginBottom:"15px"}}>{props.title}</h1>
                    </Typography>
                    <Typography variant="h4">   
                        <p style={{marginBottom:"15px"}}>{props.description}</p>
                        <ul>{benefits}</ul>
                    </Typography> 
                </CardContent>
                <CardActions>
                    <Typography variant="body1">
                        <button style={style} onClick={props.handleClick}>{props.ctaPrompt}</button>
                    </Typography> 
                </CardActions>
                
            </div>
                <CardMedia>
                <img src={props.img} style={{}}/>
                </CardMedia>
            
        </div>
    </Card>
    )
    
}
export default CTASection