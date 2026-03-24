import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // TODO: Re-enable auth guard after Supabase SSR cookie sync is fixed
  // const { data: { session } } = await supabase.auth.getSession();
  // if (!session && !request.nextUrl.pathname.startsWith('/admin/login')) {
  //   return NextResponse.redirect(new URL('/admin/login', request.url));
  // }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
