import PropTypes from "prop-types";
import "./Buttonstop.css";

const StopButton = ({ onClick }) => {
  return (
    <div className="buttonWrapper" onClick={onClick}>
      <button className="button" />
    </div>
  );
};

StopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default StopButton;
