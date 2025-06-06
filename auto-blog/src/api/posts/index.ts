import { Post } from "./interface";

export async function posts(): Promise<Post[]>{
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-posts`).then(response => response.json());
}
export async function generationPosts() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writers`,{
    method: 'POST'
  }).then(response => response.json());
}
export async function updatePosts() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content-researcher/update-posts-colun`,
    {
      method: "POST",
    }
  ).then((response) => response.json());
}

export async function getAllPosts(websiteID: string) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content-researcher/all-posts/${websiteID}`
  ).then((response) => response.json());
}
