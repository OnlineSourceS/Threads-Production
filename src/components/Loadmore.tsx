"use client";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { IThreadSchema } from "@/lib/models/thread.model";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiSpinnerBold } from "react-icons/pi";
import { InView, useInView } from "react-intersection-observer";
import ThreadCard from "./cards/ThreadCard/ThreadCard";
import { parseJsonObject } from "@/lib/utils";
import { IUserSchema } from "@/lib/models/user.model";
import ThreadSkeleton from "./skeletons/cards/ThreadSkeleton";

let PageNumber = 2;

interface ApiThreadsResponse {
  isNextPage: boolean;
  threads: IThreadSchema[];
  totalThreadsCount: number;
}

interface LoadmoreProps {
  mongoUser: IUserSchema | null;
}
export default function Loadmore({ mongoUser }: LoadmoreProps) {
  const { inView, ref } = useInView();
  const [Data, setData] = useState<ApiThreadsResponse>({
    threads: [],
    isNextPage: false,
    totalThreadsCount: 0,
  });

  const hostUrl = location?.href || "http://localhost:3000";

  React.useEffect(() => {
    if (inView) {
      fetch(`${hostUrl}/api/threads/?pageNumber=${PageNumber}&pageSize=${2}`)
        .then((_) => _.json())
        .then((d: ApiThreadsResponse) => {
          console.log(
            "-fetched threads: ",
            d.isNextPage,
            d.totalThreadsCount,
            d.threads.length,

            "-state threads before setting: ",
            Data.isNextPage,
            Data.totalThreadsCount,
            Data.threads.length
          );
          setData((prev) => {
            return {
              threads: [...prev?.threads, ...d?.threads],
              isNextPage: d.isNextPage,
              totalThreadsCount: d.totalThreadsCount,
            };
          });

          PageNumber++;
        });
      console.log("in view", "", PageNumber);
      //   PageNumber++
    }
  }, [inView, hostUrl, Data]);

  return (
    <>
      {Data &&
        Data?.threads.map((thread) => {
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

          return (
            <ThreadCard
              key={_id}
              createdAt={createdAt}
              currentUser={mongoUser}
              threadId={_id}
              author={author}
              threadText={threadText}
              parentId={parentId}
              community={community || null}
              replies={children}
              likes={likes}
              media={media}
            />
          );
        })}

      <div ref={ref} className="loadmore flex flex-col gap-2">
        <ThreadSkeleton />
        <ThreadSkeleton />
      </div>
    </>
  );
}
