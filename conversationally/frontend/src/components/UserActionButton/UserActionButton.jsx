// import { Mic as MicIcon, Square as SquareIcon } from "react-feather";
import PropTypes from "prop-types";
import { Grow, Typography, useTheme } from "@mui/material";
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import "./UserActionButton.scss";
import { Mic as MicIcon, Square as SquareIcon } from "react-feather";
import GridLoader from "react-spinners/GridLoader";


const UserActionButton = (props) => {
    const theme = useTheme();

    const listeningStyles = props.status === "listening" ? {
        width:  "400px",
        padding: "10px",
        height: "70px"
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
            maxWidth: "75%",
            backgroundColor: "#18181b",
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
            boxShadow: "inset 0 0 10px 10px #18181b",
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
            backgroundColor: props.status === "thinking" ? theme.palette.info.light : "#f76565",
            color: theme.palette.secondary.main,
            transitionDuration: "0.1s",
            cursor: "pointer",
        }
    }

    let statusIcon,
        statusText,
        statusIconCommonProps = { sx: {fontSize: "50px"}, className: "UserActionButton_icon" },
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
            statusIcon = <SendRoundedIcon sx={{fontSize: "18px"}}/>;
            statusText = "Recording your voice note...";
            break;
        case "thinking":
            statusIcon = <GridLoader size={10} color={"#ffffff"}/>;
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
                                    // height={100}
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
