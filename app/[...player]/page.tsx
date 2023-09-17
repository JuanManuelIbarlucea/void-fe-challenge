import React from "react";
import fetchData from "@/lib/fetchData";

export default async function PlayerPage({
  params,
}: {
  params: { player: string[] };
}) {
  const leaderboard = await fetchData("/valorant/v3/matches/na/");

  const [region, name, tag] = params.player;

  return <div>page</div>;
}
