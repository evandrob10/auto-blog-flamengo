export async function getAllUrl() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/website/all-website`
  ).then((response) => response.json());
}
