import AdminDashboard from '@/components/admin/AdminDashboard'

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <AdminDashboard />
    </div>
  )
}
