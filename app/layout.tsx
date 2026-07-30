import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Providers } from './providers'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PuterAuthProvider } from '@/components/PuterAuthProvider'

export const metadata: Metadata = {
  title: 'Open-Agents - Automação com IA',
  description: 'Plataforma de automação com IA - crie fluxos, use skills, acesse navegador',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <Script
          src="https://js.puter.com/v2/"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ErrorBoundary>
          <Providers>
            <PuterAuthProvider>
              {children}
            </PuterAuthProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
