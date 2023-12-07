import PropTypes from "prop-types";
import "./AIPortrait.scss";

const AIPortrait = ({ status }) => {
  return (
    <img src="/AI_portrait.png" className={`AIPortrait AIPortrait-${status}`} />
  );
};

AIPortrait.propTypes = {
  status: PropTypes.string, // responding, thinking
};

export default AIPortrait;
