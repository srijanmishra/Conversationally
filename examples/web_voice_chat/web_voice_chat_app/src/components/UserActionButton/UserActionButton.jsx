import { Mic, Square } from "react-feather";
import "./UserActionButton.scss";
import PropTypes from "prop-types";

const UserActionButton = (props) => {
  let statusIcon,
    statusText,
    statusIconCommonProps = { className: "UserActionButton_icon" },
    isDisabled = false;

  switch (props.status) {
    case "standby":
      statusIcon = <Mic {...statusIconCommonProps} />;
      statusText = "Start talking with the AI";
      break;
    case "recording":
      statusIcon = <Square {...statusIconCommonProps} />;
      statusText = "Recording your message ...";
      break;
    case "thinking":
      statusText = "AI is thinking ...";
      isDisabled = true;
      break;
    case "responding":
      statusText = "AI is talking";
      isDisabled = true;
      break;
    default:
      statusIcon = <Mic {...statusIconCommonProps} />;
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
