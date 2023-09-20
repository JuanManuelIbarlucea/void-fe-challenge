"use client";
import { PostType } from "@/types/post";
import LoadMore from "./load-more";
import { useState } from "react";
import { getPosts } from "@/lib/fetchData";
import Post from "./post";

export default function PostsList({ posts }: { posts: PostType[] }) {
  const [currentPosts, setCurrentPosts] = useState<PostType[]>(posts);
  const [pageLoaded, setPageLoaded] = useState(1);
  const [finishedLoading, setFinishedLoading] = useState(false);

  async function loadMorePosts() {
    const newPage = pageLoaded + 1;
    const newPosts = await getPosts(newPage);
    if (newPosts.length <= 0) {
      setFinishedLoading(true);
      return;
    }
    setCurrentPosts((prev) => [...prev, ...newPosts]);
    setPageLoaded(newPage);
  }

  return (
    <div className="flex flex-wrap gap-5">
      {currentPosts.map((post) => (
        <Post post={post} />
      ))}
      {!finishedLoading && <LoadMore loadMore={loadMorePosts} />}
    </div>
  );
}
