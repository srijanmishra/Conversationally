import { Mic as MicIcon, Square as SquareIcon } from "react-feather";
import "./UserActionButton.scss";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const UserActionButton = (props) => {
  let statusIcon,
    statusText,
    statusIconCommonProps = { className: "UserActionButton_icon" },
    isDisabled = false;

  switch (props.status) {
    case "recording":
      statusIcon = <SquareIcon {...statusIconCommonProps} />;
      statusText = "Recording your message ...";
      break;
    case "thinking":
      statusIcon = <MicIcon {...statusIconCommonProps} />;
      statusText = "AI is thinking ...";
      isDisabled = true;
      break;
    case "responding":
      statusIcon = <MicIcon {...statusIconCommonProps} />;
      statusText = "AI is talking";
      isDisabled = true;
      break;
    default:
      statusIcon = <MicIcon {...statusIconCommonProps} />;
      statusText = "Tap to start talking with the AI";
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
