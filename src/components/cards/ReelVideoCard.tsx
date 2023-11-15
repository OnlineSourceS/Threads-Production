import React from "react";
import { Button } from "../ui/button";
import { ShareIcon, ThumbsDown, ThumbsUp } from "lucide-react";
import { AiOutlineMessage } from "react-icons/ai";
import { RiShareFill, RiVideoFill } from "react-icons/ri";

interface ReelVideoCardProps {
  videoSrc: string;
}

const ReelVideoCard: React.FC<ReelVideoCardProps> = ({ videoSrc }) => {
  return (
    <div className="video relative h-[70vh] w-[28vw] snap-start ">
      <video
        src={videoSrc}
        loop
        className="h-full opacity-90 w-full object-cover rounded-lg"
      />
      <div className="overlay absolute top-0 left-0 h-full w-full">
        <div className="text-white flex flex-col justify-between w-full h-full">
          <div className="upper p-4 self-end">
            <button className=" text-xs flex gap-2 bg-gray-400/30 hover:bg-gray-400/50 transition-all items-center rounded-full py-2 px-5 ">
              <span>More Videos</span>
              <RiVideoFill size={22} />
            </button>
          </div>
          <div className="mid self-end flex flex-col gap-5 p-1">
            <button className="flex flex-col items-center gap-1 opacity-90 ">
              <div className="icon bg-gray-700/10 transition hover:bg-gray-400/30 p-3  rounded-full">
                <ThumbsUp size={23} className="" />
              </div>
              <span className="text-xs">Like</span>
            </button>
            <button className="flex flex-col items-center gap-1 opacity-90 ">
              <div className="icon bg-gray-700/10 transition hover:bg-gray-400/30 p-3  rounded-full">
                <ThumbsDown size={23} />
              </div>
              <span className="text-xs ">Dislike</span>
            </button>
            <button className="flex flex-col items-center gap-1 opacity-90 ">
              <div className="icon bg-gray-700/10 transition hover:bg-gray-400/30 p-3  rounded-full">
                <AiOutlineMessage size={23} />
              </div>
              <span className="text-xs ">Comments</span>
            </button>
            <button className="flex flex-col items-center gap-1 opacity-90 ">
              <div className="icon bg-gray-700/10 transition hover:bg-gray-400/30 p-3  rounded-full">
                <RiShareFill size={23} />
              </div>
              <span className="text-xs ">Share</span>
            </button>
            {/* <button>Dislike</button>
            <button>Comments</button>
            <button>Share</button> */}
          </div>
          <div className="lower flex justify-between items-center p-4">
            <div className="cursor-pointer accountProfile flex gap-2 items-center">
              <img src="/logo.svg" className="w-8 h-8" alt="" srcset="" />
              <span>Account Name</span>
            </div>
            <button className="text-white bg-[#867DFA] hover:opacity-95 transition rounded-lg px-3 py-1">
              Follow +
            </button>
          </div>
        </div>
        {/* Add more elements as needed */}
      </div>
    </div>
  );
};

export default ReelVideoCard;
