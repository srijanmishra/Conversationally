import { Mic as MicIcon, Square as SquareIcon } from "react-feather";
import "./UserActionButton.scss";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const UserActionButton = (props) => {

    const styles = {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
    }

    let statusIcon,
        statusText,
        statusIconCommonProps = { className: "UserActionButton_icon" },
        isDisabled = false;

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
            <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center"}}>
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
