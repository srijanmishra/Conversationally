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
            opacity: "0.2",
        },
        circle: {
            position: "absolute",
            height: avatarDiameter + deltaRadius,
            width: avatarDiameter + deltaRadius,
            borderRadius: "50%",
            // backgroundColor: "red",
            opacity: "0.5",
            border: "1px solid lightgrey",
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
            console.log(bytes.length)
            bytes.push(0)
            for (let i = 0; i < bytes.length; i++) {
                setTimeout(() => {
                    setDeltaRadius(bytes[i] / 255 * (maxAvatarDiameter - avatarDiameter))
                }, i / 44100)
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