import PropTypes from "prop-types";

function ButtonStart({ onStartGame }) {
  return (
    <button
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-110"
      onClick={onStartGame}
    >
      Start
    </button>
  );
}

ButtonStart.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default ButtonStart;
