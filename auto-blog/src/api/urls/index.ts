export async function getAllUrl(userID: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/website/all-website/${userID}`
  ).then((response) => response.json());
}
