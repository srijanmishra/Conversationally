import { Mic, Square } from "react-feather";
import "./UserActionButton.scss";
import PropTypes from "prop-types";

// status: standby, recording
const UserActionButton = (props) => {
  let statusIcon;
  if (props.status === "recording") {
    statusIcon = <Square className="UserActionButton_icon" />;
  } else {
    statusIcon = <Mic className="UserActionButton_icon" />;
  }

  return (
    <button
      className={`UserActionButton UserActionButton-${props.status} ${
        props.disabled ? "disabled" : ""
      }`}
      onClick={props.onClick}
    >
      {statusIcon}
    </button>
  );
};

UserActionButton.propTypes = {
  status: PropTypes.string,
  disabled: PropTypes.boolean,
  onClick: PropTypes.func,
};

export default UserActionButton;
