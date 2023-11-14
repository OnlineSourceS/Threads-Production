import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "../cards/UserCard";
import { currentUser } from "@clerk/nextjs";
import { IUserSchema } from "@/lib/models/user.model";
import { RiCloseCircleFill } from "react-icons/ri";

import Users from "./Users";

const RightSidebar = async () => {
  const user = await currentUser();
  const mongoUser = await fetchUser(user?.id);

  const { users } = await fetchUsers(mongoUser?.["_id"], 6, 1, "", "ascending"); // all-users except current-user

  // const users = await fetchUsers()
  return <Users users={users} mongoUser={mongoUser} />;
};

export default RightSidebar;
