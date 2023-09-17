import Leaderboard from "@/components/leaderboard";
import fetchData from "@/lib/fetchData";

export default async function Home() {
  const leaderboard = await fetchData("/valorant/v2/leaderboard/na");

  return (
    <main>
      <h1 className="mb-6 text-3xl text-center">Leaderboard</h1>
      <Leaderboard defaultLeaderboard={leaderboard} />
    </main>
  );
}
