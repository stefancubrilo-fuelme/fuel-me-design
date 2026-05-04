import { Home03Icon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar breadcrumbs={[{ label: "Dashboard" }]} showHome={false} />
      <ComingSoon title="Dashboard" icon={Home03Icon} />
    </div>
  )
}
