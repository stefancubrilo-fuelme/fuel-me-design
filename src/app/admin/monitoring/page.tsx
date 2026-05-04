import { DashboardSpeed01Icon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function MonitoringPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar breadcrumbs={[{ label: "Monitoring" }]} showHome={false} />
      <ComingSoon title="Monitoring" icon={DashboardSpeed01Icon} />
    </div>
  )
}
