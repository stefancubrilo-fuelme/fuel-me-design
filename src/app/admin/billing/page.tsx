import { CreditCardIcon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function BillingPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar breadcrumbs={[{ label: "Billing" }]} showHome={false} />
      <ComingSoon title="Billing" icon={CreditCardIcon} />
    </div>
  )
}
