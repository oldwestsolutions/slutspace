// Coinbase OAuth credentials
export const COINBASE_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_COINBASE_CLIENT_ID || '36473507-0d36-4e0c-b0f4-59eae6e93e04',
  CLIENT_SECRET: process.env.COINBASE_CLIENT_SECRET || 'jyAwApMvGl_HLYPLeEZxa3ifdS',
  REDIRECT_URI: process.env.NEXT_PUBLIC_APP_URL 
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/coinbase/callback` 
    : 'http://localhost:3004/api/auth/coinbase/callback',
  AUTH_URL: 'https://www.coinbase.com/oauth/authorize',
  TOKEN_URL: 'https://api.coinbase.com/oauth/token',
  USER_INFO_URL: 'https://api.coinbase.com/v2/user',
  SCOPES: 'wallet:accounts:read,wallet:user:read',
};

// Helper to generate the authorization URL
export const getCoinbaseAuthUrl = () => {
  return `${COINBASE_CONFIG.AUTH_URL}?response_type=code&client_id=${COINBASE_CONFIG.CLIENT_ID}&redirect_uri=${COINBASE_CONFIG.REDIRECT_URI}&scope=${COINBASE_CONFIG.SCOPES}&account=all`;
};

// Helper to exchange code for token
export const getAccessToken = async (code: string) => {
  try {
    const response = await fetch(COINBASE_CONFIG.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: COINBASE_CONFIG.CLIENT_ID,
        client_secret: COINBASE_CONFIG.CLIENT_SECRET,
        redirect_uri: COINBASE_CONFIG.REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get access token');
    }

    return await response.json();
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    throw error;
  }
};

// Helper to get user information
export const getUserInfo = async (accessToken: string) => {
  try {
    const response = await fetch(COINBASE_CONFIG.USER_INFO_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user information');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error;
  }
}; 