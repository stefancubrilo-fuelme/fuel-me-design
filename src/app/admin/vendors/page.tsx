import { Store02Icon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function VendorsPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar breadcrumbs={[{ label: "Vendors" }]} showHome={false} />
      <ComingSoon title="Vendors" icon={Store02Icon} />
    </div>
  )
}
