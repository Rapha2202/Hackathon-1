import { useState, useEffect, useRef } from "react";
import music from "../assets/music.mp3";

import Flames from "lottie-react";
import animationData from "../assets/lotties/flames.json";
import Footer from "../components/Footer.jsx";
import StopButton from "../components/Buttonstop.jsx";
import SantaClaus from "../components/SantaClaus.jsx";
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
        <div className="fixed w-screen h-screen z-20">
          <button
            onClick={giftClick}
            className={`h-20 w-20 ${isGift ? "fixed" : "fixed"}`}
          >
            <img src={newGift} alt="gift" />
          </button>
        </div>
      )}

      {stop && (
        <div className="fixed w-screen h-screen z-50">
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center bg-white w-[400px] h-[400px] rounded-full">
              <h1 className="text-6xl font-bold text-black mt-4">GAME OVER</h1>
              <p className="text-2xl font-bold text-black">
                Votre score est de: {score}
              </p>
              <button
                onClick={() => {
                  setStart(false);
                  setStop(false);
                  setPause(true);
                  setSeconds(0);
                  setMinutes(0);
                  setHours(0);
                  setScore(0);
                  setLoops(0);
                  audio.current.currentTime = 0;
                }}
                className="bg-black text-white mt-4 font-bold text-2xl px-4 py-2 rounded-full"
              >
                Restart
              </button>
            </div>
          </div>
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
        <div
          onClick={handleStopClick}
          className="buttonWrapper fixed z-40 left-5 bottom-5"
        >
          <StopButton />
        </div>
      )}

      <div className="flammes">
        <Flames
          className={` fixed w-1/2 ${
            minutes >= 1
              ? "bottom-0 transition-all ease-out duration-700"
              : "bottom-[-600px]  w-1/2"
          } `}
          animationData={animationData}
          options={defaultOptions}
        />
        <Flames
          className={` fixed right-0 w-1/2 ${
            minutes >= 1
              ? "bottom-0 transition-all ease-out duration-700"
              : "bottom-[-600px]  "
          } `}
          animationData={animationData}
          options={defaultOptions}
        />
      </div>
      <div className="flex justify-center fixed-bottom ">
        <button
          onClick={handlePause}
          className="h-16 w-16 bg-opacity-0 z-50 rounded-full fixed top-8 right-8 border-[3px] border-white flex justify-center items-center"
        >
          {pause ? (
            <img className="h-12" src="/play-svgrepo-com.svg" alt="pause" />
          ) : (
            <img className="h-12" src="/pause-svgrepo-com.svg" alt="resume" />
          )}
        </button>
        <img
          className="fixed left-20 bottom-40"
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
