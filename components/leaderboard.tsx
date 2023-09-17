"use client";

import { LeaderboardData, LeaderboardPlayer } from "@/lib/types";
import {
  RegionType,
  regions,
  useLeaderboard,
} from "@/context/leaderboardContext";

import LoadMore from "./load-more";
import { chunk } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";

const seasons = [
  "e5a3",
  "e5a2",
  "e5a1",
  "e4a3",
  "e4a2",
  "e4a1",
  "e3a3",
  "e3a2",
  "e3a1",
  "e2a3",
  "e2a2",
  "e2a1",
] as const;

type SeasonType = (typeof seasons)[number];

export default function Leaderboard() {
  const [currentSeason, setCurrentSeason] = useState<SeasonType>("e5a3");
  const [playersIndex, setPlayerIndex] = useState(0);
  const { leaderboard, region, setRegion } = useLeaderboard();
  const router = useRouter();

  const chunkedPlayers = chunk(
    leaderboard?.players.filter((player) => player.gameName !== ""),
    1000
  );

  const [shownPlayers, setShownPlayers] = useState<LeaderboardPlayer[]>(
    chunkedPlayers[0]
  );

  function loadMorePlayers() {
    setTimeout(() => {
      const nextPage = playersIndex + 1;
      const newPlayers = chunkedPlayers[nextPage];
      setShownPlayers((prev) => [...prev, ...newPlayers]);
      setPlayerIndex(nextPage);
    }, 2000);
  }

  return (
    <div className="overflow-y-auto max-h-[50rem] scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-slate-700">
      <div className="bg-gray-700 pt-5 pl-5 rounded-t-lg">
        <div className="flex gap-4">
          <select
            value={currentSeason}
            onChange={(ev) => setCurrentSeason(ev.target.value as SeasonType)}
          >
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season.toUpperCase()}
              </option>
            ))}
          </select>
          <select
            value={region}
            onChange={(ev) => setRegion(ev.target.value as RegionType)}
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank #</th>
            <th>Player Name</th>
            <th>RR</th>
            <th>Matches Won</th>
          </tr>
        </thead>
        <tbody>
          {shownPlayers?.map((player, index) => (
            <tr
              key={`${player.puuid}-${index}`}
              className="hover:bg-gray-600 cursor-pointer"
              onClick={() =>
                router?.push(`/${region}/${player.gameName}/${player.tagLine}`)
              }
            >
              <td>{player.leaderboardRank}</td>
              <td>{player.gameName}</td>
              <td className="text-emerald-500">{player.rankedRating}</td>
              <td>{player.numberOfWins}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {leaderboard && <LoadMore loadMore={loadMorePlayers} />}
    </div>
  );
}
