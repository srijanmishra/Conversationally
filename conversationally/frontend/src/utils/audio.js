const API_ROOT = import.meta.env.VITE_API_ROOT;

export default class AudioRecordingHandler {
    constructor() {
        this.chunks = []; // here we will store all received chunks of our audio stream
        // this.recorder; // MediaRecorder instance to capture audio
        // this.mediaStream; // MediaStream instance to feed the recorder
        testRootEndpoint() // testing the GET request to the root endpoint
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
