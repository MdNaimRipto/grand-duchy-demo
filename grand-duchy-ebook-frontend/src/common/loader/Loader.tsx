import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("./LottieLoader"), {
  ssr: false,
});

const Loader = () => {
  return (
    <>
      <LottieAnimation />
    </>
  );
};

export default Loader;
