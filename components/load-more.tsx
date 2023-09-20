"use client";

import Spinner from "./spinner";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function LoadMore({ loadMore }: { loadMore: () => void }) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <>
      <div className="flex justify-center items-center p-4  w-full" ref={ref}>
        <Spinner />
      </div>
    </>
  );
}
