import { Settings05Icon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function OperationsPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        breadcrumbs={[{ label: "Operations Center" }]}
        showHome={false}
      />
      <ComingSoon title="Operations Center" icon={Settings05Icon} />
    </div>
  )
}
