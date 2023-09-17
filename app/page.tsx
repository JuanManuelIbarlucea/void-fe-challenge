import Leaderboard from "@/components/leaderboard";

export default async function Home() {
  return (
    <main>
      <h1 className="mb-6 text-3xl text-center">Leaderboard</h1>
      <Leaderboard />
    </main>
  );
}
