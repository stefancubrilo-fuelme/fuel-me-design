"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  FilterHorizontalIcon,
  Add01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { TopBar } from "@/components/admin/top-bar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Compliance = "compliant" | "review" | "non-compliant"

type Status = "active" | "onboarding" | "inactive"

type Customer = {
  id: string
  company: string
  model: string
  sites: number
  csm: string
  industry: string
  country: string
  flag: string
  state: string
  compliance: Compliance
  created: string
  status: Status
}

const customers: Customer[] = [
  {
    id: "1",
    company: "Pacific Fleet Services",
    model: "Wholesale",
    sites: 12,
    csm: "Avery Chen",
    industry: "Logistics",
    country: "United States",
    flag: "🇺🇸",
    state: "California",
    compliance: "compliant",
    created: "Jan 15, 2026",
    status: "active",
  },
  {
    id: "2",
    company: "Greenfield Construction",
    model: "Direct",
    sites: 4,
    csm: "Marcus Holt",
    industry: "Construction",
    country: "United States",
    flag: "🇺🇸",
    state: "Texas",
    compliance: "review",
    created: "Feb 11, 2026",
    status: "onboarding",
  },
  {
    id: "3",
    company: "Heartland Farming Co-Op",
    model: "Co-op",
    sites: 23,
    csm: "Priya Shah",
    industry: "Agriculture",
    country: "United States",
    flag: "🇺🇸",
    state: "Iowa",
    compliance: "compliant",
    created: "Feb 7, 2026",
    status: "inactive",
  },
  {
    id: "4",
    company: "Maple Ridge Transport",
    model: "Wholesale",
    sites: 7,
    csm: "Jordan Bell",
    industry: "Logistics",
    country: "Canada",
    flag: "🇨🇦",
    state: "British Columbia",
    compliance: "compliant",
    created: "Feb 1, 2026",
    status: "active",
  },
  {
    id: "5",
    company: "Prairie Wind Logistics",
    model: "Direct",
    sites: 9,
    csm: "Sam Rivera",
    industry: "Logistics",
    country: "Canada",
    flag: "🇨🇦",
    state: "Manitoba",
    compliance: "non-compliant",
    created: "Jan 11, 2026",
    status: "onboarding",
  },
  {
    id: "6",
    company: "Vancouver Harbor Fuel",
    model: "Marine",
    sites: 3,
    csm: "Lena Park",
    industry: "Marine",
    country: "Canada",
    flag: "🇨🇦",
    state: "British Columbia",
    compliance: "review",
    created: "Mar 19, 2026",
    status: "inactive",
  },
  {
    id: "7",
    company: "Sunbelt Aviation Group",
    model: "Aviation",
    sites: 5,
    csm: "Avery Chen",
    industry: "Aviation",
    country: "United States",
    flag: "🇺🇸",
    state: "Florida",
    compliance: "compliant",
    created: "Mar 15, 2026",
    status: "active",
  },
  {
    id: "8",
    company: "Northern Lights Mining",
    model: "Direct",
    sites: 11,
    csm: "Marcus Holt",
    industry: "Mining",
    country: "Canada",
    flag: "🇨🇦",
    state: "Yukon",
    compliance: "compliant",
    created: "Mar 25, 2026",
    status: "onboarding",
  },
  {
    id: "9",
    company: "Cascade Refining Partners",
    model: "Wholesale",
    sites: 18,
    csm: "Hannah Brooks",
    industry: "Refining",
    country: "United States",
    flag: "🇺🇸",
    state: "Washington",
    compliance: "compliant",
    created: "Apr 3, 2026",
    status: "active",
  },
  {
    id: "10",
    company: "Atlantic Marine Bunker",
    model: "Marine",
    sites: 6,
    csm: "Diego Alvarez",
    industry: "Marine",
    country: "Canada",
    flag: "🇨🇦",
    state: "Nova Scotia",
    compliance: "review",
    created: "Apr 18, 2026",
    status: "onboarding",
  },
]

const statusLabel: Record<Status, string> = {
  active: "Active",
  onboarding: "Onboarding",
  inactive: "Inactive",
}

const statusBadgeClass: Record<Status, string> = {
  active:
    "bg-[var(--color-utility-brand-50)] text-[var(--color-utility-brand-800)] ring-1 ring-inset ring-[var(--color-utility-brand-300)]",
  onboarding:
    "bg-[var(--color-utility-amber-50)] text-[var(--color-utility-amber-700)] ring-1 ring-inset ring-[var(--color-utility-amber-200)]",
  inactive:
    "bg-[var(--color-utility-red-50)] text-[var(--color-utility-red-700)] ring-1 ring-inset ring-[var(--color-utility-red-200)]",
}

const complianceLabel: Record<Compliance, string> = {
  compliant: "Compliant",
  review: "Pending",
  "non-compliant": "Non-Compliant",
}

const flagSrc: Record<string, string> = {
  "🇺🇸": "/flag-us.svg",
  "🇨🇦": "/flag-canada.svg",
}

const complianceDot: Record<Compliance, string> = {
  compliant: "bg-green-500",
  review: "bg-amber-400",
  "non-compliant": "bg-red-500",
}

function StatusChip({
  label,
  count,
  dotClass,
}: {
  label: string
  count: number
  dotClass?: string
}) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-[4px] border border-[var(--color-utility-neutral-100)] bg-[var(--color-utility-neutral-50)] px-2.5 text-[13px] font-normal leading-4 tracking-[0.1px] text-foreground">
      {dotClass && (
        <span
          className={cn("size-2 rounded-full", dotClass)}
          aria-hidden
        />
      )}
      <span>
        {label} <span className="text-muted-foreground">({count})</span>
      </span>
    </span>
  )
}

export default function CustomersPage() {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const allChecked =
    selectedIds.size === customers.length && customers.length > 0
  const someChecked = selectedIds.size > 0 && !allChecked
  const headerCheckedState: boolean | "indeterminate" = allChecked
    ? true
    : someChecked
      ? "indeterminate"
      : false

  const toggleAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedIds(new Set(customers.map((c) => c.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const toggleOne =
    (id: string) => (checked: boolean | "indeterminate") => {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        if (checked === true) next.add(id)
        else next.delete(id)
        return next
      })
    }

  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Customers" },
        ]}
      />

      <div className="flex min-h-0 flex-1 flex-col">
          {/* Page header */}
          <div className="flex shrink-0 flex-wrap items-start justify-between gap-4 border-b border-[var(--color-base-border)] px-6 py-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Customers
              </h1>
              <p className="text-sm leading-5 text-muted-foreground">
                Manage your customer portfolio.
              </p>
            </div>

            <div className="flex flex-wrap items-center">
              <div className="flex items-center gap-1.5">
                <StatusChip label="Total" count={8} />
                <StatusChip
                  label="Active"
                  count={3}
                  dotClass="bg-[var(--color-utility-brand-500)]"
                />
                <StatusChip
                  label="Onboarding"
                  count={3}
                  dotClass="bg-amber-400"
                />
                <StatusChip label="Inactive" count={2} dotClass="bg-red-500" />
              </div>
              <Button
                size="sm"
                className="ml-6 h-8 gap-1 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                <HugeiconsIcon
                  icon={Add01Icon}
                  className="size-3.5"
                  strokeWidth={2.5}
                />
                New
              </Button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-[var(--color-base-border)] px-6 py-3">
            <div className="relative w-full max-w-md">
              <HugeiconsIcon
                icon={Search01Icon}
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                placeholder="Search customers..."
                className="h-9 w-full rounded-md border border-[var(--color-base-border)] bg-background pl-9 pr-3 text-sm text-foreground shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)] transition-colors placeholder:text-muted-foreground hover:border-[color-mix(in_srgb,var(--color-base-border),#000_12%)] focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <Button variant="outline" size="sm">
              <HugeiconsIcon
                icon={FilterHorizontalIcon}
                size={16}
                strokeWidth={1.25}
              />
              Filters
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={14}
                strokeWidth={1.25}
              />
            </Button>
          </div>

          {/* Table */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-b border-[var(--color-base-border)] bg-card">
            <div className="min-h-0 w-full flex-1 overflow-auto">
              <Table className="[&_tr]:h-10 [&_th]:h-10 [&_th]:py-0 [&_td]:py-0 [&_th]:px-2 [&_td]:px-2 [&_th:first-child]:pl-6 [&_td:first-child]:pl-6 [&_th:last-child]:pr-6 [&_td:last-child]:pr-6">
                <TableHeader className="bg-[var(--background-light-alt)]">
                  <TableRow className="border-[var(--color-base-border)] hover:bg-transparent">
                    <TableHead className="w-[44px]">
                      <Checkbox
                        aria-label="Select all"
                        checked={headerCheckedState}
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead>Company name</TableHead>
                    <TableHead>Operating model</TableHead>
                    <TableHead>Sites</TableHead>
                    <TableHead>CSM</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&>tr:last-child]:!border-b">
                  {customers.map((customer) => {
                    const isLinked = customer.id === "1"
                    const customerHref = "/admin/customers/pacific-fleet-services"
                    return (
                    <TableRow
                      key={customer.id}
                      className={cn(
                        "border-[var(--color-base-border)]",
                        isLinked &&
                          "cursor-pointer hover:bg-[var(--color-utility-neutral-50)]"
                      )}
                      onClick={
                        isLinked
                          ? () => router.push(customerHref)
                          : undefined
                      }
                    >
                      <TableCell
                        onClick={
                          isLinked ? (e) => e.stopPropagation() : undefined
                        }
                      >
                        <Checkbox
                          aria-label={`Select ${customer.company}`}
                          checked={selectedIds.has(customer.id)}
                          onCheckedChange={toggleOne(customer.id)}
                        />
                      </TableCell>
                      <TableCell className="font-normal">
                        {customer.id === "1" ? (
                          <Link
                            href="/admin/customers/pacific-fleet-services"
                            className="hover:text-foreground"
                          >
                            {customer.company}
                          </Link>
                        ) : (
                          customer.company
                        )}
                      </TableCell>
                      <TableCell>{customer.model}</TableCell>
                      <TableCell>
                        <a
                          href="#"
                          className="underline underline-offset-[3px] decoration-foreground/40 hover:decoration-foreground"
                        >
                          {customer.sites}
                        </a>
                      </TableCell>
                      <TableCell>{customer.csm}</TableCell>
                      <TableCell>{customer.industry}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          <Image
                            src={flagSrc[customer.flag]}
                            alt=""
                            width={14}
                            height={14}
                            className="block shrink-0 rounded-[1px] object-contain align-middle"
                          />
                          <span>{customer.country}</span>
                        </span>
                      </TableCell>
                      <TableCell>{customer.state}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2">
                          <span
                            className={cn(
                              "size-1.5 shrink-0 rounded-full",
                              complianceDot[customer.compliance]
                            )}
                            aria-hidden
                          />
                          {complianceLabel[customer.compliance]}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {customer.created}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex h-6 items-center rounded-[4px] px-2 text-[12px] font-medium leading-4",
                            statusBadgeClass[customer.status]
                          )}
                        >
                          {statusLabel[customer.status]}
                        </span>
                      </TableCell>
                      <TableCell
                        className="text-right"
                        onClick={
                          isLinked ? (e) => e.stopPropagation() : undefined
                        }
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label={`Actions for ${customer.company}`}
                              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                              <HugeiconsIcon
                                icon={MoreHorizontalIcon}
                                size={16}
                                strokeWidth={1.5}
                              />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>Edit details</DropdownMenuItem>
                            <DropdownMenuItem>Manage sites</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-[var(--color-utility-red-700)] focus:text-[var(--color-utility-red-700)]">
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-6 py-3 text-xs text-muted-foreground">
            <div>Showing 1–10 of 72 results</div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <button
                  type="button"
                  className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-background px-2 text-xs text-foreground shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]"
                >
                  10
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className="size-3 text-muted-foreground"
                  />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span>Page 1 of 1</span>
                <div className="flex items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 rounded-md"
                    disabled
                  >
                    <HugeiconsIcon
                      icon={ArrowLeftDoubleIcon}
                      className="size-3.5"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 rounded-md"
                    disabled
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      className="size-3.5"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 rounded-md"
                    disabled
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-3.5"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 rounded-md"
                    disabled
                  >
                    <HugeiconsIcon
                      icon={ArrowRightDoubleIcon}
                      className="size-3.5"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
