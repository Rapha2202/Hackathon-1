import PropTypes from "prop-types";

function ButtonPause({ name }) {
  ButtonPause.propTypes = {
    name: PropTypes.string.isRequired,
  };
  return (
    <button type="button" className="Start">
      {name}
    </button>
  );
}

export default ButtonPause;
