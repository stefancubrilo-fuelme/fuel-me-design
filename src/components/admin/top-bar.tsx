"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Home03Icon,
  ArrowRight01Icon,
  Moon02Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Crumb = {
  label: string
  href?: string
}

function SearchTopbarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M11.3333 11.3333L14 14M12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NotificationsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M14.3327 8.00002C14.3327 11.4978 11.4972 14.3334 7.99935 14.3334C4.50155 14.3334 1.66602 11.4978 1.66602 8.00002C1.66602 4.50222 4.50155 1.66669 7.99935 1.66669M5.33268 8.00002H7.99935M5.33268 10.6667H10.666M14.3327 4.00002C14.3327 5.28868 13.288 6.33335 11.9993 6.33335C10.7107 6.33335 9.66602 5.28868 9.66602 4.00002C9.66602 2.71136 10.7107 1.66669 11.9993 1.66669C13.288 1.66669 14.3327 2.71136 14.3327 4.00002Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const iconButtonClass =
  "inline-flex size-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground transition-colors hover:shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.04)] active:shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={iconButtonClass}
    >
      {mounted ? (
        <HugeiconsIcon
          icon={isDark ? Sun03Icon : Moon02Icon}
          size={16}
          strokeWidth={1.5}
        />
      ) : (
        <span aria-hidden className="size-4" />
      )}
    </button>
  )
}

export function TopBar({
  breadcrumbs,
  showHome = true,
}: {
  breadcrumbs: Crumb[]
  showHome?: boolean
}) {
  const visibleCrumbs = showHome ? breadcrumbs.slice(1) : breadcrumbs
  return (
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-6">
      <nav
        aria-label="breadcrumb"
        className="flex items-center gap-2 text-sm text-foreground"
      >
        {showHome && (
          <Link
            href={breadcrumbs[0]?.href ?? "/admin"}
            aria-label={breadcrumbs[0]?.label ?? "Home"}
          >
            <HugeiconsIcon
              icon={Home03Icon}
              size={16}
              strokeWidth={1.25}
            />
          </Link>
        )}
        {visibleCrumbs.map((crumb, idx) => {
          const isLast = idx === visibleCrumbs.length - 1
          const showSeparator = showHome || idx > 0
          return (
            <span
              key={`${crumb.label}-${idx}`}
              className="flex items-center gap-2"
            >
              {showSeparator && (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={16}
                  strokeWidth={1.25}
                />
              )}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground">
                  {crumb.label}
                </span>
              )}
            </span>
          )
        })}
      </nav>
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Search" className={iconButtonClass}>
          <SearchTopbarIcon />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className={iconButtonClass}
        >
          <NotificationsIcon />
        </button>
        <ThemeToggle />
        <div className="relative ml-1">
          <Avatar className="size-7">
            <AvatarImage src="/avatar-placeholder.png" alt="Account avatar" />
            <AvatarFallback className="bg-muted text-[10px] font-medium">
              SC
            </AvatarFallback>
          </Avatar>
          <span
            aria-label="Online"
            className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-green-500 ring-2 ring-background"
          />
        </div>
      </div>
    </div>
  )
}
