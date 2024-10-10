## Next.js AI Chatbot

[Next.js AI Chatbot](https://vercel.com/templates/next.js/nextjs-ai-chatbot)

https://github.com/vercel/ai-chatbot

https://vercel.com/johnnyexamindios-projects/ai-chatbot

See [password.txt](password.txt) in local DOLOMITES for app login credentials.

Uses this KV Store: https://vercel.com/johnnyexamindios-projects/~/stores/kv/store_5jlSjKqR6fpqAhct/cli

2024-10-10 Update:

Shelving this for now. One useful feature that came out of this is the ability to log in to Nextjs from Firebase. Add this to Firebase api endpoint to test this:

```typescript
import { verify } from './endpoints/verify'
import { sign as hash } from '../utils/signature'

// Used by other applications to verify the signature of a message
app.post('/v1.0/verify', verify())

// Launch Next.js app
// http://127.0.0.1:5001/demo-project/us-central1/api/v1.0/launch
app.get('/v1.0/launch', (req, res) => {
  const message = {
    id: '-seed-user-stu',
    name: 'Stu',
    email: 'stu@email.com'
  }

  const h = hash(
    JSON.stringify(message),
    new Date(Date.now() + 1000 * 60 * 60 * 24)
  )

  res.send(`
    <html>
      <head>
        <title>Launch</title>
      </head>
      <body>
        <form action="http://localhost:3000/api/login" method="post">
          <input type="hidden" name="message" value="${encodeURIComponent(
            JSON.stringify(message)
          )}">
          <input type="hidden" name="hash" value="${encodeURIComponent(h)}">
          <input type="hidden" name="redirect" value="/">
          <button type="submit">Launch</button>
        </form>
      </body>
    </html>
  `)
})
```

Where endpoints/verify is:

```typescript
import express from 'express'
import { ErrorResponse } from '../../errors/ErrorResponse'
import { catchAsync } from '../../errors/catchAsync'
import { verify as check } from '../../utils/signature'

export const verify = () =>
  catchAsync(async (req: express.Request, res: express.Response) => {
    const { message, hash } = req.body

    if (!check(message, hash)) throw new ErrorResponse('Invalid hash')

    res.send({ message })
  })
```

==

<a href="https://chat.vercel.ai/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="https://chat.vercel.ai/opengraph-image.png">
  <h1 align="center">Next.js AI Chatbot</h1>
</a>

<p align="center">
  An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, OpenAI, and Vercel KV.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Support for OpenAI (default), Anthropic, Cohere, Hugging Face, or custom AI chat models and/or LangChain
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Phosphor Icons](https://phosphoricons.com)
- Chat History, rate limiting, and session storage with [Vercel KV](https://vercel.com/storage/kv)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication

## Model Providers

This template ships with OpenAI `gpt-3.5-turbo` as the default. However, thanks to the [Vercel AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), [Hugging Face](https://huggingface.co), or using [LangChain](https://js.langchain.com) with just a few lines of code.

## Deploy Your Own

You can deploy your own version of the Next.js AI Chatbot to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?demo-title=Next.js+Chat&demo-description=A+full-featured%2C+hackable+Next.js+AI+chatbot+built+by+Vercel+Labs&demo-url=https%3A%2F%2Fchat.vercel.ai%2F&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4aVPvWuTmBvzM5cEdRdqeW%2F4234f9baf160f68ffb385a43c3527645%2FCleanShot_2023-06-16_at_17.09.21.png&project-name=Next.js+Chat&repository-name=nextjs-chat&repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fai-chatbot&from=templates&skippable-integrations=1&env=OPENAI_API_KEY%2CAUTH_SECRET&envDescription=How+to+get+these+env+vars&envLink=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fai-chatbot%2Fblob%2Fmain%2F.env.example&teamCreateStatus=hidden&stores=[{"type":"kv"}])

## Creating a KV Database Instance

Follow the steps outlined in the [quick start guide](https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database) provided by Vercel. This guide will assist you in creating and configuring your KV database instance on Vercel, enabling your application to interact with it.

Remember to update your environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) in the `.env` file with the appropriate credentials provided during the KV database setup.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

## Authors

This library is created by [Vercel](https://vercel.com) and [Next.js](https://nextjs.org) team members, with contributions from:

- Jared Palmer ([@jaredpalmer](https://twitter.com/jaredpalmer)) - [Vercel](https://vercel.com)
- Shu Ding ([@shuding\_](https://twitter.com/shuding_)) - [Vercel](https://vercel.com)
- shadcn ([@shadcn](https://twitter.com/shadcn)) - [Vercel](https://vercel.com)
