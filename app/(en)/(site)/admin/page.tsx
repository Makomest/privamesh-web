import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import AdminDashboard from '@/components/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return (
    <Container className="py-12">
      <AdminDashboard />
    </Container>
  )
}
