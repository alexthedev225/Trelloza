import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des pages protégées
const protectedRoutes = ['/tasks', '/notes', '/evenements', '/settings'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Récupérer le token des cookies
  
  if (!token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    // Si pas de token et page protégée, redirection vers /login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Sinon, continuer la navigation normalement
  return NextResponse.next();
}

// Application du middleware uniquement aux routes protégées
export const config = {
  matcher: protectedRoutes,
};
