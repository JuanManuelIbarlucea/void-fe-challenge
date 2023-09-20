import PostsList from "@/components/posts-list";
import { getPosts } from "@/lib/fetchData";
import React from "react";

export default async function PostsPage() {
  const posts = await getPosts(1);

  return (
    <>
      <h1 className="title">Posts</h1>
      <PostsList posts={posts} />
    </>
  );
}
