import { NextRequest, NextResponse } from 'next/server';
import { getCoinbaseAuthUrl } from '../../../../utils/coinbase';

// Handler for initiating Coinbase OAuth
export async function GET(request: NextRequest) {
  const authUrl = getCoinbaseAuthUrl();
  return NextResponse.redirect(authUrl);
} 