import PropTypes from "prop-types";

function ButtonStop({ name }) {
  ButtonStop.propTypes = {
    name: PropTypes.string.isRequired,
  };
  return (
    <button type="button" className="Start">
      {name}
    </button>
  );
}

export default ButtonStop;