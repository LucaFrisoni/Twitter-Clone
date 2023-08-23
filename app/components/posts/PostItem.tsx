"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Post, User } from "@/types";
import { useRouter } from "next/navigation";
import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import { useSession } from "next-auth/react";
import { useUserEmail } from "@/hooks/useUser";

interface PostItemProps {
  data: Post;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const loginModal = useLoginModel();

  const [user, setUser] = useState<User | null>(null);
  const fetchUser = async () => {
    const user = await useUserEmail(session?.user?.email);
    setUser(user);
  };

  useEffect(() => {
    if (session) {
      fetchUser();
    }
    // Llamar a "fetchUser" dentro de "useEffect" para que se ejecute después del montaje.
  }, [session]);

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`users/${data.user?.id}`);
    },
    [router, data.user?.id]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`posts/${data.id}`);
    },
    [router, data?.id]
  );

  return <div>PostItem</div>;
};

export default PostItem;
