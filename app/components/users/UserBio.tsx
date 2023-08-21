"use client";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";
import { format } from "date-fns";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";

interface UserBioProps {
  user: any;
}

const UserBio: React.FC<UserBioProps> = ({ user }) => {
  const { data: session, status } = useSession();
  console.log("Session", session);
  const createdAt = useMemo(() => {
    return format(new Date(user?.user.createdAt), "MMMM yyyy");
  }, [user?.user.createdAt]);

  return (
    <div className=" border-b-[1px] border-neutral-800 pb-4">
      <div className=" flex justify-end p-2">
        {session?.user?.email == user?.user.email ? (
          <Button secondary label="Edit" onClick={() => {}} />
        ) : (
          <Button onClick={() => {}} label="Follow" secondary />
        )}
      </div>

      <div className=" mt-8 px-4 ">
        <div className=" flex flex-col">
          <p className=" text-white text-2xl font-semibold">
            {user?.user.name}
          </p>
          <p className=" text-md text-neutral-500">@{user?.user.name}</p>
        </div>

        <div className=" flex flex-col mt-4 ">
          <p className="text-white">{user?.user.bio}</p>
          <div className=" flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>

        <div className="flex flex-row items-center mt-4 gap-6">
          <div className=" flex flex-row items-center gap-1">
            <p className=" text-white">{user?.user.followingIds.length}</p>
            <p className=" text-neutral-500">Following</p>
          </div>
          <div className=" flex flex-row items-center gap-1">
            <p className=" text-white">{user?.followersCount}</p>
            <p className=" text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
