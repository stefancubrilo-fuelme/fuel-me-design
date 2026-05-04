"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  Home03Icon,
  ClipboardIcon,
  Settings05Icon,
  UserCircle02Icon,
  Store02Icon,
  Share07Icon,
  TransactionIcon,
  CreditCardIcon,
  DashboardSpeed01Icon,
  ChartUpIcon,
  Chat01Icon,
  UserMultipleIcon,
  Setting07Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  icon: IconSvgElement
}

type NavSection = {
  label: string
  items: NavItem[]
}

const sections: NavSection[] = [
  {
    label: "Core Operations",
    items: [
      { label: "Dashboard", href: "/admin", icon: Home03Icon },
      { label: "Orders", href: "/admin/orders", icon: ClipboardIcon },
      {
        label: "Operations Center",
        href: "/admin/operations",
        icon: Settings05Icon,
      },
    ],
  },
  {
    label: "Relationships",
    items: [
      { label: "Customers", href: "/admin/customers", icon: UserCircle02Icon },
      { label: "Vendors", href: "/admin/vendors", icon: Store02Icon },
      { label: "Connect", href: "/admin/connect", icon: Share07Icon },
    ],
  },
  {
    label: "Financial",
    items: [
      {
        label: "Pricing Intelligence",
        href: "/admin/pricing",
        icon: TransactionIcon,
      },
      { label: "Billing", href: "/admin/billing", icon: CreditCardIcon },
    ],
  },
  {
    label: "Intelligence",
    items: [
      {
        label: "Monitoring",
        href: "/admin/monitoring",
        icon: DashboardSpeed01Icon,
      },
      {
        label: "Analytics & Reporting",
        href: "/admin/analytics",
        icon: ChartUpIcon,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Communications",
        href: "/admin/communications",
        icon: Chat01Icon,
      },
      {
        label: "Users & Roles",
        href: "/admin/users",
        icon: UserMultipleIcon,
      },
      { label: "Admin", href: "/admin/settings", icon: Setting07Icon },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="relative flex h-screen w-[280px] shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
        <Image
          src="/logo.svg"
          alt="Fuel.me"
          width={32}
          height={32}
          priority
          className="size-8"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-sidebar-foreground">
            Fuel.me
          </span>
          <span className="text-[12px] font-normal leading-[12px] tracking-[0.1px] text-sidebar-foreground-muted">
            Optional
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="group/search px-3 pb-3">
        <div className="relative flex h-8 items-center rounded-sm border border-[var(--color-base-border)] bg-background px-2.5 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)] transition-colors hover:border-[color-mix(in_srgb,var(--color-base-border),#000_12%)] focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/40">
          <HugeiconsIcon
            icon={Search01Icon}
            size={16}
            strokeWidth={1.5}
            className="shrink-0 text-sidebar-foreground-muted"
          />
          <input
            type="search"
            placeholder="Search"
            className="ml-2 h-full flex-1 bg-transparent pr-28 text-[13px] font-normal leading-4 tracking-[0.1px] text-sidebar-foreground placeholder:text-sidebar-foreground-muted focus:outline-none"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-1.5 top-1/2 flex -translate-y-1/2 select-none items-center gap-1 text-[11px] text-muted-foreground"
          >
            <kbd className="rounded-sm bg-muted px-1.5 py-0.5 font-sans font-normal">
              ⌘
            </kbd>
            <span className="text-muted-foreground/70">/</span>
            <kbd className="rounded-sm bg-muted px-1.5 py-0.5 font-sans font-normal">
              Ctrl
            </kbd>
            <span className="text-muted-foreground/70">+</span>
            <kbd className="rounded-sm bg-muted px-1.5 py-0.5 font-sans font-normal">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {sections.map((section) => (
          <div key={section.label} className="mb-3 first:mt-1">
            <div className="px-3 pt-3 pb-1.5 text-[11px] font-medium uppercase leading-[11px] tracking-[1px] text-sidebar-foreground-muted/80">
              {section.label}
            </div>
            <ul className="flex flex-col gap-px">
              {section.items.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-sm px-3 py-1.5 text-sm text-sidebar-foreground transition-colors",
                        active
                          ? "bg-background font-medium shadow-sm"
                          : "hover:shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.04)]"
                      )}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="absolute -left-3 top-1 bottom-1 w-[3px] rounded-r-full"
                          style={{ backgroundColor: "var(--brand-500)" }}
                        />
                      )}
                      <HugeiconsIcon
                        icon={item.icon}
                        size={18}
                        strokeWidth={1.5}
                        className={cn(
                          "shrink-0",
                          active
                            ? "text-sidebar-foreground"
                            : "text-sidebar-foreground-muted group-hover:text-sidebar-foreground"
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
