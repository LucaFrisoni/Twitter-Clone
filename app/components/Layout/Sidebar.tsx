"use client";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import Sidebarlogo from "./Sidebarlogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut, useSession } from "next-auth/react";

import { User } from "@/types";
import { useUserEmail } from "@/hooks/useUser";

import { useDispatch } from "react-redux";
import { logout, setUser } from "@/redux/actions";

const Sidebar = () => {
  const { data: session, status } = useSession();

console.log("me Renderice")


  const dispatch = useDispatch();

  const [user, setUserr] = useState<User | null>(null);
  const fetchUser = async () => {
    const user = await useUserEmail(session?.user?.email);
    setUserr(user);
    dispatch(setUser(user));
  };

  useEffect(() => {
    if (session) {
      fetchUser();
    }
    // Llamar a "fetchUser" dentro de "useEffect" para que se ejecute después del montaje.
  }, [session]);

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
      auth: true,
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/users/${user?.id}`,
      auth: true,
    },
  ];

  const handleLogOut = () => {
    signOut();
    dispatch(logout());
  };

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
              auth={nav.auth}
            />
          ))}
          {session?.user && (
            <SidebarItem
              icon={BiLogOut}
              onClick={() => handleLogOut()}
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
