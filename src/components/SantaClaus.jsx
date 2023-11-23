import { useEffect } from "react";
import PropTypes from "prop-types";
import "../components/santa.scss";

function SantaClaus({ start }) {
  SantaClaus.propTypes = {
    start: PropTypes.string.isRequired,
  };
  function replaceClass(before, after) {
    const santaClaus = document.getElementsByClassName(before);
    santaClaus[0].classList.replace(before, after);
  }
  useEffect(() => {
    if (start === true) {
      setTimeout(() => {
        replaceClass("santaClaus_Walk", "santaClaus_WalkV2");
        setTimeout(() => {
          replaceClass("santaClaus_WalkV2", "santaClaus_WalkV3");
          setTimeout(() => {
            replaceClass("santaClaus_WalkV3", "santaClaus_WalkV4");
            setTimeout(() => {
              replaceClass("santaClaus_WalkV4", "santaClaus_Run");
              setTimeout(() => {
                replaceClass("santaClaus_Run", "santaClaus_Jump");
                setTimeout(() => {
                  replaceClass("santaClaus_Jump", "santaClaus_MoonWalk");
                }, 240000);
              }, 240000);
            }, 240000);
          }, 240000);
        }, 240000);
      }, 240000);
    }
  }, [start]);
  return (
    <>
      <div id="santa_Id" className="fixed bottom-[0px] santaClaus_Idle"></div>
    </>
  );
}
export default SantaClaus;
