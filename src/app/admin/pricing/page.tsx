import { TransactionIcon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function PricingPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        breadcrumbs={[{ label: "Pricing Intelligence" }]}
        showHome={false}
      />
      <ComingSoon title="Pricing Intelligence" icon={TransactionIcon} />
    </div>
  )
}
