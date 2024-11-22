import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <FadeLoader color="#f97316" />
    </div>
  );
};

export default Loader;
