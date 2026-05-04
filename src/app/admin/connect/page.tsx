import { Share07Icon } from "@hugeicons/core-free-icons"

import { ComingSoon } from "@/components/admin/coming-soon"
import { TopBar } from "@/components/admin/top-bar"

export default function ConnectPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar breadcrumbs={[{ label: "Connect" }]} showHome={false} />
      <ComingSoon title="Connect" icon={Share07Icon} />
    </div>
  )
}
