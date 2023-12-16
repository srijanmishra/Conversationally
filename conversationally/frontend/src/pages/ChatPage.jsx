import UserActionButton from "../components/UserActionButton/UserActionButton";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Avatar, TextField, Typography } from "@mui/material";
import AudioRecordingHandler from "../utils/audio";
import img from "/AI_portrait.png";
import useTheme from '@mui/material/styles/useTheme';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LogoutButton from "../components/Auth/LogoutButton";

const API_ROOT = import.meta.env.VITE_API_ROOT;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "90vh",
        alignItems: "center"
    },
    avatar: {
        height: "200px",
        width: "200px"
    },
    backdrop: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}

const audioHandler = new AudioRecordingHandler()

export const ChatPage = () => {
    const [config, setConfig] = useState({
        "avatarSrc": img,
        "systemMessage": "You are a helpful and friendly assistant with a charming and witty personality. You're straight to the point and don't waste time. Respond in less than two sentences."
    })
    const [recording, setRecording] = useState(false);
    const [messages, setMessages] = useState([{"role": "system", "content": config.systemMessage}]);

    const updateConfig = (configUpdates) => {
        let newConfig = {...config, ...configUpdates}
        setConfig(newConfig)
        setMessages([{"role": "system", "content": newConfig.systemMessage}])
    }

    const toggleRecording = () => {
        if (recording) {
            audioHandler.stopRecording(messages, setMessages);
        } else {
            audioHandler.startRecording();
        }
        setRecording(!recording);
    }

    return (
        <>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            
                <div>
                    <div>
                        <Customisation config={config} updateConfig={updateConfig} />
                        <LogoutButton />
                    </div>
                </div>
            </Slide>
            <Grow in={true} mountOnEnter unmountOnExit>
                <div style={styles.container}>
                    <Avatar src={config.avatarSrc} style={styles.avatar}/>
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
            </Grow>
        </>
  );

};

const Customisation = (props) => {

    const [open, setOpen] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
        setSysMsgValue(props.config.systemMessage) // resets to original value if escaped, but also updates internal state if saved
        console.log(props.config.systemMessage)
    }

    const theme = useTheme();

    const [sysMsgValue, setSysMsgValue] = useState(props.config.systemMessage)

    const save = async () => {
        toggleOpen()

        // bullshit loading mode
        setLoadingState("🧠 Processing personality...")
        setTimeout(() => {
            setLoadingState("📸 Taking assistant headshot...")
        }, 3000);
        setTimeout(() => {
            setLoadingState("✨ Putting on the finishing touches...")
        }, 6000);
        // end of bullshit loading mode

        // setLoadingState("📸 Taking assistant headshot...")
        let img = await generateAvatarImgURL(sysMsgValue)
        // setLoadingState("✨ Putting on the finishing touches...")
        props.updateConfig({
            "systemMessage": sysMsgValue,
            "avatarSrc": img
        })
        console.log(sysMsgValue)
        
        setLoadingState(false)
    }

    const generateAvatarImgURL = (inputSysMsgValue) => {
        return fetch(API_ROOT + "/generate_avatar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // necessary
            },
            body: JSON.stringify({system_message: inputSysMsgValue})
        })
            .then(response => response.json())
            .then(data => {
                data = JSON.parse(data)
                const img = data.url
                return img
            })
            .catch(error => console.log(error));
    }

    return <>
        <div style={{margin: "10px"}}>
            <Button onClick={toggleOpen} variant="text" size="large" color="secondary">
                <div style={{fontSize: "16px"}}>
                    Customise
                </div>
                <EditIcon style={{fontSize: "20px", marginLeft: "10px"}} />
            </Button>
        </div>
        <Dialog open={open} fullWidth={true} onClose={()=>{toggleOpen()}}>
            <DialogTitle>
                <Typography variant="h4">
                    Customise
                </Typography>    
            </DialogTitle>
            <DialogContent>
                <Typography variant="h5">
                    You can change the personality of your assistant here.
                </Typography>
                <div style={{display: "flex", alignItems:"center", flexDirection: "column", margin: "16px"}}>
                    <Avatar src={props.config.avatarSrc} style={{height: "100px", width: "100px"}}/>
                </div>
                <DialogContentText>
                    <Typography variant="h5">
                            Describe the personality of your AI assistant, any background context it should be aware of, and guidelines for how it should respond.
                    </Typography>
                </DialogContentText>
                <TextField fullWidth={true} multiline={true} variant="outlined" onChange={e=>{
                    setSysMsgValue(e.target.value)
                }} value={sysMsgValue} InputProps={{style: {color: theme.palette.secondary.main, fontSize: "14px"}}} style={{marginTop: "14px"}}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={save} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
        <Backdrop open={loadingState} sx={{zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.9)"}}>
            <div style={styles.backdrop}>
                <CircularProgress />
                <Typography variant="h4" style={{margin: "30px"}}>
                    {loadingState}
                </Typography>
            </div>
        </Backdrop>
    </>
}