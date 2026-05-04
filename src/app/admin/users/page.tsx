import { UserMultipleIcon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function UsersPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        breadcrumbs={[{ label: "Users & Roles" }]}
        showHome={false}
      />
      <ComingSoon title="Users & Roles" icon={UserMultipleIcon} />
    </div>
  )
}
