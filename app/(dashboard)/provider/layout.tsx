import { DashboardShell } from '@/components/shared/dashboard-shell'
export default function ProviderLayout({ children }: { children: React.ReactNode }) { return <DashboardShell role="PROVIDER" title="Provider workspace">{children}</DashboardShell> }
