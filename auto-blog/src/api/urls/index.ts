export async function getAllUrl() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/content-researcher/all-website`
  ).then((response) => response.json());
}
