import MicRecorder from 'mic-recorder-to-mp3';

const API_ROOT = import.meta.env.VITE_API_ROOT;

export default class AudioRecordingHandler {
    constructor(setConversationState, onFailure, setGeneratedAudio) {
        // this.chunks = []; // here we will store all received chunks of our audio stream
        // this.recorder; // MediaRecorder instance to capture audio
        // this.mediaStream; // MediaStream instance to feed the recorder
        // testRootEndpoint() // testing the GET request to the root endpoint
        this.setConversationState = setConversationState
        this.onFailure = onFailure
        this.setGeneratedAudio = setGeneratedAudio
    }
    
    startRecording = async () => {
        this.recorder = new MicRecorder({
        //   bitRate: 128
        });
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // this.recorder = new MediaRecorder(this.mediaStream, 
        //     // { mimeType: 'audio/mp4' }
        // );
        this.recorder.start(); // Start recording
    };

    stopRecording = (messages, setMessages, voice) => {
        this.recorder.stop().getMp3().then(([buffer, blob]) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
    
            reader.onloadend = async () => {
                const arrayBuffer = reader.result; // Get the ArrayBuffer from the reader
                const audioBytes = new Uint8Array(arrayBuffer); // Create a Uint8Array from the ArrayBuffer
                const base64StringAudio = btoa(String.fromCharCode(...audioBytes)); // Convert the Uint8Array to a base64 string
    
                let str_messages = JSON.stringify(messages)
                let payload = JSON.stringify({
                    "audio": base64StringAudio,
                    "messages": str_messages,
                    "voice": voice
                })
                fetch(API_ROOT + "/listen", {
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
                        setMessages(messages)
                        let audio = data.audio
                        let fetchableUrl = 'data:audio/wav;base64,' + audio;
                        fetch(fetchableUrl)
                            .then(response => response.blob())
                            .then(blob => {
                                this.setGeneratedAudio(blob)
                                console.log('set audio')
                                let url = URL.createObjectURL(blob);
                                let audio = new Audio(url)
                                console.log('audio', audio)
                                audio.play()
                                this.setConversationState("speaking")
                                audio.onended = () => {
                                    this.setConversationState("idle")
                                }
                            });
                    })
                    .catch(this.onFailure);
                this.chunks = [];
                this.recorder = null;
                this.mediaStream.getTracks().forEach(track => track.stop());
            }
        });
    };

}


const testRootEndpoint = () => {
    fetch(API_ROOT + "/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' // necessary
        },
    })
    // .then(response => response.json())
    // .then(data => console.log(data))
    console.log('send test request')
}
