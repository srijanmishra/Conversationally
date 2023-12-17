import UserActionButton from "../components/UserActionButton/UserActionButton";
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Avatar, Snackbar, TextField, Typography } from "@mui/material";
import AudioRecordingHandler from "../utils/audio";
import img from "/AI_portrait.png";
import useTheme from '@mui/material/styles/useTheme';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutButton from "../components/Auth/LogoutButton";
import Alert from '@mui/material/Alert';
import bkg from "../../public/gradient.jpeg"
import { getUser } from "../utils/client";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, Link } from "react-router-dom";
import PaymentIcon from '@mui/icons-material/Payment';
import CTAButton from "../components/CTAButton";

const API_ROOT = import.meta.env.VITE_API_ROOT;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "150px",
        paddingBottom: "20px",
        justifyContent: "space-around",
        height: "100vh",
        alignItems: "center",
        backgroundImage: `url(${bkg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.7)",
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
    },
    menu: {
        position: "absolute",
        top: "10px",
        left: "10px"
    
    }
}


export const ChatPage = () => {

    //get the query string. 
    const queryString = window.location.search;
    //configure the queryString so that it is easier to deal with.
    const urlParameters = new URLSearchParams(queryString);
    
    //get information from query strings and store in variables for use.
    const urlSysMsg = urlParameters.get('sysMsg');
    const urlImg = urlParameters.get('img');

    console.log(urlImg)

    
    const { user } = useAuth0();
    const navigate = useNavigate()
    const [subscribed, setSubscribed] = useState(true)
    useEffect(() => {
        getUser(user).then((res) => {setSubscribed(res.subscribed)})
    }, [user])
    
    const [config, setConfig] = useState({
        "avatarSrc": urlImg ? urlImg : img, //if urlImg exists then use that instead of the default image.
        "systemMessage": urlSysMsg ? urlSysMsg : "You are a helpful and friendly assistant with a charming and witty personality. You're straight to the point and don't waste time. Respond in less than two sentences."
    })
    
    const [conversationState, setConversationState] = useState("idle") // "idle", "listening", "thinking", "speaking"
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
            setConversationState("thinking")
        } else {
            audioHandler.startRecording();
            setConversationState("listening")
        }
        setRecording(!recording);
    }
    
    const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
    const onFailure = ()=>{
        setErrorSnackBarOpen(true)
        setConversationState("idle")
    }
    const [audioHandler, _] = useState(new AudioRecordingHandler(setConversationState, onFailure));
    
    return (
        <>

            <Grow in={true} mountOnEnter unmountOnExit>
                <div style={styles.container}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                    <div style={styles.menu}>
                        <div>
                            <Customisation config={config} updateConfig={updateConfig} />
                            <Share config={config} />
                            <Link to="https://billing.stripe.com/p/login/00g8wSfGWdyU36w144">
                                <div style={{margin: "5px"}}>
                                    <Button variant="text" size="large" color="secondary">
                                        <div style={{fontSize: "14px"}}>
                                            Your Subscription
                                        </div>
                                        <PaymentIcon style={{fontSize: "16px", marginLeft: "10px"}} />
                                    </Button>
                                </div>
                            </Link>
                            <LogoutButton />
                        </div>
                    </div>
                </Slide> 
                    <Avatar src={config.avatarSrc} style={styles.avatar}/>
                    <UserActionButton status={conversationState} onClick={() => {
                        if (subscribed) {
                            toggleRecording()
                        }
                        else {
                            navigate("/Conversationally/payment")
                        }
                    }} />
                </div>
            </Grow>
            <Snackbar open={errorSnackBarOpen} autoHideDuration={1000} onClose={()=>{setErrorSnackBarOpen(false)}}>
                <Alert severity="error" variant="filled">
                    <Typography variant="h5">
                        Something went wrong. Please try again.
                    </Typography>
                </Alert>
            </Snackbar>
        </>
  );

};

const Customisation = (props) => {
    
    const { user } = useAuth0();
    const navigate = useNavigate()
    const [subscribed, setSubscribed] = useState(true)
    useEffect(() => {
        getUser(user).then((res) => {setSubscribed(res.subscribed)})
    }, [user])

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

        if (!subscribed) {
            navigate("/Conversationally/payment")
            return
        }        

        toggleOpen()

        // bullshit loading mode
        setLoadingState("🧠 Processing personality...")
        setTimeout(() => {
            setLoadingState("📸 Taking assistant headshot...")
        }, 2000);
        setTimeout(() => {
            setLoadingState("🔊 Generating voice...")
        }, 4000);
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

    console.log('rendering. Subscribed?', subscribed)

    return <>
        <div style={{margin: "5px"}}>
            <Button onClick={toggleOpen} variant="text" size="large" color="secondary">
                <div style={{fontSize: "14px"}}>
                    Customise
                </div>
                <EditIcon style={{fontSize: "16px", marginLeft: "10px"}} />
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
                <CTAButton onClick={save} variant="contained">Save</CTAButton>
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

const Share = (props) => {

    const urlBase = window.location.origin 
    const urlPathName = window.location.pathname

    let urlToCopy = urlBase + urlPathName + "?sysMsg=" + encodeURIComponent(props.config.systemMessage) + "&img=" + encodeURIComponent(props.config.avatarSrc)

    const shareButtonClicked = () => {
        navigator.clipboard.writeText(urlToCopy)
            .then(() => {
            // Success! Text has been copied to clipboard
            alert('Text has been copied to clipboard: ' + urlToCopy);
            })
            .catch(err => {
            // Unable to copy to clipboard
            console.error('Unable to copy:', err);
            });
    }

    return <>
        <div style={{margin: "5px"}}>
            <Button onClick={shareButtonClicked} variant="text" size="large" color="secondary">
                <div style={{fontSize: "16px"}}>
                    Copy Link
                </div>
                <ContentCopyIcon style={{fontSize: "20px", marginLeft: "10px"}} />
            </Button>
        </div>
    </>
}