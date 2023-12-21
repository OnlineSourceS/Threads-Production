import ActivityCard from "@/components/cards/ActivityCard";
import { getActivity } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { IThreadSchema } from "@/lib/models/thread.model";
import { IUserSchema } from "@/lib/models/user.model";
import { parseJsonObject } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

async function ActivityPage() {
  const user = await currentUser();
  const mongoUser = await fetchUser(user?.id);
  const res = await getActivity(mongoUser?._id);

  return (
    <section>
      <h1 className="text-2xl font-semibold my-3 mx-1">Activity</h1>
      {res.map((reply: IThreadSchema, idx) => (
        <div key={idx}>
          <ActivityCard reply={parseJsonObject(reply)} />
        </div>
      ))}
    </section>
  );
}

export default ActivityPage;
