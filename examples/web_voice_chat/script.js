feather.replace();

let chunks = []; // here we will store all received chunks of our audio stream
let recorder; // MediaRecorder instance to capture audio
let mediaStream; // MediaStream instance to feed the recorder

let messages = [];

const recordButton = document.getElementById("record");
const stopButton = document.getElementById("stop");
const audioElement = document.getElementById("player");

recordButton.onclick = async () => {
  mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  recorder = new MediaRecorder(mediaStream);
  recorder.start(); // Start recording

  // This event fires each time a chunk of audio data is available
  recorder.ondataavailable = (event) => {
    chunks.push(event.data); // Append the chunk to our array
  };

  recordButton.disabled = true;
  stopButton.disabled = false;
};

stopButton.onclick = () => {
  console.log("stop button clicked");
  // This will trigger the 'dataavailable' event for the last time
  recorder.stop();

  // When all chunks are available, concatenate them into a single Blob
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/wav" });

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
      console.log(base64StringAudio.substring(0, 10));
      console.log("sending audio to server");

      let str_messages = JSON.stringify(messages);
      let payload = JSON.stringify({
        audio: base64StringAudio,
        messages: str_messages,
      });
      console.log(payload);
      fetch("http://localhost:8000/listen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // necessary
        },
        body: payload,
      })
        .then((response) => response.json())
        .then((data) => {
          data = JSON.parse(data);

          messages = data.messages;
          console.log("Returned messages:", messages);
          let audio = data.audio;
          // log first 10 characters of the string
          console.log(audio.substring(0, 10));
          let fetchableUrl = "data:audio/wav;base64," + audio;
          fetch(fetchableUrl)
            .then((response) => response.blob())
            .then((blob) => {
              let url = URL.createObjectURL(blob);
              let audioElement = document.createElement("audio");
              audioElement.src = url;
              document.body.appendChild(audioElement);
              audioElement.play();
            });
        })
        .catch((error) => console.log(error));

      // put in the audio element
      const url = URL.createObjectURL(blob);
      audioElement.src = url;

      chunks = [];
      recorder = null;
      mediaStream.getTracks().forEach((track) => track.stop());

      recordButton.disabled = false;
      stopButton.disabled = true;
    };
  };
};
