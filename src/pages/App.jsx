import { useState, useEffect } from "react";
// import ButtonStart from "../components/Buttonstart.jsx";
import music from "../assets/music.mp3";

import Footer from "../components/Footer.jsx";
import SantaClaus from "../components/SantaClaus.jsx";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [loops, setLoops] = useState(-1);

  const [pause, setPause] = useState(true);

  const [start, setStart] = useState(true);

  const audio = new Audio(music);
  audio.loop = true;

  useEffect(() => {
    if (!pause && !start) {
      const interval = setInterval(() => {
        if (minutes === 59) {
          setMinutes(0);
          setHours((hours) => hours + 1);
        }
        if (minutes % 4 === 0 && seconds === 0) {
          setLoops((loops) => loops + 1);
        }
        if (seconds === 59) {
          setSeconds(0);
          setMinutes((minutes) => minutes + 1);
        } else {
          setSeconds((seconds) => seconds + 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, minutes, pause, start]);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      setPause(true);
      audio.volume = 0;
    } else {
      setPause(false);
      audio.volume = 1;
    }
  });

  return (
    <div className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url('../src/assets/christmasbg.jpg')]">
      <ul className="flex justify-around items-center h-[115px] w-[60%] m-auto text-black mt-[30px] bg-[#F9F9F9]/[.4] rounded-full">
        <li className="bg-white rounded-full w-1/6 text-center text-2xl py-2">
          {loops === -1 ? 0 : loops}
        </li>
        <button
          onClick={() => {
            setPause(!pause);
            console.log(pause);
          }}
          className="bg-white rounded-full w-[8%] text-center text-2xl py-2"
        >
          PAUSE
        </button>
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
              setStart(false);
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
          {/* <div className="flex justify-center items-center h-screen">
            <Button onStartGame={startGame} />
          </div> */}
        </div>
      )}
      <div className="flex justify-center">
        <SantaClaus />
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default App;
