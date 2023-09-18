"use client";

import { LeaderboardData, LeaderboardPlayer } from "@/types/leaderboard";
import { RegionType, regions, useRegion } from "@/context/regionContext";
import { useEffect, useState } from "react";

import LoadMore from "./load-more";
import Spinner from "./spinner";
import ValorantApi from "@/lib/valorantApi";
import { chunk } from "lodash";
import { useRouter } from "next/navigation";

interface LeaderboardProps {
  defaultLeaderboard: LeaderboardData;
}

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

export default function Leaderboard({ defaultLeaderboard }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] =
    useState<LeaderboardData>(defaultLeaderboard);
  const { region, setRegion } = useRegion();
  const [currentSeason, setCurrentSeason] = useState<SeasonType>("e5a3");
  const [playersIndex, setPlayerIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  async function changeRegion(ev: React.ChangeEvent<HTMLSelectElement>) {
    setIsLoading(true);
    const newRegion = ev.target.value as RegionType;
    setRegion(newRegion);
    const response = await ValorantApi.get(
      `/valorant/v2/leaderboard/${newRegion}`
    );
    setLeaderboard(response.data);
  }

  useEffect(() => {
    setPlayerIndex(0);
    setShownPlayers(chunkedPlayers[0]);
    setIsLoading(false);
  }, [leaderboard]);

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
          <select value={region} onChange={changeRegion}>
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
          {!isLoading &&
            shownPlayers.map((player, index) => (
              <tr
                key={`${player.puuid}-${index}`}
                className="hover:bg-gray-600 cursor-pointer"
                onClick={() =>
                  router?.push(
                    `/${region}/${player.gameName}/${player.tagLine}`
                  )
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
      {isLoading && (
        <div className="flex justify-center items-center p-4 bg-gray-800">
          <Spinner />
        </div>
      )}
      {!isLoading && <LoadMore loadMore={loadMorePlayers} />}
    </div>
  );
}
