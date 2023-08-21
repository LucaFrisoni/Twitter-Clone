"use client";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasborder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasborder }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const { user } = await useUser(userId);
    setUser(user);
  };
  useEffect(() => {
    fetchUser(); // Llamar a "fetchUser" dentro de "useEffect" para que se ejecute después del montaje.
  }, [userId]);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );
  console.log(user);
  return (
    <div
      className={`
  ${hasborder ? "border-4 border-black" : ""}
  ${isLarge ? "h-32" : "h-12"}
  ${isLarge ? "w-32" : "w-12"}
  rounded-full
  hover:opacity-90
  transition
  cursor-pointer
  relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
