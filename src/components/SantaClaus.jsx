import "../components/santa.scss";

function SantaClaus() {
  return (
    <>
      <div className="fixed bottom-[0px] santaClaus_Idle"></div>
      <button
        className="bg-white rounded-full w-[8%] text-center text-2xl py-2"
        onClick={() => {
          const santaClaus = document.getElementsByClassName("santaClaus_Walk");
          console.log(santaClaus);
          santaClaus[0].classList.replace("santaClaus_Walk", "santaClaus_Run");
          console.log(santaClaus);
        }}
      >
        Walk to Run
      </button>
      <button
        className="bg-white rounded-full w-[8%] text-center text-2xl py-2"
        onClick={() => {
          const santaClaus = document.getElementsByClassName("santaClaus_Run");
          console.log(santaClaus);
          santaClaus[0].classList.replace("santaClaus_Run", "santaClaus_Jump");
          console.log(santaClaus);
        }}
      >
        Run to Jump
      </button>
    </>
  );
}

export default SantaClaus;
