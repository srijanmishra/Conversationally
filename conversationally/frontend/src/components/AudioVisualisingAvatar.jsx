import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";

const avatarDiameter = 200;

const AudioVisualisingAvatar = (props) => {
    
    const [r, setR] = useState(0);

    const styles = {  
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        },
        avatar: {
            height: avatarDiameter,
            width: avatarDiameter
        },
        circle: {
            position: "absolute",
            height: avatarDiameter + r,
            width: avatarDiameter + r,
            borderRadius: "50%",
            // backgroundColor: "red",
            opacity: "0.5",
            border: "1px solid red",
        }
    }

    console.log(props.generatedAudio)

    useEffect(() => {

        // turn generated audio blob into list of integers
        if (!props.generatedAudio) return;

        const blob = props.generatedAudio
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = function() {
            const arrayBuffer = reader.result;
            let bytes = Array.from(new Uint8Array(arrayBuffer))
            // set radius increase (r) to each value of the array, at the right freuqnecy to show the audio whilst it is being played
            bytes.push(0)
            for (let i = 0; i < bytes.length; i++) {
                setTimeout(() => {
                    setR(bytes[i])
                }, i / 1000 / 4)
            }
            console.log('bytes', bytes)
        }




        // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        // const analyser = audioCtx.createAnalyser();
        // analyser.fftSize = 128; 

        // const bufferLength = analyser.frequencyBinCount; 
        // const dataArray = new Uint8Array(bufferLength);
        // analyser.getByteFrequencyData(dataArray);
        // console.log('data array', dataArray)

// )

    }, [props.generatedAudio])


    return (
        <>
        <div style={styles.container}>
            <div style={styles.circle}>

            </div>
            <Avatar src={props.avatarSrc} style={styles.avatar}/>
        </div>
        </>
    )
}


export default AudioVisualisingAvatar