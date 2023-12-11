import PropTypes from "prop-types";
import "./AIPortrait.scss";

const AIPortrait = (props) => {
  return (
    <img src={props.src} className={`AIPortrait AIPortrait-${props.status}`} />
  );
};

AIPortrait.propTypes = {
  status: PropTypes.string, // responding, thinking
};

export default AIPortrait;
