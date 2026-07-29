import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/AuthProvider'
import { AuthWrapper } from '@/components/AuthWrapper'

export const metadata: Metadata = {
  title: 'Open-Agents - Automação com IA',
  description: 'Plataforma de automação com IA - crie fluxos, use skills, acesse navegador',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}