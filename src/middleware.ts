import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'

const protectedRoutes = ['/',
    '/usersmanagement',
    '/scanresults',
    '/complaints',
    '/workshops',
    '/queries']
const publicRoutes = ['/login']

export default async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const token = (await cookies()).get('session')?.value
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/usersmanagement',
        '/login',
        '/scanresults',
        '/complaints',
        '/workshops',
        '/queries',
    ],
}