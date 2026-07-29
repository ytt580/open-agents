'use client'

import { AuthProvider } from '@/lib/AuthProvider'
import { AuthWrapper } from '@/components/AuthWrapper'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </AuthProvider>
  )
}