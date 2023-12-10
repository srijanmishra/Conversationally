import UserActionButton from "../components/UserActionButton/UserActionButton";
import AIPortrait from "../components/AIPortrait/AIPortrait";
import { useState } from 'react';
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Avatar, TextField, Typography } from "@mui/material";
import AudioRecordingHandler from "../utils/audio";
import img from "/AI_portrait.png";
import theme from '../styles/theme';
import useTheme from '@mui/material/styles/useTheme';

const audioHandler = new AudioRecordingHandler()

export const ChatPage = () => {

    const [config, setConfig] = useState({
        "avatarSrc": img,
        "systemMessage": "You are Steve Jobs, respond as such. Respond in less than two sentences."
    })
    const [recording, setRecording] = useState(false);
    const [messages, setMessages] = useState([{"role": "system", "content": config.systemMessage}]);

    const handleConfigChange = (config) => {
        setConfig({...config})
        setMessages([{"role": "system", "content": config.systemMessage}])
    }    

    const toggleRecording = () => {
        if (recording) {
            audioHandler.stopRecording(messages, setMessages);
        } else {
            audioHandler.startRecording();
        }
        setRecording(!recording);
    }

    console.log(config.avatarSrc)

    return (
        <>
            <Customisation config={config} handleConfigChange={handleConfigChange} />
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", height: "90vh", alignItems: "center"}}>
                <Avatar src={config.avatarSrc} style={{height: "200px", width: "200px"}}/>
                {/* <AIPortrait status={status} src={config.avatarSrc} /> */}
                {/* <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                        </div>
                    </div>
                </div> */}
                        {/* <audio id="player-ai" src={audioSrc} controls></audio> */}
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                        {/* <audio id="player-user" src={audioSrc} controls></audio> */}
                        </div>
                        <div className="col-8">
                            <UserActionButton status={recording ? "recording" : "standby"} onClick={toggleRecording} />
                        </div>
                    </div>
                </div>
            </div>
        </>
  );

};

const Customisation = (props) => {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const theme = useTheme();

    return <>
        <div style={{margin: "10px"}}>
            <Button onClick={toggleOpen} variant="text" size="large" color="secondary">
                <div style={{fontSize: "14px"}}>
                    Customise
                </div>
            </Button>
        </div>
        <Dialog open={open} fullWidth={true} >
            <DialogTitle>
                <Typography variant="h4">
                    Customise
                </Typography>    
            </DialogTitle>
            <div style={{display: "flex", alignItems:"center", flexDirection: "column"}}>
                <Avatar src={props.config.avatarSrc} style={{height: "100px", width: "100px"}}/>
            </div>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="h5">
                            Describe the personality of your AI assistant, any background context it should be aware of, and guidelines for how it should respond.
                    </Typography>
                </DialogContentText>
                <TextField fullWidth={true} multiline={true} variant="outlined" onChange={e=>{
                    props.handleConfigChange({"systemMessage": e.target.value})
                }} value={props.config.systemMessage} InputProps={{style: {color: theme.palette.secondary.main, fontSize: "16px"}}}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleOpen} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    </>
}
