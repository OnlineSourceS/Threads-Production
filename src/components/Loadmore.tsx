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
import { ApiThreadsResponse, useThreads } from "@/context/ThreadsProvider";

let PageNumber = 2;

interface LoadmoreProps {
  mongoUser: IUserSchema | null;
}
export default function Loadmore({ mongoUser }: LoadmoreProps) {
  const { inView, ref } = useInView();

  const { data, setData } = useThreads();
  const hostUrl = location?.href || "http://localhost:3000";

  React.useEffect(() => {
    if (inView) {
      fetch(`${hostUrl}/api/threads/?pageNumber=${PageNumber}&pageSize=${2}`)
        .then((_) => _.json())
        .then((fetchedData: ApiThreadsResponse) => {
          console.log(
            "-fetched threads: ",
            fetchedData.isNextPage,
            fetchedData.totalThreadsCount,
            fetchedData.threads.length,

            "-state threads before setting: ",
            data.isNextPage,
            data.totalThreadsCount,
            data.threads.length
          );
          setData((prev) => {
            return {
              ...fetchedData,
              threads: [...prev?.threads, ...fetchedData?.threads],
            };
          });

          PageNumber++;
        });
      console.log("in view", "", PageNumber);
      //   PageNumber++
    }
  }, [inView, hostUrl, data]);

  return (
    <>
      {data &&
        data?.threads.map((thread) => {
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
