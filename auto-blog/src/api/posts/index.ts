import { Post } from "./interface";

export async function posts(): Promise<Post[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-posts`).then(
    (response) => response.json()
  );
}
export async function generationPosts() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writers`, {
    method: "POST",
  }).then((response) => response.json());
}
export async function updatePosts(websiteID: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content-researcher/update-posts`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ websiteID: websiteID }),
    }
  ).then((response) => response.json());
}

export async function getAllPosts(userID: number, websiteID: string) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content-researcher/all-posts/${websiteID}`
  ).then((response) => response.json());
}


