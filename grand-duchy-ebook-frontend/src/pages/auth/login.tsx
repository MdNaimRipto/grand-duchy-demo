import Google from "@/components/auth/authProviderOptions/Google";

const Login = () => {
  return (
    <div className="flex items-center justify-center text-black h-screen bgImage">
      <div className="p-10 rounded-2xl shadow-xl text-center border border-gray bg-secondary brightness-100">
        <h1 className="text-4xl font-bold titleFont mb-6 drop-shadow-lg">
          The Grand Duchy
        </h1>
        <p className="text-lg text-primary mb-4">
          Step into a world of magic and mystery.
        </p>

        <div className="flex justify-center">
          <Google />
        </div>
      </div>
    </div>
  );
};

export default Login;
