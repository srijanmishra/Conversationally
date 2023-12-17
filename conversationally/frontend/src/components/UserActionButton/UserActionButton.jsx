import { Mic as MicIcon, Square as SquareIcon } from "react-feather";
import "./UserActionButton.scss";
import PropTypes from "prop-types";
import { Grow, Typography, useTheme } from "@mui/material";
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';


const UserActionButton = (props) => {
    const theme = useTheme();

    const listeningStyles = props.status === "listening" ? {
        width:  "500px",
        padding: "10px",
    } : {
        width:  "100px",
    }
    
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
        },
        recorder: {
            backgroundColor: "lightgrey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row-reverse",
            height: "100px",
            marginBottom: "20px",
            transitionDuration: "0.5s",
            borderRadius: "50px",
            overflow: "hidden",
            margin: "20px",
            ...listeningStyles,
        },
        recorderWaveformContainer: {
            transitionDuration: "0.5s",
            overflow: "hidden",
            width: props.status === "listening" ? "400px" : "0px"
        },
        button: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "500%",
            height: "100%",
            // height: "100px",
            aspectRatio: "1",
            border: "none",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        }
    }

    let statusIcon,
        statusText,
        statusIconCommonProps = { className: "UserActionButton_icon" },
        isDisabled = false;

    // const [mediaRecorder, setMediaRecorder] = useState(null);
    const recorder = useAudioRecorder();

    const onClick = () => {
        if (props.status === "idle") {
            recorder.startRecording()

            // navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
            //     console.log('setting media recorder')
            //     setMediaRecorder(new MediaRecorder(mediaStream));
            // })
        }
        else {
            // mediaRecorder.stop();
            // setMediaRecorder(null);
            recorder.stopRecording()
        }
        props.onClick();
    }

    switch (props.status) {
        case "listening":
            statusIcon = <SquareIcon {...statusIconCommonProps} />;
            statusText = "Recording your voice note...";
            break;
        case "thinking":
            statusIcon = <MicIcon {...statusIconCommonProps} />;
            statusText = "Thinking...";
            isDisabled = true;
            break;
        case "speaking":
            statusIcon = <MicIcon {...statusIconCommonProps} />;
            statusText = "Talking";
            isDisabled = true;
            break;
        case "idle":
        default:
            statusIcon = <MicIcon {...statusIconCommonProps} />;
            statusText = "Record a voice note to start the conversation";
            break;
    }

    return (
        <>
            <div style={styles.container}>
                <div style={styles.recorder}>
                    <button
                        style={styles.button}
                        onClick={onClick}
                        disabled={isDisabled}
                    >
                        {statusIcon}
                    </button>
                        <div style={styles.recorderWaveformContainer}>
                            {recorder.mediaRecorder && 
                                <LiveAudioVisualizer mediaRecorder={recorder.mediaRecorder} 
                                        // blob={blob}
                                    width={400}
                                    height={200}
                                    barWidth={2}
                                    gap={3}
                                    barColor={'#f76565'}
                                />
                            }
                        </div>
                </div>
                <Typography variant="h4" >{statusText}</Typography>
            </div>
        </>
    );
};

UserActionButton.propTypes = {
    status: PropTypes.string, // standby, recording, responding (ai), thinking (ai)
    onClick: PropTypes.func,
};

export default UserActionButton;
