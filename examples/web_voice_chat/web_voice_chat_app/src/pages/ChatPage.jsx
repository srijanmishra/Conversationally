import LogoutButton from '../components/Logout';
import { useState } from 'react';


// feather.replace();



// const startButton = document.getElementById("start");
// const stopButton = document.getElementById("stop");
// const audioElement = document.getElementById("player");

const startRecording = async () => {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = new MediaRecorder(mediaStream);
    recorder.start(); // Start recording

    // This event fires each time a chunk of audio data is available
    recorder.ondataavailable = (event) => {
        chunks.push(event.data); // Append the chunk to our array
    };

    // startButton.disabled = true;
    // stopButton.disabled = false;
};

const testRootEndpoint = () => {
    fetch("https://iawmx3ntgn2whycqxqwtll7ewy0ihhff.lambda-url.eu-west-2.on.aws/", {
        // fetch("http://localhost:8000/listen", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' // necessary
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    console.log('send test request')
}

const getSpeechResponse = (audio, messages) => {
    
}

const stopRecording = () => {
    console.log("stop button clicked");
    // This will trigger the 'dataavailable' event for the last time
    recorder.stop();

    // When all chunks are available, concatenate them into a single Blob
    recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        

        // Convert the Blob into a base64 string
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);

        reader.onloadend = async () => {
            // Get the ArrayBuffer from the reader
            const arrayBuffer = reader.result;

            // Create a Uint8Array from the ArrayBuffer
            const audioBytes = new Uint8Array(arrayBuffer);

            // Convert the Uint8Array to a base64 string
            const base64StringAudio = btoa(String.fromCharCode(...audioBytes));
            // log first 10 characters of the string
            console.log(base64StringAudio.substring(0, 10))
            console.log('sending audio to server')

            let str_messages = JSON.stringify(messages)
            let payload = JSON.stringify({
                "audio": base64StringAudio,
                "messages": str_messages
            }, )
            console.log(payload)
            // testRootEndpoint() // testing the GET request to the root endpoint
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
                    let audio = data.audio
                    // log first 10 characters of the string
                    console.log(audio.substring(0, 10))
                    let fetchableUrl = 'data:audio/wav;base64,' + audio;
                    fetch(fetchableUrl)
                        .then(response => response.blob())
                        .then(blob => {
                            let url = URL.createObjectURL(blob);
                            // let audioElement = document.createElement('audio');
                            // audioElement.src = url;
                            // document.body.appendChild(audioElement);
                            audioElement.play(); // TODO is this gonna work?
                        });
                })
                .catch(error => console.log(error));


        // put in the audio element
        const url = URL.createObjectURL(blob);
        // audioElement.src = url;

        chunks = [];
        recorder = null;
        mediaStream.getTracks().forEach(track => track.stop());

        // startButton.disabled = false;
        // stopButton.disabled = true;
    };
}};

export const ChatPage = () => {
    const [recording, setRecording] = useState(false);
    const [messages, setMessages] = useState([]);
    const [audioSrc, setAudioSrc] = useState(null);

    let chunks = []; // here we will store all received chunks of our audio stream
    let recorder; // MediaRecorder instance to capture audio
    let mediaStream; // MediaStream instance to feed the recorder

    const toggleRecording = () => {
        if (recording) {
            stopRecording();
        } else {
            startRecording();
        }
        setRecording(!recording);
    }

    // <script src="https://unpkg.com/feather-icons"></script> // not sure how we use this in React
    // <link rel="stylesheet" href="style.min.css" /> // or this
    return  (
        <>
            <div className="container">
                AI
            </div>
            <div className="container">
                You
                <button className="user--micBtn" disabled={recording} onClick={toggleRecording}>
                <i className="feather-mic" data-feather="mic"></i>
                </button>
            </div>
            <audio id="player" src={audioSrc} controls></audio>
            <LogoutButton />
        </>
    )
}