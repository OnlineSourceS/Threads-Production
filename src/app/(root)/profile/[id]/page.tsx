import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import FriendRequestCard from "@/components/cards/FriendRequestCard";
import {
  FriendRequest,
  getFriendRequest,
  getPendingReceivedFriendRequests,
} from "@/lib/actions/friendRequest.actions";
import { parseJsonObject } from "@/lib/utils";

interface Props {
  params: { id: string };
}
async function ProfilePage({ params }: Props) {
  let profileData: React.ReactNode | null = null;
  let receivedPendingfriendRequests = [];
  let profileTabsCopy = profileTabs;

  // * User, Whose Profile Is Opened
  const mongoUser = JSON.parse(
    JSON.stringify(await fetchUser("", params.id || ""))
  );
  if (!mongoUser) return profileData;
  if (!mongoUser?.["onboarded"]) return redirect("/onboarding");

  // * Current-User
  const user = await currentUser();
  const currentMongoUser = parseJsonObject(await fetchUser(user?.id || ""));

  const isCurrentUser: boolean = params.id === currentMongoUser?.["_id"];
  // * Friend-Request Will Be Shown or Fetched for the Current-Logged-In User, meaning We Can't See Other's Friend-Requests List
  if (isCurrentUser) {
    receivedPendingfriendRequests = parseJsonObject(
      await getPendingReceivedFriendRequests(currentMongoUser?.["_id"] || "")
    );

    console.log("------------------------------------------");
    console.log(receivedPendingfriendRequests);
  } else {
    // Remove the "Friend Requests" element from the array
    profileTabsCopy = profileTabsCopy.filter(
      (tab) => tab.value !== "friendRequests"
    );
  }

  const currentFriendRequest = parseJsonObject(
    await getFriendRequest(currentMongoUser?.["_id"], mongoUser?.["_id"])
  );

  const friendRequestsTab =
    receivedPendingfriendRequests.length === 0 ? (
      <div className="text-center my-4">
        <span className="text-gray-300 text-xl">No Remaining Requests</span>
      </div>
    ) : (
      receivedPendingfriendRequests?.map((friendRequest: FriendRequest) => (
        <FriendRequestCard
          key={friendRequest?.["_id"]}
          friendRequest={friendRequest}
        />
      ))
    );
  const tabs: React.ReactNode = (
    <Tabs defaultValue="threads" className="w-full">
      <TabsList className={`grid w-full px-3 h-[2.75rem] grid-cols-4`}>
        {profileTabsCopy.map(({ value, label, icon }, idx) => {
          const totalThreadsCount =
            value === "friendRequests" ? (
              <span className="bg-gray-300 text-black px-2 rounded-md">
                {receivedPendingfriendRequests.length}
              </span>
            ) : null;

          return (
            <TabsTrigger
              key={idx}
              className="flex justify-center items-center gap-3"
              value={value}
            >
              {icon && (
                <Image src={icon} width={25} height={25} alt="tab-icon" />
              )}
              <span>{label} </span>
              {totalThreadsCount}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value="threads">
        <ThreadsTab mongoUser={mongoUser} />
      </TabsContent>
      <TabsContent value="replies">Replies</TabsContent>
      <TabsContent value="friendRequests">
        <div className="">{friendRequestsTab}</div>
      </TabsContent>
      <TabsContent value="tagged">Tagged</TabsContent>
    </Tabs>
  );

  const profileHeader = (
    <ProfileHeader
      mongoUser={mongoUser}
      currentMongoUser={currentMongoUser}
      clerkUser={user}
      friendRequestsData={{
        currentFriendRequest,
        receivedPendingfriendRequests,
      }}
    />
  );

  profileData = (
    <section>
      {profileHeader}
      {tabs}
    </section>
  );

  return profileData;
}

export default ProfilePage;
