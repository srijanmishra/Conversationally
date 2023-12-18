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
        },
        circle: {
            position: "absolute",
            height: avatarDiameter + deltaRadius,
            width: avatarDiameter + deltaRadius,
            borderRadius: "50%",
            opacity: "0.5",
            backgroundColor: "lightgrey",
            transitionDuration: "0.1s",
        }
    }

    useEffect(() => {

        // turn generated audio blob into list of integers
        if (!props.generatedAudio) return;

        const blob = props.generatedAudio
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = function() {
            const arrayBuffer = reader.result;
            let bytes = Array.from(new Uint8Array(arrayBuffer))
            // let duration = bytes.length / 44100
            // console.log('duration', duration)
            let deltaRadii = bytes.map(byte => Math.round(byte / 255 * (maxAvatarDiameter - avatarDiameter)))
            deltaRadii.push(0)
            for (let i = 0; i < deltaRadii.length; i++) {
                let dr = deltaRadii[i]
                setTimeout(() => {
                    setDeltaRadius(dr)
                }, i / (44100) * 1000)
            }
        }

    }, [props.generatedAudio])


    return (
        <>
            <div style={styles.container}>
                <div style={styles.circle}></div>
                <Avatar src={props.avatarSrc} style={styles.avatar}/>
            </div>
        </>
    )
}


export default AudioVisualisingAvatar