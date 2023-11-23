import { useState, useEffect } from "react";
import music from "../assets/music.mp3";
import StopButton from "../components/Buttonstop.jsx";
import SantaClaus from "../components/SantaClaus.jsx";
import Footer from "../components/Footer.jsx";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [score, setScore] = useState(0);

  const [loops, setLoops] = useState(0);

  const [pause, setPause] = useState(true);

  const [start, setStart] = useState(false);

  const audio = new Audio(music);
  audio.loop = true;

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      setPause(true);
      audio.volume = 0;
    } else {
      setPause(false);
      audio.volume = 1;
    }
  });
  
  const handleStopClick = () => {
    console.log("Supplice arrêté!");
  };

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        if (minutes === 59) {
          setMinutes(0);
          setHours((hours) => hours + 1);
        }
        if (minutes % 4 === 0 && seconds === 0 && minutes !== 0) {
          setLoops((loops) => loops + 1);
        }
        if (seconds === 59) {
          setSeconds(0);
          setMinutes((minutes) => minutes + 1);
        } else {
          setSeconds((seconds) => seconds + 1);
          if (!pause) {
            setScore((score) => score + 0.5);
            audio.volume = 1;
            console.log(audio.volume);
          } else {
            setScore((score) => score - 1);
            audio.volume = 0;
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, minutes, pause, start]);
  console.log(audio.volume);
  return (
    <div className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url('../src/assets/christmasbg.jpg')]">
      <ul className="flex justify-around items-center h-[115px] w-[60%] m-auto text-black mt-[30px] bg-[#F9F9F9]/[.4] rounded-full">
        <li className="bg-white rounded-full w-1/6 text-center text-2xl py-2">
          Loop: {loops}
        </li>
        <li className="bg-white rounded-full w-1/6 text-center text-2xl py-2">
          Score: {score}
        </li>
        <li className="bg-white rounded-full w-1/6 text-center text-2xl py-2">
          {hours <= 9 ? "0" + hours : hours} :{" "}
          {minutes <= 9 ? "0" + minutes : minutes} :{" "}
          {seconds <= 9 ? "0" + seconds : seconds}
        </li>
      </ul>
      {start && (
        <div className="flex justify-center items-center h-[115px] w-[60%] m-auto text-black mt-[30px] bg-[#F9F9F9]/[.4] rounded-full">
          <button
            className="bg-white rounded-full w-[8%] text-center text-2xl py-2"
            onClick={() => {
              setPause(false);
              setStart(true);
              audio.play();
              const santaClaus =
                document.getElementsByClassName("santaClaus_Idle");
              santaClaus[0].classList.replace(
                "santaClaus_Idle",
                "santaClaus_Walk"
              );
            }}
          >
            START
          </button>
        </div>
      )}
      <button
        onClick={() => setPause(!pause)}
        className="h-16 w-16 bg-opacity-0 rounded-full fixed top-8 right-8 border-[3px] border-white flex justify-center items-center"
      >
        {pause ? (
          <img className="h-12" src="/play-svgrepo-com.svg" alt="pause" />
        ) : (
          <img className="h-12" src="/pause-svgrepo-com.svg" alt="resume" />
        )}
      </button>
      <div className="flex justify-center">
        <SantaClaus />
      <div className="flex justify-center items-center h-screen">
        <StopButton onClick={handleStopClick} />
      </div>
      {/* <div className="flex justify-center">
        <SantaClaus />
      </div> */}
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default App;
