import UserActionButton from "../components/UserActionButton/UserActionButton";
import AIPortrait from "../components/AIPortrait/AIPortrait";
import LogoutButton from '../components/Auth/LogoutButton';
import { useState } from 'react';

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

    stopRecording = (messages, setMessages, setAudioSrc) => {
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
                }, )
                console.log(payload)
                testRootEndpoint() // testing the GET request to the root endpoint
                // console.log('sending audio to server')
                fetch("https://iawmx3ntgn2whycqxqwtll7ewy0ihhff.lambda-url.eu-west-2.on.aws/listen", {
                // fetch("http://localhost:8000/listen", {
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
                                setAudioSrc(url)
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

    const [recording, setRecording] = useState(false);
    const [messages, setMessages] = useState([]);
    const [audioSrc, setAudioSrc] = useState(null);

    const toggleRecording = () => {
        if (recording) {
            audioHandler.stopRecording(messages, setMessages, setAudioSrc);
            // TODO play audio once I get everything up to here working
        } else {
            audioHandler.startRecording();
        }
        setRecording(!recording);
    }
  };

//   useEffect(() => {
//     document.body.classList.add("ChatPage");

//     return () => {
//       document.body.classList.remove("ChatPage");
//     };
//   }, []);

    return (
        <>
            <section>
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4">
                    <AIPortrait status={status} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                    <audio id="player-ai" src={audioSrc} controls></audio>
                    </div>
                </div>
                </div>
            </section>
            <section>
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                    <audio id="player-user" src={audioSrc} controls></audio>
                    </div>
                    <div className="col-8">
                    <UserActionButton status={recording ? "recording" : "standby"} onClick={toggleRecording} />
                    </div>
                </div>
                </div>
            </section>
        </>
  );
};
