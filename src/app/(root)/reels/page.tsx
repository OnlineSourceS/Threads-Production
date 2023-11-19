import ReelVideoCard from "@/components/cards/ReelVideoCard";
import ReelVideosContainer from "@/components/containers/ReelVideosContainer";
import Link from "next/link";
import { AiOutlineArrowRight, AiOutlineUpload } from "react-icons/ai";

function Reels() {
  const reelUrl =
    "https://utfs.io/f/a229d104-d4e0-45a7-b271-2040ef2f0d7a-3a.mp4";
  return (
    <ReelVideosContainer>
      <ReelVideoCard videoSrc={reelUrl} />
      <ReelVideoCard videoSrc={reelUrl} />
      <ReelVideoCard videoSrc={reelUrl} />
      <ReelVideoCard videoSrc={reelUrl} />
      <ReelVideoCard videoSrc={reelUrl} />
    </ReelVideosContainer>
  );
}

const ReelsPage = () => {
  return (
    <section className="pt-5 pl-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Reels</h1>
        <Link
          href={"/create-reel"}
          className="flex items-center gap-2 py-2 px-4 bg-neutral-400/40 transition-all hover:bg-neutral-400/50  rounded-full"
        >
          <span>Upload Shorts</span>
          <AiOutlineArrowRight size={24} />
        </Link>
      </div>
      {/* Reels  */}
      <Reels></Reels>
    </section>
  );
};

export default ReelsPage;
