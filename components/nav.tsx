import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdLeaderboard } from "react-icons/md";
import { ImBlogger } from "react-icons/im";

export default function Nav() {
  const inactiveLink = "flex gap-1 p-1 w-full";
  const activeLink = `${inactiveLink} bg-white rounded-l-lg text-black text-primary`;
  const pathname = usePathname();

  return (
    <aside className="left-0 top-0 p-5 pr-0 sticky h-full bg-primary w-auto transition-all">
      <nav className="flex flex-col items-center gap-4 text-white">
        <h1 className=" text-3xl">VOID.GG</h1>
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <MdLeaderboard />
          <span className="m-auto">Leaderboard</span>
        </Link>
        <Link
          href={"/posts"}
          className={pathname.includes("/posts") ? activeLink : inactiveLink}
        >
          <ImBlogger />
          <span className="m-auto">Posts</span>
        </Link>
      </nav>
    </aside>
  );
}
