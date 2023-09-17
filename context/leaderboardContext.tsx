import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { LeaderboardData } from "@/lib/types";
import axios from "axios";

export const regions = ["na", "eu", "ap", "kr", "latam", "br"] as const;
export type RegionType = (typeof regions)[number];

type LeaderboardContextProps = {
  leaderboard: LeaderboardData | undefined;
  region: RegionType;
  setRegion: Dispatch<SetStateAction<RegionType>>;
};
const LeaderboardContext = createContext<LeaderboardContextProps>({
  leaderboard: undefined,
  setRegion: () => {},
  region: "na",
});

axios.defaults.baseURL = "https://api.henrikdev.xyz";

export function LeaderboardProvider({ children }: { children: ReactNode }) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData>();
  const [region, setRegion] = useState<RegionType>("na");

  console.log({ leaderboard, region });
  useEffect(() => {
    axios
      .get(`/valorant/v2/leaderboard/${region}`)
      .then((response) => setLeaderboard(response.data));
  }, [region]);

  return (
    <LeaderboardContext.Provider value={{ leaderboard, setRegion, region }}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export const useLeaderboard = () => useContext(LeaderboardContext);
