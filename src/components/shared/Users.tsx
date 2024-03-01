"use client";
import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import UserCard from "../cards/UserCard";
import { IUserSchema } from "@/lib/models/user.model";
import {
  ArrowBigRight,
  ArrowRightFromLine,
  ArrowRightIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaArrowRight,
} from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface Props {
  users: IUserSchema[];
  mongoUser: IUserSchema | null;
}
function Users({ users, mongoUser }: Props) {
  const [Show, setShow] = useState(true);

  return (
    <>
      <div style={{width: !Show? '0%': "auto"}} className="group relative overflow-hidden">
        <button
          className="absolute z-80 top-[50vh] -left-3"
          onClick={() => setShow((prev) => !prev)}
        >
          {" "}
          {Show ? (
            <SidebarOpenIcon
              size={30}
              className="hover:opacity-70 bg-black text-white rounded-full transition"
            />
          ) : (
            <SidebarCloseIcon
              size={30}
              className="hover:opacity-70 bg-black text-white rounded-full transition"
            />
          )}
        </button>

        <div 
          className={`h-screen text-white flex-col w-full bg-gray-500/30 `}
        >
          <div className="card h-1/2 w-80 px-2 py-3">
            <div className="flex justify-between">
              <h2 className="font-bold">Suggested Users</h2>
            </div>
            <div className="flex flex-col mt-4 rounded-lg">
              {users.length
                ? users?.map((user, idx) => (
                    <div
                      className="bg-gray-200/10 rounded-lg px-2 text-xs"
                      key={idx}
                    >
                      <UserCard
                        name={user["name"]}
                        image={user["image"]}
                        userId={user["_id"]}
                        mongoUser={mongoUser as IUserSchema}
                      />
                    </div>
                  ))
                : "No Users Found To Be Suggested!"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
