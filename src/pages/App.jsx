import { useState, useEffect } from "react";
// import ButtonStart from "../components/Buttonstart.jsx";
import music from "../assets/music.mp3";
import Flames from "lottie-react";
import animationData from "../assets/lotties/flames.json";

import Footer from "../components/Footer.jsx";

function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
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
            }}
          >
            START
          </button>
          {/* <div className="flex justify-center items-center h-screen">
            <Button onStartGame={startGame} />
          </div> */}
        </div>
      )}
      
      <div className="flammes">
        
        <Flames
          className={` fixed w-1/2 ${minutes >= 1 ? "bottom-0 transition-all ease-out duration-700" : "bottom-[-500px]  w-1/2"} `}
          animationData={animationData}
          options={defaultOptions}
        />
        <Flames
          className={` fixed right-0 w-1/2 ${minutes >= 1 ? "bottom-0 transition-all ease-out duration-700" : "bottom-[-500px]  "} `}
          animationData={animationData}
          options={defaultOptions}
        />
        </div>
      <div className="flex justify-center fixed-bottom ">
        <Footer />
      </div>
    </div>
  );
}

export default App;
