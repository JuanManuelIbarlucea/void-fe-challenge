import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdLeaderboard } from "react-icons/md";

export default function Nav() {
  const inactiveLink = "flex gap-1 p-1";
  const activeLink = `${inactiveLink} bg-white rounded-l-lg text-black text-primary`;
  const pathname = usePathname();

  return (
    <aside className="left-0 top-0 p-5 pr-0 fixed w-full h-full bg-primary md:w-auto transition-all bg-black overflow-hidden">
      <nav className="flex flex-col items-center gap-4 text-white">
        <h1 className=" text-3xl">VOID.GG</h1>
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <MdLeaderboard />
          <span className="m-auto">Leaderboard</span>
        </Link>
        {/* <Link
          href={"/posts"}
          className={pathname.includes("/posts") ? activeLink : inactiveLink}
        >
          <span>Posts</span>
        </Link> */}
      </nav>
    </aside>
  );
}
