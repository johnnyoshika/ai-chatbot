import { signIn } from '@/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const body = Object.fromEntries(formData.entries())

  const { message, hash, redirect } = body as {
    message: string
    hash: string
    redirect: string
  }

  try {
    await signIn('credentials', {
      message: decodeURIComponent(message),
      hash: decodeURIComponent(hash),
      redirect: false // Prevent redirect, as that only works when called from client
    })

    const baseUrl = new URL(request.url).origin

    // Use 303 redirect instead of NextAuth's default 307.
    // 307 maintains the original HTTP method (POST), which can cause issues with cookie transmission.
    // 303 forces a GET request on redirect, ensuring any set cookies are properly sent in the subsequent request.
    return NextResponse.redirect(new URL(redirect, baseUrl).toString(), 303)
  } catch (error) {
    return NextResponse.redirect(`${process.env.STUDENT_APP_URL}`, 303)
  }
}
