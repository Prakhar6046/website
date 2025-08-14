import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Poppins } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './css/globals.scss'
import 'src/styles/swiper.css'
import { getServerSideURL } from '@/utilities/getURL'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PixelTrackerWrapper from '@/components/PixelTrackerWrapper'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, poppins.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <Script
          src={'https://www.googletagmanager.com/gtag/js?id=G-SXYYZDSPB2'}
          strategy="afterInteractive"
        />
        <Script id={'google-analytics'} strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SXYYZDSPB2');
          `}
        </Script>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '24276569022005203');
fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=24276569022005203&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body>
        <PixelTrackerWrapper />
        <SpeedInsights />
        <Providers>
          <div className={'relative flex h-full min-h-dvh w-full flex-col overflow-hidden'}>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="68811f9f81758b424c3c070f"
        ></Script>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  keywords: [
    'Prefab Homes',
    'Modular Homes',
    'Sustainable Living',
    'Kelowna',
    'Canada',
    'BC',
    'British Columbia',
  ],
  creator: 'Cookie Digital',
  publisher: 'Cookie Digital',
  applicationName: 'NordHouse',
  authors: [
    {
      name: 'Cookie Digital',
      url: 'https://cookiedigital.ca',
    },
  ],
  category: 'construction',
  twitter: {
    card: 'summary_large_image',
    creator: '@cookiedigital',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101108',
}
