import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import RecaptchaProvider from '@/providers/Recaptcha'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <RecaptchaProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </RecaptchaProvider>
    </ThemeProvider>
  )
}
