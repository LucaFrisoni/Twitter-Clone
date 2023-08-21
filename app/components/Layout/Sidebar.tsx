"use client";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Sidebarlogo from "./Sidebarlogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut, useSession } from "next-auth/react";
import { data } from "autoprefixer";

const Sidebar = () => {
  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/users/`,
    },
  ];

  const { data: session, status } = useSession();
  console.log("session =>", session);
  return (
    <div className=" col-span-1 h-full pr-4 md:pr-6">
      <div className=" flex flex-col items-end">
        <div className=" space-y-2 lg:w-[230px] ">
          <Sidebarlogo />
          {items.map((nav) => (
            <SidebarItem
              key={nav.href}
              href={nav.href}
              icon={nav.icon}
              label={nav.label}
            />
          ))}
          {session?.user && (
            <SidebarItem
              icon={BiLogOut}
              onClick={() => signOut()}
              label="logout"
            />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
