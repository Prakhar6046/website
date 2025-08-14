import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  const postData = await request.json()

  const { gRecaptchaToken } = postData

  let res

  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`

  try {
    res = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const data = res?.data

    if (data && data?.success && data?.score > 0.5) {
      return NextResponse.json({
        success: true,
        score: res.data.score,
      })
    } else {
      return NextResponse.json({
        success: false,
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
    })
  }
}
