import { DashboardShell } from '@/components/shared/dashboard-shell'
export default function ResidentLayout({ children }: { children: React.ReactNode }) { return <DashboardShell role="RESIDENT" title="Resident workspace">{children}</DashboardShell> }
