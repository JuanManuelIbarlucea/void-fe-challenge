import { getPost } from "@/lib/fetchData";
import { PostType } from "@/types/post";
import Image from "next/image";
import React from "react";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post: PostType = await getPost(params.id);

  return (
    <div className="flex flex-col gap-5 just">
      <Image
        className="m-auto w-[80%]"
        alt="Post Image"
        src={post.postImage}
        width={500}
        height={500}
      />
      <div className="flex items-center gap-4 text-gray-400">
        <Image
          className="rounded-full"
          alt={post.authorName}
          src={post.authorAvatar}
          height={50}
          width={50}
        />
        <p>{post.authorName}</p>
      </div>
      <p>{post.postText}</p>
    </div>
  );
}
