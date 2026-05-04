import { Chat01Icon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function CommunicationsPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        breadcrumbs={[{ label: "Communications" }]}
        showHome={false}
      />
      <ComingSoon title="Communications" icon={Chat01Icon} />
    </div>
  )
}
