import React from "react";
import LeftSidebar from "../shared/LeftSidebar";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function LeftSideBarContainer() {
  const user = await currentUser();
  if (!user?.id) return;
  const mongoUser = await fetchUser(user.id);
  return (
    <section className=" text-white bg-[#1c1b2e] h-screen px-4 sm:block hidden">
      <div className="flex flex-col justify-between items-center overflow-y-scroll gap-6 h-full">
        <LeftSidebar mongoUser={mongoUser} />
      </div>
    </section>
  );
}

export default LeftSideBarContainer;
