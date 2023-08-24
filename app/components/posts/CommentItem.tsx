"use client";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItemProps {
  data: any;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: any) => {
      // detiene el onclick del padre
      event.stopPropagation();
      router.push(`http://localhost:3000/users/${data.user?.id}`);
    },
    [router, data.user?.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div className=" bg-neutral-900 border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-800 transition">
      <div className=" flex flex-row items-start gap-3">
        <Avatar profileImage={data.user.profileImage} userId={data.user.id}/>
        <div>
          <div className=" flex flex-row items-center gap-2 ">
            <p
          
              className=" text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span onClick={goToUser} className="text-neutral-400  cursor-pointer hover:underline hidden md:block ">
              @{data.user.username}
            </span>
            <span className=" text-neutral-500 text-sm ">{createdAt}</span>
          </div>
          <div className=" text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
