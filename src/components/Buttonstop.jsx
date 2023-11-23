import PropTypes from "prop-types";
import "./Buttonstop.css";

const StopButton = ({ onClick }) => {
  return (
    <div className="buttonWrapper">
      <button className="button" onClick={onClick} />
    </div>
  );
};

StopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default StopButton;
