"use client";
import PostThread from "@/components/forms/PostThread";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IUserSchema } from "@/lib/models/user.model";
import { preciseTextWithThreeDots } from "@/lib/utils";
import { RiAddCircleFill } from "react-icons/ri";

interface Props {
  user: IUserSchema | null;
}
export function WhatsOnYourMind({ user }: Props): JSX.Element {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="hidden sm:block">
          <div className="pl-8">
            <div className="flex justify-start items-center gap-5">
              <img
                src={user?.image}
                className="rounded-full w-14 h-14 focus:outline hover:scale-95 transition-all cursor-pointer"
                alt=""
              />
              <div className="">
                <div className="border-2 border-gray-600 hover:bg-neutral-700 transition flex my-8 items-center justify-between gap-2 py-1 md:py-2 sm:py-1 pl-5 md:pr-2.5 pr-1  sm:pr-1.5  rounded-full bg-neutral-800 cursor-text">
                  <span className="font-bold lg:text-lg md:text-md sm:text-sm pl-3 text-xs text-neutral-400 mr-4">
                    What's On Your Mind,{" "}
                    {preciseTextWithThreeDots(user?.name, "...?", 4)}
                  </span>
                  <button className="rounded-full text-md py-2 px-8 bg-violet-500 hover:bg-violet-400 transition text-white">
                    Post
                  </button>
                </div>
                <p className="text-neutral-500 -mt-6">
                  let's share your voice to the world
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          id="shaddu"
          className="sm:max-w-2xl"
          style={{ height: "80vh", overflow: "scroll" }}
        >
          <DialogHeader>
            <DialogTitle>Post A Thread</DialogTitle>

            <DialogDescription>
              Share Your Stories To The Raw World, Share your best Life Moments
            </DialogDescription>
          </DialogHeader>
          <div className=" ">
            <PostThread userId={{ userMongoId: user?.["_id"] }} />
          </div>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
