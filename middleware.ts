import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("sb-access-token")?.value;

  const { pathname } = req.nextUrl;

  // Rotas públicas:
  const publicPaths = ["/login", "/register", "/favicon.ico"];

  const isPublic = publicPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Se não está logado e tenta acessar rota privada → redireciona
  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se usuário logado tenta ir para login/register → manda para dashboard
  if (session && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/jogos/:path*", "/profile/:path*"],
};