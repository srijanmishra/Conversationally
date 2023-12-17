import { Mic as MicIcon, Square as SquareIcon } from "react-feather";
import "./UserActionButton.scss";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { useState } from 'react';


const UserActionButton = (props) => {

    const styles = {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        textAlign: "center",
    }

    let statusIcon,
        statusText,
        statusIconCommonProps = { className: "UserActionButton_icon" },
        isDisabled = false;

    const [mediaRecorder, setMediaRecorder] = useState(null);

    switch (props.status) {
        case "listening":
            statusIcon = <SquareIcon {...statusIconCommonProps} />;
            statusText = "Recording your voice note...";
            navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
                setMediaRecorder(new MediaRecorder(mediaStream));
            })
            break;
        case "thinking":
            setMediaRecorder(null);
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
            <div style={styles}>
                {mediaRecorder && <LiveAudioVisualizer mediaRecorder={mediaRecorder} width={200} height={75}/>}
                <button
                    className={`UserActionButton UserActionButton-${props.status} ${
                        isDisabled ? "disabled" : ""
                    } mb-2`}
                    onClick={props.onClick}
                    disabled={isDisabled}
                >
                    {statusIcon}
                </button>
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
