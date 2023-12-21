"use client";
import { Copy, SearchIcon } from "lucide-react";

import { toast, Toaster } from "sonner";
import {
  countReceivedFriendRequests,
  sendFriendRequest,
} from "@/lib/actions/friendRequest.actions";
import { toggleFollow } from "@/lib/actions/user.actions";
import { IUserSchema } from "@/lib/models/user.model";
import { User } from "@clerk/nextjs/server";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { IoMdCloudUpload } from "react-icons/io";
import {
  AiFillCaretRight,
  AiFillCloseCircle,
  AiOutlineCheck,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { RiChatFollowUpFill } from "react-icons/ri";
import { IFriendRequestSchema } from "@/lib/models/friendRequest.model";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UserCard from "../cards/UserCard";

interface Props {
  mongoUser: IUserSchema | null;
  clerkUser: User | null;
  currentMongoUser: IUserSchema | null;
  friendRequestsData: {
    currentFriendRequest: IFriendRequestSchema | null;
    receivedPendingfriendRequests: IFriendRequestSchema[];
  };
}

function ProfileHeader({
  friendRequestsData,
  mongoUser,
  clerkUser,
  currentMongoUser,
}: Props) {
  const path = usePathname();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleFollow(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    await toggleFollow(mongoUser?._id, currentMongoUser?._id, path);
    console.log(mongoUser?.["_id"], currentMongoUser?.["_id"]);
  }

  function handleProfileUpload(e) {
    console.log(selectedImage);
    toast.error("Image Upload Functionality Is In Process");
  }

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Use FileReader to read the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleAddFriend(e) {
    const isYourOwnProfile = currentMongoUser?._id === mongoUser?._id;
    if (isYourOwnProfile) return toast.error("You Can't Follow Yourself");

    await sendFriendRequest(currentMongoUser?._id, mongoUser?._id, path);
  }

  let isFollowing = mongoUser?.followers.includes(currentMongoUser?.["_id"]);
  const followButton =
    mongoUser?.["clerkId"].toString() !== clerkUser?.id.toString() ? (
      <button
        onClick={handleFollow}
        className={`group bg-gray-600 flex gap-2 items-center text-sm text-white px-5 py-2 rounded-xl   ${
          isFollowing ? "hover:bg-red-500/50" : " hover:bg-[#7d73fdbe]"
        } transition duration-300`}
      >
        <span>{isFollowing ? "Following" : "Follow"}</span>
        {isFollowing ? (
          <AiFillCloseCircle className="transition-all group-hover:opacity-100 group-hover:h-5 group-hover:w-5 h-0 w-0  opacity-0" />
        ) : (
          <AiOutlineUserAdd />
        )}
      </button>
    ) : null;

  const friendButton =
    mongoUser?.["clerkId"].toString() !== clerkUser?.id.toString() ? (
      <button
        onClick={handleAddFriend}
        className="bg-gray-600 text-sm text-white px-5 py-2 rounded-xl hover:bg-[#7d73fdbe] transition duration-300"
      >
        {friendRequestsData.currentFriendRequest ? (
          <span className="flex items-center gap-2">
            {friendRequestsData.currentFriendRequest.isAccepted ? (
              <span>Friends</span>
            ) : (
              <span>Sent Request</span>
            )}
            <AiOutlineCheck />
          </span>
        ) : (
          "Add Friend"
        )}
      </button>
    ) : null;
  return (
    <div>
      <div className="max-w-6xl mx-auto mb-1.5 rounded-md">
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-[12rem] px-6 py-8">
            <img
              src={mongoUser?.["image"]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-75 cursor-pointer hover:opacity-70 transition-all"></div>

            <div className="absolute flex items-center">
              <input
                type="file"
                className="hidden"
                id="profilePhoto"
                onChange={handleImageChange}
              />
              <Dialog>
                <DialogTrigger
                  disabled={
                    mongoUser?.["clerkId"].toString() !==
                    clerkUser?.id.toString()
                  }
                >
                  <img
                    src={mongoUser?.["image"]}
                    alt="User Profile Picture"
                    className=" w-32 h-32 border-white border-2 rounded-full mr-4 hover:opacity-95 opacity-75 cursor-pointer transition-all "
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Profile Photo</DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center justify-center py-5">
                          <label
                            className="relative top-[-3rem] left-[8rem] cursor-pointer bg-gray-500 rounded-full p-1"
                            htmlFor="profilePhoto"
                          >
                            <HiPencilAlt className="h-5 w-5 text-gray-300 hover:text-white transition-all" />
                          </label>

                          <img
                            src={selectedImage || mongoUser?.["image"]}
                            alt="User Profile Picture"
                            className=" w-32 h-32 border-white border-2 rounded-full mr-4 hover:opacity-95 opacity-75 cursor-pointer transition-all "
                          />
                        </div>
                        <Button
                          disabled={!selectedImage}
                          onClick={handleProfileUpload}
                        >
                          Upload Picture
                          <IoMdCloudUpload className="h-5 w-5 ml-1" />
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <div>
                <h2 className="text-3xl font-semibold text-white">
                  {mongoUser?.["name"]}
                </h2>
                <p className="text-gray-400">@{mongoUser?.["username"]}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 px-6 py-4">
            <ul className="flex space-x-4 items-center">
              <li>
                <span
                  onClick={() =>
                    console.log(
                      friendRequestsData.receivedPendingfriendRequests,
                      currentMongoUser,
                      mongoUser
                    )
                  }
                  className="text-gray-400 mr-2 hover:text-blue-500"
                >
                  Threads:
                </span>
                <span>{mongoUser?.["threads"].length}</span>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link">
                      <span className="text-gray-400 mr-2 hover:text-blue-500">
                        Followers:
                      </span>
                      <span>{mongoUser?.["followers"].length}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Followers</DialogTitle>
                      <DialogDescription>
                        Find Your All Followers
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>

                        <Input
                          type="text"
                          id="link"
                          placeholder="Search The Followers"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        variant={"link"}
                        className="px-3"
                      >
                        <SearchIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <UserCard
                      mongoUser={currentMongoUser}
                      userId={mongoUser["_id"]}
                      name={mongoUser?.name}
                      image={mongoUser?.image}
                    />
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <span className="text-gray-400 mr-2 hover:text-blue-500">
                  Following:
                </span>
                <span>{mongoUser?.["followings"].length}</span>
              </li>
              <li>{followButton}</li>
              <li>{friendButton}</li>
            </ul>
            <Accordion className="" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>About</AccordionTrigger>
                <AccordionContent className="text-gray-300 ">
                  {mongoUser?.["bio"]}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
