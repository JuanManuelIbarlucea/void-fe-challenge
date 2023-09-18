import { MatchData, MatchPlayer } from "@/types/match";

import Image from "next/image";
import MatchHistory from "@/components/match-history";
import React from "react";
import fetchData from "@/lib/fetchData";

export default async function PlayerPage({
  params,
}: {
  params: { player: string[] };
}) {
  const [region, name, tag] = params.player;
  const { data: matchHistory }: { data: MatchData[] } = await fetchData(
    `/valorant/v3/matches/${region}/${name}/${tag}`
  );

  const currentPlayer = matchHistory[0].players.all_players.find(
    (player) => player.name === name
  ) as MatchPlayer;

  const wins = matchHistory.reduce((acc: number, match: MatchData) => {
    const matchPlayer = match.players.all_players.find(
      (player) => player.name === currentPlayer.name
    ) as MatchPlayer;

    return (matchPlayer.team === "Red" && match.teams.red.has_won) ||
      (matchPlayer.team === "Blue" && match.teams.blue.has_won)
      ? acc + 1
      : acc;
  }, 0);

  const avgKda =
    matchHistory.reduce((acc: number, match: MatchData) => {
      const matchPlayer = match.players.all_players.find(
        (player) => player.name === currentPlayer.name
      ) as MatchPlayer;

      return (
        acc +
        (matchPlayer.stats.kills + matchPlayer.stats.assists) /
          matchPlayer.stats.deaths
      );
    }, 0) / matchHistory.length;

  const avgScore =
    matchHistory.reduce((acc: number, match: MatchData) => {
      const matchPlayer = match.players.all_players.find(
        (player) => player.name === currentPlayer.name
      ) as MatchPlayer;

      return acc + matchPlayer.stats.score;
    }, 0) / matchHistory.length;

  const losses = matchHistory.length - wins;
  return (
    <div className="flex flex-col gap-5 min-w-[50rem] m-auto">
      <h1 className="mb-6 text-3xl text-center">Match History</h1>
      <div className="h-[5rem] flex items-center gap-5">
        <Image
          alt={currentPlayer.character}
          src={currentPlayer.assets.agent.small}
          className="w-[5rem] h-[5rem] rounded-full bg-slate-700 border-2 border-slate-900 ring-2 ring-white"
          width={100}
          height={100}
        />
        <h2 className="text-lg font-bold">
          {name}#{tag}
        </h2>
      </div>
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-5">
        <div className="flex mb-4 gap-10">
          <div>
            {wins}W - {losses}L
            <p className="text-sm text-slate-400">Last {matchHistory.length}</p>
          </div>
          <div>
            <p className="text-cyan-600">{(wins / (wins + losses)) * 100}%</p>
            <p className="text-sm text-slate-400">Win percentage</p>
          </div>
          <div>
            <p className="text-cyan-orange">{avgKda.toFixed(1)}0</p>
            <p className="text-sm text-slate-400">Avg KDA</p>
          </div>
          <div>
            <p className="text-cyan-orange">{avgScore.toFixed(1)}0</p>
            <p className="text-sm text-slate-400">Avg Points</p>
          </div>
        </div>

        <div className="w-full bg-red-500 rounded-full h-2">
          <div
            className="bg-cyan-600 h-2 rounded-full"
            style={{ width: `${(wins / (wins + losses)) * 100}%` }}
          />
        </div>
      </div>
      <MatchHistory matchHistory={matchHistory} currentPlayer={currentPlayer} />
    </div>
  );
}
