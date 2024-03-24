"use client";

import { PiShareFatLight } from "react-icons/pi";

import { IUserSchema } from "@/lib/models/user.model";
import { ObjectId, Schema } from "mongoose";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  Dispatch,
  DispatchWithoutAction,
  FormEvent,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  deleteThreadAndChildren,
  postThreadReply,
  updateLikes,
} from "@/lib/actions/thread.actions";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { IThreadSchema } from "@/lib/models/thread.model";
import {
  formatTimestamp,
  isLikedByTheUser,
  parseJsonObject,
} from "@/lib/utils";
import { usePathname } from "next/navigation";
import { RiDeleteBin2Fill, RiSave3Fill, RiSendPlaneFill } from "react-icons/ri";
import { MediaType } from "@/utils/types";
import {
  DeleteIcon,
  FileHeartIcon,
  HeartIcon,
  Loader2Icon,
} from "lucide-react";
import { toast } from "sonner";
import threadReducer from "./reducer";
import MediaContent from "./MediaContent";
import {
  HiDotsCircleHorizontal,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import DropdownMenuComponent from "@/components/shared/DropdownComponent";
import ModalComponent from "@/components/shared/ModalComponent";
import { useRouter } from "next/navigation";
import { useThreads } from "@/context/ThreadsProvider";
 interface ThreadProps {
  currentUser: IUserSchema | null;
  threadId: ObjectId;
  author: IUserSchema | Schema.Types.ObjectId; // Assuming author is of type string
  threadText: string;
  parentId?: string;
  community?: ObjectId | null; // Assuming community can be null or a string
  replies: ObjectId[]; // Assuming children is an array of string IDs Of Itself means {{Thread-Model}}
  isComment?: boolean;
  likes: ObjectId[];
  media: MediaType[];
  createdAt: Date;
}
function ThreadCard({
  threadId,
  author,
  threadText,
  parentId,
  community,
  replies,
  isComment,
  currentUser,
  likes,
  media,
  createdAt,
}: Readonly<ThreadProps>) {
  console.log(replies);
  const [Loading, setLoading] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const shareLinkInputRef = useRef<HTMLInputElement | null>(null);
  const { setData, data } = useThreads();
  const [state, dispatch] = useReducer(
    threadReducer, // Define the initial state
    {
      isVisibleReplyForm: false,
      isVisibleReplies: false,
      isShownMoreMedia: false,
      isLiked: isLikedByTheUser(likes || [], currentUser?.["_id"]),
    }
  );
  async function handleShareLinkCopy(text: string) {
    navigator.clipboard.writeText(text);
    // shareLinkInputRef.current?.select();
    // document.execCommand("copy");

    toast.success("Successfully Copied Share");
  }
  async function handlePostingThreadReply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const replyText = formData.get("replyText");
    if (replyText?.length === 0 || replyText === "") return;

    setLoading(true);
    currentUser?.["_id"];

    await postThreadReply({
      // @ts-ignore
      threadId,
      replyText: replyText as string,
      // @ts-ignore
      userId: currentUser?.["_id"],
      path,
    });

    toast("Shared Your Thoughts!");

    if (!state.isVisibleReplies) {
      dispatch({ type: "TOGGLE_THREAD_REPLIES" });
    }
    setLoading(false);
    // * Clearing the value/text of input-elment
    // e.currentTarget.childNodes[0].childNodes[1].value = "";
  }
  const handleLikes = async () => {
    dispatch({ type: "TOGGLE_LIKES_COUNT" });

    await updateLikes(currentUser?.["_id"], threadId, path);
    toast.success("Feedback Shared With Author");
    // console.log(currentUser?._id, threadId, "hteuh", state.isLiked);
  };
  const toggleReplyForm = () => dispatch({ type: "TOGGLE_THREAD_REPLY_FORM" });
  const toggleThreadReplies = () => dispatch({ type: "TOGGLE_THREAD_REPLIES" });

  const routeToThreadDetails = (
    <div className="thread-details mt-3">
      <Link href={`/thread/${threadId}`}>
        <span className="text-xs flex gap-0.5  items-center text-gray-300 hover:text-gray-100">
          <span>See More</span>
          <span>
            <RightArrow />
          </span>
        </span>
      </Link>
    </div>
  );

  const repliesToggleButton =
    replies.length !== 0 ? (
      <button
        onClick={toggleThreadReplies}
        className="text-gray-200 flex items-center gap-1 font-semibold rounded-xl bg-[#e4e4e426] py-1.5 px-3 transition-all hover:bg-[#e4e4e436] "
      >
        <span>
          {state.isVisibleReplies ? <ReplyUpArrow /> : <ReplyDownArrow />}
        </span>

        <span className="text-xs font-bold">
          {replies.length === 1 ? "1 Reply" : `${replies.length} Replies`}
        </span>
      </button>
    ) : null;

  const replyToggleButton = (
    <button
      onClick={toggleReplyForm}
      className="text-gray-200 flex items-center gap-1 font-semibold rounded-xl bg-[#e4e4e426] px-5 py-2 transition-all hover:bg-[#e4e4e436] "
    >
      <span>{/* <ReplyUpArrow /> */}</span>
      <span>Reply</span>
    </button>
  );

  const threadReplyForm = (
    <form
      onSubmit={handlePostingThreadReply}
      className="py-6 rounded-lg shadow-md border-gray-600"
    >
      <div className="flex items-center">
        <img
          src={currentUser?.["image"]}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <input
          type="text"
          name="replyText"
          placeholder="Add a thread..."
          className="w-full border rounded-xl px-4 py-2 focus:outline-none border-gray-300 focus:border-purple-300 bg-black text-white"
        />
      </div>
      <div className="btns flex items-start gap-2">
        <Button
          onClick={toggleReplyForm}
          className="mt-3 rounded-xl ml-12"
          variant={"outline"}
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant={"default"}
          disabled={Loading}
          className="rounded-xl mt-3 gap-1"
        >
          <span>Thread</span>
          {Loading ? (
            <Loader2Icon className="animate-spin" size={20} />
          ) : (
            <RiSendPlaneFill className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  );
  const threadReplies: React.ReactNode[] | React.ReactNode =
    replies.length === 0 ? (
      <p className="text-gray-500 ml-2">No Replies</p>
    ) : (
      replies.map((reply: IThreadSchema, idx) => {
        // localStorage.getItem("getSessionProvider", {});
        const {
          _id,
          author,
          threadText,
          parentId,
          createdAt,
          community,
          likes,
          media,
        } = parseJsonObject(reply);

        return (
          <ThreadCard
            key={_id}
            author={author}
            currentUser={currentUser}
            likes={likes}
            media={media}
            replies={[]}
            threadId={_id}
            threadText={threadText}
            createdAt={createdAt}
            parentId={parentId}
          />
        );
      })
    );

  const threadCard = (
    <article className="flex flex-col p-5 m-4 justify-center bg-[#857df82d] rounded-2xl">
      <section className="flex gap-2">
        <img
          src={author?.["image"]}
          className="h-[2.2rem] w-[2.2rem] rounded-full "
          alt="profile"
        />
        <div className="userText w-full">
          <div className="flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/profile/${author?.["_id"]}`}
                    // title={"Author: " + author?.["name"]}
                    className="flex gap-2 text-xs cursor-pointer mb-1 font-semibold text-gray-100"
                  >
                    <span>{author?.["name"]}</span>
                    <span className="text-xs text-neutral-400">
                      ({formatTimestamp(createdAt)})
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{"Author: " + author?.["name"]}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenuComponent
              items={[
                // @CodeWith-HAMZA
                // @ts-ignore
                {
                  type: "item",
                  onClick: async () => {
                    if (currentUser?._id !== author?._id) {
                      return toast.error(
                        "You Don't Have Permission To Delete The Post"
                      );
                    }
                    if (confirm("Are You Sure To Delete The Post?")) {
                      setData((prevData) => {
                        const newThreads = prevData.threads.filter(
                          (thread) => thread._id !== threadId
                        );
                        return {
                          ...prevData,
                          threads: newThreads,
                        };
                      });
                      await deleteThreadAndChildren(threadId, path);
                      router.refresh();
                      toast.success("Deleted The Post");
                    }
                  },
                  icon: <RiDeleteBin2Fill />,
                  text: "Delete",
                  className: "text-red-500 hover:bg-red-500",
                },
                {
                  type: "item",
                  text: "Save Post",
                  icon: <RiSave3Fill />,
                },
              ]}
              triggerText={
                <button className="hover:opacity-70">
                  <HiOutlineDotsHorizontal />
                </button>
              }
              key={"dropdownText"}
            />
          </div>

          <p className="text-xs -mt-1.5 mb-2 text-gray-400">
            @{author?.["username"]}
          </p>

          <div className="text-sm mt-1 text-gray-300">
            <p className="text-lg">{threadText}</p>
            {routeToThreadDetails}
            <div className="bg-gray-600 p-[0.5px]" />
            {media ? (
              <MediaContent
                media={media}
                dispatch={dispatch}
                isShownMoreMedia={state.isShownMoreMedia}
              ></MediaContent>
            ) : null}
            <div className="flex items-center mt-2 mb-1 gap-2">
              <span
                onClick={handleLikes}
                title="Demo Feature (Currently in Process...)"
                className="bg-gray-800 rounded-full p-2 hover:bg-gray-700 "
              >
                {state.isLiked ? <HeartIconSolid /> : <HeartIconOutline />}
              </span>

              <Image
                src="/assets/share.svg"
                alt="heart"
                width={23}
                height={23}
                className="cursor-pointer object-contain text-white"
              />

              <Dialog>
                <DialogTrigger
                  title="Share the post"
                  className="bg-gray-800 p-2 transition-all hover:bg-gray-700 rounded-full"
                >
                  <PiShareFatLight size={20} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Share With Your All Social Media Handles
                    </DialogTitle>
                    <DialogDescription>
                      <span>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </span>
                      <div className="flex mt-3 gap-4 items-center justify-center">
                        <Input
                          ref={shareLinkInputRef}
                          value={`https://${location.hostname}/thread/${threadId}`}
                        />
                        <Button
                          onClick={() =>
                            handleShareLinkCopy(
                              `https://${location.hostname}/thread/${threadId}`
                            )
                          }
                          title="Copy Post Url"
                        >
                          <LinkIcon />
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            {/* <span className="ml-0.5 font-bold">
              <span className="text-md mr-1">
                {likes
                  ? Number(likes.length) + Number(state.isLiked)
                    ? 1
                    : 0
                  : "NE"}
              </span>
              <span className="text-md">
                {Number(likes?.length) > 1 ? "Likes" : "Like"}
              </span>
            </span> */}
            <div className="replies flex gap-3 mt-2.5">
              {repliesToggleButton}
              {replyToggleButton}
            </div>
            {state.isVisibleReplyForm ? threadReplyForm : null}
            {state.isVisibleReplies ? (
              <div className="mt-4 border-2 border-r-0 border-b-0 border-neutral-700 rounded-2xl">
                {threadReplies}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );

  return threadCard;
}
// console.log()
// this is the thread card

function ReplyDownArrow() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3.5 h-3.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </>
  );
}
function ReplyUpArrow() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3.5 h-3.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </>
  );
}
function RightArrow() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </>
  );
}

function HeartIconSolid(props: React.HTMLProps<HTMLSpanElement>) {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 hover:text-red-600 transition-all text-red-500"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    </span>
  );
}
function HeartIconOutline(props: React.HTMLProps<HTMLSpanElement>) {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 hover:text-red-600 transition-all text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </span>
  );
}
function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
}

export default ThreadCard;
