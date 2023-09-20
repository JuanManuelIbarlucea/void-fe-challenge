import Leaderboard from "@/components/leaderboard";
import { getValorantData } from "@/lib/fetchData";

export default async function Home() {
  const leaderboard = await getValorantData("/valorant/v2/leaderboard/na");

  return (
    <main>
      <h1 className="title">Leaderboard</h1>
      <Leaderboard defaultLeaderboard={leaderboard} />
    </main>
  );
}
