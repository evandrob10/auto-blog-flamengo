import { urlType } from "../urls/interface";

export async function updateLinks(website: urlType | undefined) {
  if (website) {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/content-researcher/update-links`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify(website),
      }
    ).then(response => response.json());
  }
}
