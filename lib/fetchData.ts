export default async function getData(endpoint: string) {
  if (!endpoint.startsWith("/")) {
    throw new Error("Wrong endpoint format, forgot '/'");
  }

  const res = await fetch(`${process.env.VOID_API}${endpoint}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data, endpoint: " + endpoint);
  }

  return res.json();
}
