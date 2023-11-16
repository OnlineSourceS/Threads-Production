"use client";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const NavigateBackForward = () => {
  const router = useRouter();

  const handleBackward = () => router.back();
  const handleForward = () => router.forward();
  return (
    <div className="mt-2 fixed ">
      <button className="mr-4" onClick={handleBackward}>
        <AiOutlineArrowLeft
          className="rounded-full text-gray-300 p-2 hover:bg-gray-400/20 bg-gray-400/30 transition-all hover:text-white"
          size={30}
        />
      </button>
      <button onClick={handleForward}>
        <AiOutlineArrowRight
          className="rounded-full text-gray-300 p-2 hover:bg-gray-400/20 bg-gray-400/30 transition-all hover:text-white"
          size={30}
        />
      </button>
    </div>
  );
};

export default NavigateBackForward;
