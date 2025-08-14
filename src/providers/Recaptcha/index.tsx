'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { PropsWithChildren } from 'react'

const RecaptchaProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <GoogleReCaptchaProvider
      container={{
        parameters: {
          theme: 'dark',
          badge: 'inline',
        },
      }}
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}

export default RecaptchaProvider
