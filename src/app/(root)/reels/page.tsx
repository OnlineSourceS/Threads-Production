import ReelVideoCard from "@/components/cards/ReelVideoCard";
import ReelVideosContainer from "@/components/containers/ReelVideosContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineArrowRight, AiOutlineUpload } from "react-icons/ai";
import { RiAddBoxFill, RiAddCircleFill } from "react-icons/ri";
import { ArrowRightSquare, Copy } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PostReel from "@/components/forms/PostReel";

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

function ReelsPage() {
  return (
    <section className="pt-5 pl-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Reels</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              // href={"/create-reel"}
              className="flex items-center gap-2 group py-2 px-4 bg-neutral-400/40 transition-all hover:bg-neutral-400/50  rounded-full"
            >
              <span>Upload Shorts</span>
              {/* <AiOutlineArrowRight size={24} /> */}
              <RiAddCircleFill className="h-6 w-6 hover:text-gray-600 group-hover:scale-125 transition-all" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Post A Short</DialogTitle>
              <DialogDescription>
                Share Your Stories To The Raw World, Share your best Life
                Moments
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <PostReel />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              {/* <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* Reels  */}
      <Reels></Reels>
    </section>
  );
}

export default ReelsPage;
