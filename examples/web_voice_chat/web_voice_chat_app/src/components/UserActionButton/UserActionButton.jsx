import { Mic as MicIcon, Square as SquareIcon } from "react-feather";
import "./UserActionButton.scss";
import PropTypes from "prop-types";

const UserActionButton = (props) => {
  let statusIcon,
    statusText,
    statusIconCommonProps = { className: "UserActionButton_icon" },
    isDisabled = false;

  switch (props.status) {
    case "standby":
      statusIcon = <MicIcon {...statusIconCommonProps} />;
      statusText = "Start talking with the AI";
      break;
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
      statusText = "Start talking with the AI";
      break;
  }

  return (
    <>
      <button
        className={`UserActionButton UserActionButton-${props.status} ${
          isDisabled ? "disabled" : ""
        } mb-2`}
        onClick={props.onClick}
        disabled={isDisabled}
      >
        {statusIcon}
      </button>
      <p className="text-center">{statusText}</p>
    </>
  );
};

UserActionButton.propTypes = {
  status: PropTypes.string, // standby, recording, responding (ai), thinking (ai)
  onClick: PropTypes.func,
};

export default UserActionButton;
