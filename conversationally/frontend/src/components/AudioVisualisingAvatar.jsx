import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";

const avatarDiameter = 200;
const maxAvatarDiameter = 300;

const AudioVisualisingAvatar = (props) => {
    
    const [deltaRadius, setDeltaRadius] = useState(0);

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
            width: avatarDiameter,
            // opacity: "0.2",
        },
        circle: {
            position: "absolute",
            height: avatarDiameter + deltaRadius,
            width: avatarDiameter + deltaRadius,
            borderRadius: "50%",
            // backgroundColor: "red",
            opacity: "0.5",
            border: "1px solid lightgrey",
            transitionDuration: "0.1s",
        }
    }

    // const [currentTime, setTime ] = useState(0);
    // const [currIndex,setIndex] = useState(0)
    // useEffect(() => {
    //  const interval = setInterval(() => {
    //     const newIndex = currIndex +1;
    //     setTime(data[currIndex]);
    //     setIndex(newIndex);
    //   }, 500)
    //   return () => clearInterval(interval)
    // },[currIndex]) 

    useEffect(() => {

        // turn generated audio blob into list of integers
        if (!props.generatedAudio) return;

        const blob = props.generatedAudio
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = function() {
            const arrayBuffer = reader.result;
            let bytes = Array.from(new Uint8Array(arrayBuffer))
            let duration = bytes.length / 44100
            console.log('duration', duration)
            // const refreshRate = 1000 / 60
            // const updateFrequency = 1000 / 60
            // bytes = bytes.filter((byte, i) => i % 100 == 0)
            let deltaRadii = bytes.map(byte => Math.round(byte / 255 * (maxAvatarDiameter - avatarDiameter)))
            deltaRadii.push(0)
            console.log('setting radii :', deltaRadii)
            for (let i = 0; i < deltaRadii.length; i++) {
                let dr = deltaRadii[i]
                console.log('setting delta radius', dr, 'for index', i)
                setTimeout(() => {
                    setDeltaRadius(dr)
                }, i / (44100) * 1000)
                // setTimeout(() => {
                //     setDeltaRadius(bytes[i] / 255 * (maxAvatarDiameter - avatarDiameter))
                // }, i / (44100))
            }
        }

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