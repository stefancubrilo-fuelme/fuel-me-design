import { ClipboardIcon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function OrdersPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar breadcrumbs={[{ label: "Orders" }]} showHome={false} />
      <ComingSoon title="Orders" icon={ClipboardIcon} />
    </div>
  )
}
