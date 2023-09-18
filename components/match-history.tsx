import { MatchData, MatchPlayer } from "@/types/match";

import Image from "next/image";
import React from "react";

interface MatchHistoryProps {
  matchHistory: MatchData[];
  currentPlayer: MatchPlayer;
}

export default function MatchHistory({
  matchHistory,
  currentPlayer,
}: MatchHistoryProps) {
  return (
    <div>
      {matchHistory.map((match) => {
        const matchPlayer = match.players.all_players.find(
          (player) => player.name === currentPlayer.name
        ) as MatchPlayer;
        const roundsWon = match.rounds.reduce(
          (acc: number, round) =>
            acc + (round.winning_team === matchPlayer.team ? 1 : 0),
          0
        );
        return (
          <div className="flex gap-4 first:rounded-t-lg last:rounded-b-lg bg-slate-800 border border-slate-700 hover:bg-slate-500 p-5">
            <Image
              alt={matchPlayer.character}
              src={matchPlayer.assets.agent.small}
              className="w-[5rem] h-[5rem] rounded-lg bg-slate-700 border"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-5 w-full">
              <div className="flex justify-between">
                <>
                  {(matchPlayer.team === "Red" && match.teams.red.has_won) ||
                  (matchPlayer.team === "Blue" && match.teams.blue.has_won) ? (
                    <h3 className="text-cyan-400 font-bold">Victory</h3>
                  ) : (
                    <h3 className="text-red-600 font-bold">Defeat</h3>
                  )}
                </>
                <h3>{match.metadata.mode}</h3>
              </div>
              <div className="flex justify-between">
                <div>
                  {roundsWon}-{match.metadata.rounds_played - roundsWon}
                  <p className="text-sm text-slate-400 ">
                    {match.metadata.map}
                  </p>
                </div>
                <div>
                  <p className="text-orange-500">
                    {(
                      (matchPlayer.stats.kills + matchPlayer.stats.assists) /
                      matchPlayer.stats.deaths
                    ).toFixed(1)}
                    0 KDA
                  </p>
                  <p className="text-sm text-slate-400 ">
                    {matchPlayer.stats.kills}/{matchPlayer.stats.assists}/
                    {matchPlayer.stats.deaths}
                  </p>
                </div>
                <div>
                  {(
                    matchPlayer.stats.kills / match.metadata.rounds_played
                  ).toFixed(1)}
                  0 KPR
                  <p className="text-sm text-slate-400 ">
                    {(
                      matchPlayer.damage_made / match.metadata.rounds_played
                    ).toFixed(1)}
                    0 ADR
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
