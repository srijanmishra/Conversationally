import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import VirtualAssistantImg from "/AI_portrait.png";
import Button from '@mui/material/Button';
import { getChatPageURL } from '../utils/link';
import { Link } from 'react-router-dom';
import bkg from "../../public/gradient.jpeg"
import MicNoneIcon from '@mui/icons-material/MicNone';
import { Avatar, Snackbar, TextField, Typography } from "@mui/material";

  const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${bkg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.7)",
        padding: "30px"
    },
    avatar: {
        height: "120px",
        width: "120px",
        marginLeft: "15px",
        //padding: "20px"
        
    },
    backdrop: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    menu: {
        position: "absolute",
        top: "10px",
        left: "10px"
    }
}
//page
export const ExamplesPage = () => {

  return (
    <div style={styles.container}>
        <div>
            <ProfileCard sysMsg="gym trainer test system message" imgURL={VirtualAssistantImg} voice="Dave" title="Gym Trainer" description="I am trainer blahbla a df asdf asd fas dfa sdf asd fsad fasd fsa ad fasdfasdfsa"/>
            <ProfileCard sysMsg="girlfriend test system message" imgURL={VirtualAssistantImg} voice="Charlotte" title="AI GF" description="I am ur gd adf asdf adf afas df ad fa sdfa sdfas das df ad fas dfas f ad asd as dasdfas"/>
            <ProfileCard sysMsg="assistant test system message" imgURL={VirtualAssistantImg} voice="Charlotte" title="Virtual Assistant" description="I am assistant adfsdf ad adf asdf asd ada sdfa sdfa sdf asdf asd fas dfa d as dfa df af as da fs "/>
            <ProfileCard sysMsg="assistant test system message" imgURL={VirtualAssistantImg} voice="Nicole" title="Virtual Assistant" description="I am assistant adfsdf ad adf asdf asd ada sdfa sdfa sdf asdf asd fas dfa d as dfa df af as da fs "/>
            <ProfileCard sysMsg="assistant test system message" imgURL={VirtualAssistantImg} voice="Fin" title="Virtual Assistant" description="I am assistant adfsdf ad adf asdf asd ada sdfa sdfa sdf asdf asd fas dfa d as dfa df af as da fs "/>
        </div>
    </div>
  );
}

//component for page
const ProfileCard = (props) => {

    const theme = useTheme();

    const buttonClicked = () => {
        
    }

    return (
        <Card variant="outlined" sx={{ display: 'flex'}} style={{margin: 10, maxWidth: 350, borderRadius:12, alignItems:'center'}}>
            <Avatar src={props.imgURL} style={styles.avatar}/>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5">
                    {props.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {props.description}
                </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pr: 1, pb: 1, justifyContent: 'flex-end'}} style={{}}>
                    <Link to={getChatPageURL(props.sysMsg, props.imgURL, props.voice)}>
                        <Button onClick={buttonClicked} variant="text" size="large" color="secondary" >
                        <div style={{fontSize: "16px"}}>
                            Chat
                        </div>
                        <MicNoneIcon style={{fontSize:'18px', marginLeft:"10px"}}/>
                        </Button>
                    </Link>
                </Box>
            </Box>
            {/* <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={props.imgURL}
                alt="Live from space album cover"
            /> */}
        </Card>
    );
}