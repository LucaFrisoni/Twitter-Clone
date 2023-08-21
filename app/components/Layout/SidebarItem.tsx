"use client";
import useLoginModel from "@/hooks/useLoginModel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  href?: string;
  icon: IconType;
  label: string;
  onClick?: () => void;
  auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon: Icon,
  label,
  onClick,
  auth,
}) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const loginModal = useLoginModel();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !session) {
      return loginModal.onOpen();
    }

    if (href) {
      return router.push(href);
    }
  }, [router, onClick, href, session, auth,loginModal]);
  return (
    <div onClick={handleClick} className=" flex flex-row items-center">
      {/* mobile */}
      <div className=" relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      {/* mobile */}
      <div className=" relative hidden lg:flex  gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
