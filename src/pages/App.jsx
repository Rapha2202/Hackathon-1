import { useState, useEffect, useRef } from "react";
import music from "../assets/music.mp3";

import Flames from "lottie-react";
import animationData from "../assets/lotties/flames.json";
import Footer from "../components/Footer.jsx";
import StopButton from "../components/Buttonstop.jsx";
import SantaClaus from "../components/SantaClaus.jsx";
import Footer from "../components/Footer.jsx";
import StartButton from "../components/Buttonstart.jsx";

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
  const [isGift, setIsGift] = useState(false);

  // J'utilise useRef pour mon audio
  const audio = useRef(new Audio(music));
  audio.current.loop = true;

  const handleStopClick = () => {
    setStop(true);
    audio.current.pause();
  };

  const giftClick = () => {
    setIsGift(false);
    setNewGift(gift[Math.floor(Math.random() * gift.length)]);
    setScore((score) => score + 25);
  };

  useEffect(() => {
    if (start && !stop && !pause) {
      const interval = setInterval(() => {
        setIsGift(true);
        setInterval(() => {
          setNewGift(gift[Math.floor(Math.random() * gift.length)]);
          setIsGift(false);
        }, 19000);
      }, Math.floor(Math.random() * (50000 - 20000) + 20000));
      return () => clearInterval(interval);
    }
  }, [start, stop, isGift, pause]);

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
      {start && (
        <div className="fixed w-screen h-screen z-50">
          <button
            onClick={giftClick}
            className={`h-20 w-20 ${isGift ? "fixed" : "fixed"}`}
          >
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
            // className="bg-white rounded-full text-center text-2xl py-4 px-40"
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
      <img className="fixed left-40 top-10" src="/MariaMoves.gif" alt="Maria" />
      <div className="flex">
        <SantaClaus start={start} />
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default App;
