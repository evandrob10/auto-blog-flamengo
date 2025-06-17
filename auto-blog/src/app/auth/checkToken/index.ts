import { verifyToken } from "@/api/Auth";
import { redirect } from "next/navigation";

export async function checkToken() {
  const response = await verifyToken();
  if (!response.userID) {
    return redirect("/auth/login");
  }
  return response;
}
