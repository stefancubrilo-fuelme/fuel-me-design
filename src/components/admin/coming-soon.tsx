import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { CircleArrowLeft02Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"

export function ComingSoon({
  title,
  icon,
}: {
  title: string
  icon: IconSvgElement
}) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-6 overflow-hidden bg-background px-6 pb-[120px]">
      <Image
        src="/pattern.svg"
        alt=""
        aria-hidden
        fill
        priority
        className="pointer-events-none select-none object-cover"
      />
      <div className="relative z-10 flex flex-col items-center gap-6">
      <div className="flex items-center justify-center rounded-[10px] bg-[var(--color-utility-neutral-100)] p-4">
        <HugeiconsIcon
          icon={icon}
          size={32}
          strokeWidth={1.5}
          className="text-[var(--color-utility-neutral-600)]"
        />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-semibold tracking-[-0.5px] text-foreground">
          {title}
        </h1>
        <p className="max-w-md text-base font-normal tracking-[0.1px] text-muted-foreground">
          This page is in progress and will be available soon.
        </p>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="mt-4 text-base leading-6 tracking-[0.1px]"
        asChild
      >
        <Link href="/admin/customers">
          <HugeiconsIcon
            icon={CircleArrowLeft02Icon}
            strokeWidth={1.5}
            className="!size-5"
          />
          Back to Customers
        </Link>
      </Button>
      </div>
    </div>
  )
}
