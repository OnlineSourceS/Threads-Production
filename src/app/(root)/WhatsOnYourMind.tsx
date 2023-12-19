"use client";
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
import { RiAddCircleFill } from "react-icons/ri";

interface Props {
  user: IUserSchema | null;
}
export function WhatsOnYourMind({ user }: Props): JSX.Element {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center justify-start ml-8 gap-5">
            <img
              src={user?.image}
              className="rounded-full w-14 h-14"
              alt=""
              srcset=""
            />
            <div
              // href={"/create-reel"}
              className=" hover:bg-opacity-80 transition flex my-8 items-center justify-between gap-2 py-2 pl-5 pr-2.5 rounded-full bg-neutral-700 cursor-text"
            >
              <span className="font-bold text-lg pl-3 text-neutral-400 mr-4">
                What's On Your Mind, {user?.name}?
              </span>
              <button className="rounded-full text-md py-2 px-8 bg-violet-500 hover:bg-violet-400 transition text-white">
                Post
              </button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Post A Short</DialogTitle>
            <DialogDescription>
              Share Your Stories To The Raw World, Share your best Life Moments
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">i</div>
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
    </>
  );
}
