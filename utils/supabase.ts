import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

// Create a custom fetch function that prints a warning for development
const customFetch = (...args: Parameters<typeof fetch>) => {
  // Check if we're using the placeholder URL
  if (supabaseUrl === 'https://example.supabase.co') {
    console.warn(
      'Using placeholder Supabase credentials. Authentication and database operations will not work. Set up real credentials in .env.local'
    );
    // For GET requests during development, return a mock successful response
    if (args[1]?.method === 'GET' || !args[1]?.method) {
      return Promise.resolve(
        new Response(JSON.stringify({ data: [], error: null }), {
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }
  }
  return fetch(...args);
};

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: customFetch,
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Types for your database tables
export type User = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  user_id: string;
  views: number;
  likes: number;
  created_at: string;
  duration: string;
  category: string;
};

export type Comment = {
  id: string;
  video_id: string;
  user_id: string;
  content: string;
  created_at: string;
  likes: number;
};

export type Channel = {
  id: string;
  name: string;
  user_id: string;
  description: string;
  avatar_url: string;
  banner_url: string;
  subscribers: number;
  created_at: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  channel_id: string;
  created_at: string;
};

export type Like = {
  id: string;
  user_id: string;
  video_id: string;
  created_at: string;
};

export type Wallet = {
  id: string;
  user_id: string;
  balance: number;
  created_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'tip' | 'subscription';
  recipient_id?: string;
  video_id?: string;
  created_at: string;
  status: 'pending' | 'completed' | 'failed';
};

// Helper functions for database operations
export async function getVideos(limit = 10, offset = 0, category?: string) {
  let query = supabase
    .from('videos')
    .select('*, user:users(username, avatar_url)')
    .order('created_at', { ascending: false })
    .limit(limit)
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }

  return data;
}

export async function getVideoById(id: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('*, user:users(username, avatar_url)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching video:', error);
    return null;
  }

  return data;
}

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function getCommentsByVideoId(videoId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select('*, user:users(username, avatar_url)')
    .eq('video_id', videoId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return data;
}

export async function addComment(videoId: string, userId: string, content: string) {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      { video_id: videoId, user_id: userId, content }
    ])
    .select();

  if (error) {
    console.error('Error adding comment:', error);
    return null;
  }

  return data[0];
}

export async function getChannels(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .order('subscribers', { ascending: false })
    .limit(limit)
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching channels:', error);
    return [];
  }

  return data;
}

export async function getWalletByUserId(userId: string) {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching wallet:', error);
    return null;
  }

  return data;
}

export async function getTransactionsByUserId(userId: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }

  return data;
}

export async function createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction])
    .select();

  if (error) {
    console.error('Error creating transaction:', error);
    return null;
  }

  return data[0];
}

export async function updateWalletBalance(userId: string, amount: number) {
  // First get current wallet
  const wallet = await getWalletByUserId(userId);
  if (!wallet) return null;

  const newBalance = wallet.balance + amount;
  
  const { data, error } = await supabase
    .from('wallets')
    .update({ balance: newBalance })
    .eq('user_id', userId)
    .select();

  if (error) {
    console.error('Error updating wallet balance:', error);
    return null;
  }

  return data[0];
} 