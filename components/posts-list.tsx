"use client";

import React, { useEffect } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import LoadMore from "./load-more";
import Post from "./post";
import { PostType } from "@/types/post";
import { getPosts } from "@/lib/fetchData";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";

export default function PostsList({ posts }: { posts: PostType[] }) {
  const [currentPosts, setCurrentPosts] = useState<PostType[]>(posts);
  const [pageLoaded, setPageLoaded] = useState(1);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [authorName, setAuthorName] = useState<string>("");
  const debouncedName = useDebounce<string>(authorName, 500);

  async function loadMorePosts() {
    const newPage = pageLoaded + 1;
    const newPosts = await getPosts(newPage, authorName);
    if (newPosts.length <= 0) {
      setFinishedLoading(true);
      return;
    }
    setCurrentPosts((prev) => [...prev, ...newPosts]);
    setPageLoaded(newPage);
  }

  async function filterPosts() {
    const filteredPosts = await getPosts(1, authorName);
    setPageLoaded(1);
    setCurrentPosts(filteredPosts);
    setFinishedLoading(false);
  }

  useEffect(() => {
    filterPosts();
  }, [debouncedName]);

  return (
    <div className="flex flex-wrap gap-5">
      <div className="flex justify-end w-full items-center gap-2">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Author name"
          className="bg-transparent border border-slate-700 p-1"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setAuthorName(ev.currentTarget.value)
          }
          value={authorName}
        />
      </div>
      {currentPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {!finishedLoading && <LoadMore loadMore={loadMorePosts} />}
    </div>
  );
}
