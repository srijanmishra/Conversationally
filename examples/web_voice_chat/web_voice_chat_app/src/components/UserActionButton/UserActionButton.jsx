import { Mic, Square } from "react-feather";
import "./UserActionButton.scss";
import PropTypes from "prop-types";

const UserActionButton = (props) => {
  let statusIcon,
    isDisabled = false;

  if (props.status === "standby") {
    statusIcon = <Mic className="UserActionButton_icon" />;
  } else {
    statusIcon = <Square className="UserActionButton_icon" />;
  }

  // Ai acting
  if (props.status === "responding" || props.status === "thinking")
    isDisabled = true;

  return (
    <button
      className={`UserActionButton UserActionButton-${props.status} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={props.onClick}
    >
      {statusIcon}
    </button>
  );
};

UserActionButton.propTypes = {
  status: PropTypes.string, // standby, recording, responding (ai), thinking (ai)
  onClick: PropTypes.func,
};

export default UserActionButton;
