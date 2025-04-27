# SlutTube

A YouTube-style video sharing platform.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Coinbase Developer account (for OAuth)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/sluttube.git
cd sluttube
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up Supabase:
   - Create a new project on [Supabase](https://supabase.com)
   - Get your Supabase URL and anon key from the project settings
   - Create a `.env.local` file in the root directory and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Coinbase OAuth:
   - Go to [Coinbase Developer Dashboard](https://www.coinbase.com/settings/api)
   - Create a new OAuth application
   - Set the redirect URI to `http://localhost:3004/api/auth/coinbase/callback` for local development
   - Copy your Client ID and Client Secret
   - Add them to your `.env.local` file:

```
NEXT_PUBLIC_COINBASE_CLIENT_ID=your_client_id
COINBASE_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3004
```

5. Set up the database schema:
   - Go to the SQL editor in your Supabase dashboard
   - Copy the contents of `supabase-schema.sql`
   - Run the SQL queries to set up the tables and policies

6. Run the development server:

```bash
npm run dev
# or
yarn dev
```

7. Open [http://localhost:3004](http://localhost:3004) in your browser to see the result.

## Database Structure

The application uses the following tables in Supabase:

- **users**: Extended user profiles
- **videos**: Video content information
- **comments**: Comments on videos
- **channels**: Creator channels
- **subscriptions**: User subscriptions to channels
- **likes**: User likes on videos
- **wallets**: User wallet balances
- **transactions**: Financial transactions (tips, deposits, etc.)

Refer to `supabase-schema.sql` for the complete database schema with Row Level Security policies.

## Features

- User authentication with Supabase Auth and Coinbase OAuth
- Video uploading and playback
- Comments and likes on videos
- Channel subscriptions
- Wallet system for tipping creators (integrated with Coinbase)
- Transaction history
- Profile management

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `NEXT_PUBLIC_COINBASE_CLIENT_ID` - Your Coinbase OAuth client ID
- `COINBASE_CLIENT_SECRET` - Your Coinbase OAuth client secret
- `NEXT_PUBLIC_APP_URL` - Your application URL (for OAuth redirect)

## Deployment

The application can be deployed on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the environment variables in the Vercel dashboard
4. Update your Coinbase OAuth redirect URI to match your production URL
5. Deploy 