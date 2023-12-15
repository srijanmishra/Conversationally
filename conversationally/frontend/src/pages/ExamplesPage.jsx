import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VirtualAssistantImg from "/AI_portrait.png";
import Button from '@mui/material/Button';
import { getChatPageURL } from '../utils/link';
import { Link } from 'react-router-dom';

export const ExamplesPage = () => {

  return (
    <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
        <ProfileCard sysMsg="gym trainer test system message" imgURL={VirtualAssistantImg} title="Gym Trainer" description="I am trainer blahbla a df asdf asd fas dfa sdf asd fsad fasd fsa ad fasdfasdfsa"/>
        <ProfileCard sysMsg="girlfriend test system message" imgURL={VirtualAssistantImg} title="AI GF" description="I am ur gd adf asdf adf afas df ad fa sdfa sdfas das df ad fas dfas f ad asd as dasdfas"/>
        <ProfileCard sysMsg="assistant test system message" imgURL={VirtualAssistantImg} title="Virtual Assistant" description="I am assistant adfsdf ad adf asdf asd ada sdfa sdfa sdf asdf asd fas dfa d as dfa df af as da fs "/>
    </div>
  );
}

const ProfileCard = (props) => {

    const theme = useTheme();

    const buttonClicked = () => {
        
    }

    return (
        <Card sx={{ display: 'flex'}} style={{margin: 10, maxWidth: 350}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5" color="Black">
                {props.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                {props.description}
            </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Link to={getChatPageURL(props.sysMsg, props.imgURL)}>
                <Button onClick={buttonClicked} variant="contained" size="large" color="secondary">
                <div style={{fontSize: "16px"}}>
                    Chat
                </div>
                </Button>
            </Link>
            </Box>
        </Box>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={props.imgURL}
            alt="Live from space album cover"
        />
        </Card>
    );
}