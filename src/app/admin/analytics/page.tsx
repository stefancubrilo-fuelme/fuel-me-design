import { ChartUpIcon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        breadcrumbs={[{ label: "Analytics & Reporting" }]}
        showHome={false}
      />
      <ComingSoon title="Analytics & Reporting" icon={ChartUpIcon} />
    </div>
  )
}
