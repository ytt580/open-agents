import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open-Agents - Dashboard',
  description: 'Painel de automacao com IA',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
