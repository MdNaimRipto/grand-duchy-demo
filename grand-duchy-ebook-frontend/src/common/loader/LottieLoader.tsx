import Lottie from "lottie-react";
import loaderAnimation from "../../../public/loaderAnimation.json";
import { useState } from "react";

const LottieLoader = () => {
  const storedTheme = window.localStorage.getItem("theme");
  const [uiTheme, setUiTheme] = useState<"dark" | "light">(
    storedTheme && storedTheme === "dark" ? "dark" : "light"
  );
  return (
    <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "100vh",
      // }}
      className={`${
        uiTheme === "dark" ? "bg-customBlack" : "bg-paper"
      } flex items-center justify-center h-screen`}
    >
      <Lottie
        animationData={loaderAnimation}
        loop
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};

export default LottieLoader;
