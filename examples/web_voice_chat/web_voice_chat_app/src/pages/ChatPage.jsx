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
import { TextField } from "@mui/material";

class AudioRecordingHandler {
    constructor() {
        this.chunks = []; // here we will store all received chunks of our audio stream
        // this.recorder; // MediaRecorder instance to capture audio
        // this.mediaStream; // MediaStream instance to feed the recorder
    }

    startRecording = async () => {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.recorder = new MediaRecorder(this.mediaStream);
        this.recorder.start(); // Start recording
    
        // This event fires each time a chunk of audio data is available
        this.recorder.ondataavailable = (event) => {
            this.chunks.push(event.data); // Append the chunk to our array
        };
    };

    stopRecording = (messages, setMessages) => {
        console.log("stop button clicked");
        let hi = this.recorder.stop(); // This will trigger the 'dataavailable' event for the last time
        console.log("onstop return", hi)
        this.recorder.onstop = () => {
            const blob = new Blob(this.chunks, { type: 'audio/wav' }); // When all chunks are available, concatenate them into a single Blob
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
    
            reader.onloadend = async () => {
                const arrayBuffer = reader.result; // Get the ArrayBuffer from the reader
                const audioBytes = new Uint8Array(arrayBuffer); // Create a Uint8Array from the ArrayBuffer
                const base64StringAudio = btoa(String.fromCharCode(...audioBytes)); // Convert the Uint8Array to a base64 string
                console.log(base64StringAudio.substring(0, 10)) // log first 10 characters of the string
                console.log('sending audio to server')
    
                let str_messages = JSON.stringify(messages)
                let payload = JSON.stringify({
                    "audio": base64StringAudio,
                    "messages": str_messages
                })
                console.log(payload)
                testRootEndpoint() // testing the GET request to the root endpoint
                // console.log('sending audio to server')
                fetch("https://iawmx3ntgn2whycqxqwtll7ewy0ihhff.lambda-url.eu-west-2.on.aws/listen", {
                
                
                //fetch("http://localhost:8000/listen", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json' // necessary
                    },
                    body: payload
                })
                    .then(response => response.json())
                    .then(data => {
                        data = JSON.parse(data)
    
                        messages = data.messages
                        console.log("Returned messages:", messages)
                        setMessages(messages)
                        let audio = data.audio
                        // log first 10 characters of the string
                        console.log(audio.substring(0, 10))
                        let fetchableUrl = 'data:audio/wav;base64,' + audio;
                        fetch(fetchableUrl)
                            .then(response => response.blob())
                            .then(blob => {
                                let url = URL.createObjectURL(blob);
                                console.log('audio url:', url)
                                new Audio(url).play();
                            });
                    })
                    .catch(error => console.log(error));
            this.chunks = [];
            this.recorder = null;
            this.mediaStream.getTracks().forEach(track => track.stop());
        };
    }};

}


const testRootEndpoint = () => {
    fetch("https://iawmx3ntgn2whycqxqwtll7ewy0ihhff.lambda-url.eu-west-2.on.aws/", {
        // fetch("http://localhost:8000/listen", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' // necessary
        },
    })
    // .then(response => response.json())
    // .then(data => console.log(data))
    console.log('send test request')
}
const audioHandler = new AudioRecordingHandler()

export const ChatPage = () => {

    const handleConfigChange = (newConfig) => {
        setConfig(newConfig)
        setMessages([{"role": "system", "content": newConfig.systemMessage}])
    }

    const [config, setConfig] = useState({
        "systemMessage": "Your name is Steve the dog, respond as if you think like a cute puppy",
        "src": "/AI_portrait.png"
    })

    const [recording, setRecording] = useState(false);
    const [messages, setMessages] = useState([{"role": "system", "content": config.systemMessage}]);

    const toggleRecording = () => {
        if (recording) {
            audioHandler.stopRecording(messages, setMessages);
            // TODO play audio once I get everything up to here working
        } else {
            audioHandler.startRecording();
        }
        setRecording(!recording);
    }

    const updateAvatar = () => {
        fetch("http://localhost:8000/generate_avatar", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json' // necessary
                    },
                    body: JSON.stringify({system_message: config.systemMessage})
                })
                    .then(response => response.json())
                    .then(data => {
                        data = JSON.parse(data)
    
                        const img = data.url
                        console.log("Returned messages:", img)

                        handleConfigChange({"systemMessage": config.systemMessage, "src": img})
                    })
                    .catch(error => console.log(error));
    }
//   useEffect(() => {
//     document.body.classList.add("ChatPage");

//     return () => {
//       document.body.classList.remove("ChatPage");
//     };
//   }, []);

    return (
        <>
            <Navbar config={config} handleConfigChange={handleConfigChange} updateAvatar={updateAvatar}/>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", height: "80vh", alignItems: "center"}}>
                        <AIPortrait status={status} src={config.src} />
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

const Navbar = (props) => {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const save = () => {
        toggleOpen()
        props.updateAvatar()
    }

    console.log(props.config)

    return <>
        <Button onClick={toggleOpen}>
            Settings
        </Button>
        <Dialog open={open}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Set your system message
                </DialogContentText>
                <TextField onChange={e=>{
                    props.handleConfigChange({"systemMessage": e.target.value})
                }} value={props.config.systemMessage} />
            </DialogContent>
            <DialogActions>
                <Button onClick={save}>Save</Button>
            </DialogActions>
        </Dialog>
    </>
}
