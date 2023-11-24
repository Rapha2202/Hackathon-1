import { useState, useEffect, useRef } from "react";
import music from "../assets/music.mp3";

import Flames from "lottie-react";
import Snow from "lottie-react";
import animationSnow from "../assets/lotties/snow.json"
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
  const [posPetit, setPosPetit] = useState(Math.floor(Math.random() * 95));
  const [posGros1, setPosGros1] = useState(Math.floor(Math.random() * 95));
  const [posGros2, setPosGros2] = useState(Math.floor(Math.random() * 95));
  const [posGros3, setPosGros3] = useState(Math.floor(Math.random() * 95));
  const [posGros4, setPosGros4] = useState(Math.floor(Math.random() * 95));

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
  const [newGift1, setNewGift1] = useState(
    gift[Math.floor(Math.random() * gift.length)]
  );
  const [newGift2, setNewGift2] = useState(
    gift[Math.floor(Math.random() * gift.length)]
  );
  const [newGift3, setNewGift3] = useState(
    gift[Math.floor(Math.random() * gift.length)]
  );
  const [newGift4, setNewGift4] = useState(
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
  const giftposGros1 = document.querySelector("#giftGros1");
  const giftposGros2 = document.querySelector("#giftGros2");
  const giftposGros3 = document.querySelector("#giftGros3");
  const giftposGros4 = document.querySelector("#giftGros4");

  function setProperty(pos) {
    giftpos.style.setProperty("--left", pos + "%");
  }

  function setProperty1(pos) {
    giftposGros1.style.setProperty("--left1", pos + "%");
  }

  function setProperty2(pos) {
    giftposGros2.style.setProperty("--left2", pos + "%");
  }

  function setProperty3(pos) {
    giftposGros3.style.setProperty("--left3", pos + "%");
  }

  function setProperty4(pos) {
    giftposGros4.style.setProperty("--left4", pos + "%");
  }

  const giftClick = () => {
    setNewGift(gift[Math.floor(Math.random() * gift.length)]);
    setPosPetit(Math.floor(Math.random() * 95));
    setProperty(posPetit);
    setScore((score) => score + 15);
  };

  const giftClickGros1 = () => {
    setNewGift1(gift[Math.floor(Math.random() * gift.length)]);
    setPosGros1(Math.floor(Math.random() * 95));
    setProperty1(posGros1);
    setScore((score) => score + 1);
  };

  const giftClickGros2 = () => {
    setNewGift2(gift[Math.floor(Math.random() * gift.length)]);
    setPosGros2(Math.floor(Math.random() * 95));
    setProperty2(posGros2);
    setScore((score) => score + 1);
  };

  const giftClickGros3 = () => {
    setNewGift3(gift[Math.floor(Math.random() * gift.length)]);
    setPosGros3(Math.floor(Math.random() * 95));
    setProperty3(posGros3);
    setScore((score) => score + 1);
  };

  const giftClickGros4 = () => {
    setNewGift4(gift[Math.floor(Math.random() * gift.length)]);
    setPosGros4(Math.floor(Math.random() * 95));
    setProperty4(posGros4);
    setScore((score) => score + 1);
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
    <Snow 
    className="fixed w-screen "
    animationData={animationSnow}
    options={defaultOptions}
    />
      {start && !stop && (
        <div>
          <div className="h-screen fixed select-none z-40">
            <button
              id="gift"
              onClick={giftClick}
              className="gift fixed giftpos"
            >
              <img src={newGift} alt="gift" className="select-none" />
            </button>

            <button
              id="giftGros1"
              onClick={giftClickGros1}
              className="giftGros fixed giftposGros1"
            >
              <img src={newGift1} alt="gift" className="select-none" />
            </button>

            <button
              id="giftGros2"
              onClick={giftClickGros2}
              className="giftGros fixed giftposGros2"
            >
              <img src={newGift2} alt="gift" className="select-none" />
            </button>

            <button
              id="giftGros3"
              onClick={giftClickGros3}
              className="giftGros fixed giftposGros3"
            >
              <img src={newGift3} alt="gift" className="select-none" />
            </button>

            <button
              id="giftGros4"
              onClick={giftClickGros4}
              className="giftGros fixed giftposGros4"
            >
              <img src={newGift4} alt="gift" className="select-none" />
            </button>
          </div>
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
        <li className="bg-white rounded-full w-1/6 text-center text-2xl py-2 select-none">
          Loop: {loops}
        </li>
        <li className="bg-white rounded-full w-1/6 text-center text-2xl py-2 select-none">
          Score: {score}
        </li>
        <li className="bg-white rounded-full w-1/6 text-center text-2xl py-2 select-none">
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
            <img
              className="h-12 select-none"
              src="/play-svgrepo-com.svg"
              alt="pause"
            />
          ) : (
            <img
              className="h-12 select-none"
              src="/pause-svgrepo-com.svg"
              alt="resume"
            />
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
