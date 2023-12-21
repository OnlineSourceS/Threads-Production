"use client";
import { IThreadSchema } from "@/lib/models/thread.model";
import { Button } from "./ui/button";
import {
  AiFillDownSquare,
  AiOutlineDown,
  AiTwotoneDownCircle,
} from "react-icons/ai";
import ThreadCard from "./cards/ThreadCard/ThreadCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { parseJsonObject } from "@/lib/utils";

interface Props {
  isNextPage: boolean;
  totalThreadsCount: number;
  threads: IThreadSchema[];
  children: React.ReactNode | null;
}

function ThreadsContainer({
  isNextPage,
  totalThreadsCount,
  threads,
  children,
  mongoUser,
  page,
}: Props) {
  const router = useRouter();
  const [PageNumber, setPageNumber] = useState(2);
  function loadMore() {
    // * Updating state before,
    setPageNumber((prev) => prev + 1);
    toast.loading("Proceeding Action...", {
      dismissible: true,
      duration: 1000,
    });
    router.push(`/?page=${PageNumber}`);
  }

  return (
    <div className="threads flex flex-col p-3">
      {threads.map((thread, idx) => {
        const {
          author,
          _id,
          threadText,
          parentId,
          community,
          children,
          likes,
          media,
          createdAt,
        } = parseJsonObject(thread);

        return threads.length ? (
          /* client-side component */
          <ThreadCard
            key={_id}
            createdAt={createdAt}
            currentUser={mongoUser as object}
            threadId={_id}
            author={author}
            threadText={threadText}
            parentId={parentId}
            community={community || null}
            replies={children}
            likes={likes}
            media={media}
          />
        ) : (
          <p>No Threads Found</p>
        );
      })}

      <div className="text-center">
        <Button
          disabled={!isNextPage}
          variant={"outline"}
          onClick={loadMore}
          className="w-40"
        >
          Load More &nbsp; <AiOutlineDown size={16} className="" />
        </Button>
      </div>
    </div>
  );
}

export default ThreadsContainer;
