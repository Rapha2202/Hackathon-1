import PropTypes from "prop-types";
import "./Buttonstart.css";

const StartButton = ({ onClick }) => {
  return (
    <div className="button-container z-50">
      <button className="start-btn" onClick={onClick}>
        Go Maria !
      </button>
    </div>
  );
};

StartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default StartButton;
