"use client";
import { toast } from "sonner";

function ReelCard() {
  return (
    <div
      onClick={() => toast.loading("Proceeding...")}
      className="w-40 cursor-pointer hover:bg-gray-800 transition-all h-64 p-4 m-2 rounded-lg shadow-lg inline-block reel-card"
    >
      Reel 1
    </div>
  );
}

export default ReelCard;
