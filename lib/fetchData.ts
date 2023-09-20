"use server";
export async function getValorantData(endpoint: string) {
  if (!endpoint.startsWith("/")) {
    throw new Error("Wrong endpoint format, forgot '/'");
  }
  const res = await fetch(`${process.env.VALORANT_API}${endpoint}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data, endpoint: " + endpoint);
  }

  return res.json();
}

export async function getPosts(page: number = 1) {
  const res = await fetch(
    `${process.env.POSTS_API}/posts?limit=5&page=${page}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPost(id: string) {
  const res = await fetch(`${process.env.POSTS_API}/posts/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}
