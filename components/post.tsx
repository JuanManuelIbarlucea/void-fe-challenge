"use client";
import { PostType } from "@/types/post";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Post({ post }: { post: PostType }) {
  const router = useRouter();

  return (
    <div
      key={post.id}
      className="flex gap-5 w-full bg-indigo-900 p-4 border-2 border-white rounded-lg relative"
    >
      <Image
        className="rounded-lg  cursor-pointer"
        alt={post.postText}
        src={post.postImage}
        width={350}
        height={200}
        onClick={() => router.push(`/posts/${post.id}`)}
      />
      <div className="flex flex-col justify-between">
        <p className="overflow-ellipsis">{post.postText}</p>
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
      </div>
      <p className="absolute right-2 bottom-2">
        Created: {new Date(post.createdAt).toLocaleDateString("en-US")}
      </p>
    </div>
  );
}
