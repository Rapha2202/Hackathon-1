import Lottie from "lottie-react";
import animation from "../assets/lotties/404.json";

function Page404() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center pb-2 h-screen items-center">
      <div className=" flex-col w-1/3 text-center">
        <Lottie
          className=""
          animationData={animation}
          options={defaultOptions}
        />
        <p className=" inline text-4xl">Oups, la page demandée n'existe pas :'( </p>
      </div>
    </div>
  );
}

export default Page404;
