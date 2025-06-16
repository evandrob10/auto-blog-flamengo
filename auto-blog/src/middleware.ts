import { NextRequest, NextResponse } from "next/server";

function createURL(path: string, Request: NextRequest) {
  return NextResponse.redirect(new URL(path, Request.url));
}

export function middleware(Request: NextRequest) {
  const path = Request.nextUrl.pathname;
  const token = Request.cookies.get("token");
  //Verifica se usuario está logado e não permite ele relogar ou registrar!
  if (token && path === "/auth/login") return createURL("/painel", Request);
  if (token && path === "/auth/register") return createURL("/painel", Request);
  //Permite usuario navegar se estiver com token
  if (token) return NextResponse.next();
  //Caso usuario não tenha token será redirecionado para login!
  if (!token && path === "/auth/login") return NextResponse.next();
  if (!token && path === "/auth/register") return NextResponse.next();
  return createURL("/auth/login", Request);
}

export const config = {
  matcher: ["/auth/:path*", "/painel/:path*"],
};
