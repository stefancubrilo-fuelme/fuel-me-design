import { Setting07Icon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function SettingsPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar breadcrumbs={[{ label: "Admin" }]} showHome={false} />
      <ComingSoon title="Admin" icon={Setting07Icon} />
    </div>
  )
}
