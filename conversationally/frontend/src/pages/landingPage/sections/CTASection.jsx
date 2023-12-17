
import {Typography} from '@mui/material'
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

function CTASection(props) {
    const benefits=props.benefits.map(benefit=>
        <li key={benefit.id}>{benefit.title}</li>)
    return(
    <div style={{display:"flex", flexDirection:"row", border:"solid",backgroundColor:"white" }}>
        
            
       
        <div style={{padding: "40px"}}>  
            <Typography variant="h1">
                <h1 style={{fontSize: '48px'}}>{props.title}</h1>
            </Typography>
            <Typography variant="body1">   <p>{props.description}</p>
                <ul>{benefits}</ul>
                <button style={style} onClick={props.handleClick}>{props.ctaPrompt}</button>
            </Typography> 
            
        </div>
        <img src={props.img} style={{maxWidth:"500px"}}/>
       
    </div>
    )
    
}
export default CTASection