import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAccessToken, getUserInfo } from '../../../../../utils/coinbase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', request.url));
  }
  
  try {
    // Exchange authorization code for tokens
    const tokenData = await getAccessToken(code);
    
    // Get user data
    const userData = await getUserInfo(tokenData.access_token);
    
    // Set session cookie
    const cookieStore = cookies();
    cookieStore.set('coinbase_auth', JSON.stringify({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: Date.now() + tokenData.expires_in * 1000,
      user: userData.data
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/'
    });
    
    // Redirect to home page after successful login
    return NextResponse.redirect(new URL('/', request.url));
    
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=unknown_error', request.url));
  }
} 