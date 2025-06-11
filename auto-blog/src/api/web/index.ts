import { webConfig } from "./interface";
//Config web extração:
export async function getWebConfig(websiteID: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/website/web-config/${websiteID}`
  ).then((response) => response.json())
}

export async function createWebConfig(webConfig: webConfig) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website/add-config/`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(webConfig),
  }).then((response) => response.json());
}

export async function updateWebConfig(websiteID: number, webConfig: webConfig) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/website/update-web-config/${websiteID}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(webConfig),
    }
  ).then((response) => response.json());
}
