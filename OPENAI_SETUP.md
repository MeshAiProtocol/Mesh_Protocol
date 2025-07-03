# OpenAI Setup Guide

This chatbot has been configured to use OpenAI as the default AI provider instead of XAI. Follow these steps to set up your OpenAI integration:

## Prerequisites

1. You need an OpenAI account and API key
2. Visit [OpenAI's platform](https://platform.openai.com/) to sign up if you don't have an account

## Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Database Configuration (Required)
POSTGRES_URL=your_postgres_database_url_here

# Authentication Secret (Required)
AUTH_SECRET=your_auth_secret_here
```

## Getting Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in to your account
3. Navigate to the [API Keys section](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the generated key and add it to your `.env.local` file

## Models Used

The chatbot is configured with the following OpenAI models:

- **Chat Model**: `gpt-4o` - For general conversations
- **Reasoning Model**: `o1-preview` - For advanced reasoning tasks
- **Title Model**: `gpt-4o-mini` - For generating chat titles (cost-efficient)
- **Artifact Model**: `gpt-4o` - For creating artifacts and documents
- **Image Model**: `dall-e-3` - For generating images

## Costs

Be aware that using OpenAI models will incur costs based on your usage. Check [OpenAI's pricing page](https://openai.com/pricing) for current rates.

## Development

Once you've set up your environment variables, you can start the development server:

```bash
pnpm install
pnpm dev
```

Your chatbot should now be running on [localhost:3000](http://localhost:3000) with OpenAI integration.

## Switching Back to XAI (Optional)

If you want to switch back to XAI or use a different provider, you can modify the `lib/ai/providers.ts` file to use a different AI SDK provider. 