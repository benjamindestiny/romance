import React from "react";
import rom from "../assets/rom.png";
import LogoLoading from "../components/LogoLoading";



const NotFound = () => {

  const [showLoader, setShowLoader] = useState(true);

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-400">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md p-8">
          <div className="flex flex-col items-center">
            <img src={rom} alt="Romance Logo" className="w-24 h-24 mb-3" />
            <h1 className="text-2xl font-semibold text-rose-600">
              404 - Page Not Found
            </h1>
            <p className="text-sm text-gray-500">
              The page you are looking for does not exist.
            </p>
            <button className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg shadow hover:brightness-95 focus:outline-none cursor-pointer">
              Go Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
