import { useState, useEffect, useRef } from "react";
import music from "../assets/music.mp3";

import Flames from "lottie-react";
import animationData from "../assets/lotties/flames.json";
import Footer from "../components/Footer.jsx";
import StopButton from "../components/Buttonstop.jsx";
import SantaClaus from "../components/SantaClaus.jsx";
import StartButton from "../components/Buttonstart.jsx";
import "./gift.scss";

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
  const [score, setScore] = useState(0);
  const [loops, setLoops] = useState(0);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [pause, setPause] = useState(true);
  const [pos, setPos] = useState(Math.floor(Math.random() * 95));

  const gift = [
    "/gift-1.svg",
    "/gift-2.svg",
    "/gift-3.svg",
    "/gift-4.svg",
    "gift-5.svg",
  ];

  const [newGift, setNewGift] = useState(
    gift[Math.floor(Math.random() * gift.length)]
  );

  // J'utilise useRef pour mon audio
  const audio = useRef(new Audio(music));
  audio.current.loop = true;

  const handleStopClick = () => {
    setStop(true);
    audio.current.pause();
  };

  const giftpos = document.querySelector("#gift");

  function setProperty(pos) {
    giftpos.style.setProperty("--left", pos + "%");
  }

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setPos(Math.floor(Math.random() * 95));
        setProperty(pos);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [start, pos]);

  const giftClick = () => {
    setNewGift(gift[Math.floor(Math.random() * gift.length)]);
    setPos(Math.floor(Math.random() * 95));
    setProperty(pos);
    setScore((score) => score + 25);
  };

  const handlePause = () => {
    setPause(!pause);
    if (!pause) {
      audio.current.muted = true;
    } else {
      audio.current.muted = false;
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      setPause(true);
      audio.current.muted = true;
    } else {
      setPause(false);
      audio.current.muted = false;
    }
  });

  useEffect(() => {
    if (start && !stop) {
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
          } else {
            setScore((score) => score - 1);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, minutes, pause, start, stop]);

  return (
    <div className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url('../src/assets/christmasbg.jpg')]">
      {start && !stop && (
        <div id="gift" className="h-screen fixed giftpos">
          <button onClick={giftClick} className="gift">
            <img src={newGift} alt="gift" />
          </button>
        </div>
      )}

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
      {!start ? (
        <div className="flex justify-center items-center h-[calc(100vh-145px)]">
          <StartButton
            onClick={() => {
              setPause(false);
              setStart(true);
              audio.current.play();
              const santaClaus =
                document.getElementsByClassName("santaClaus_Idle");
              santaClaus[0].classList.replace(
                "santaClaus_Idle",
                "santaClaus_Walk"
              );
            }}
          />
        </div>
      ) : (
        <div className="fixed left-40 bottom-20">
          <StopButton onClick={handleStopClick} />
        </div>
      )}

      <div className="flammes">
        <Flames
          className={` fixed w-1/2 ${
            minutes >= 1
              ? "bottom-0 transition-all ease-out duration-700"
              : "bottom-[-500px]  w-1/2"
          } `}
          animationData={animationData}
          options={defaultOptions}
        />
        <Flames
          className={` fixed right-0 w-1/2 ${
            minutes >= 1
              ? "bottom-0 transition-all ease-out duration-700"
              : "bottom-[-500px]  "
          } `}
          animationData={animationData}
          options={defaultOptions}
        />
      </div>

      <div className="flex justify-center fixed-bottom ">
        <button
          onClick={handlePause}
          className="h-16 w-16 bg-opacity-0 rounded-full fixed top-8 right-8 border-[3px] border-white flex justify-center items-center"
        >
          {pause ? (
            <img className="h-12" src="/play-svgrepo-com.svg" alt="pause" />
          ) : (
            <img className="h-12" src="/pause-svgrepo-com.svg" alt="resume" />
          )}
        </button>
        <img
          className="fixed left-40 top-10 select-none"
          src="/MariaMoves.gif"
          alt="Maria"
        />
        <div className="flex">
          <SantaClaus start={start} />
        </div>
        <div className="flex justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default App;
