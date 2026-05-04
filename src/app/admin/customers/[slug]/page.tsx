"use client"

import { createContext, use, useContext, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowUp02Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  ContactBookIcon,
  Copy01Icon,
  Edit02Icon,
  InformationCircleIcon,
  LockIcon,
  ProfileIcon,
  Tick02Icon,
  UserListIcon,
} from "@hugeicons/core-free-icons"

import { TopBar } from "@/components/admin/top-bar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Params = Promise<{ slug: string }>

const customer = {
  slug: "pacific-fleet-services",
  name: "Pacific Fleet Services",
  status: "Active",
  operatingModel: "Marketplace",
  holding: "Pacific Holdings Group",
  sites: 24,
  state: "CA",
  averageMargin: "7.2%",
  appsDelta: "+0.4pp",
  identity: {
    customerId: "CUST-00124",
    companyName: "Pacific Fleet Services",
    legalEntityName: "Pacific Fleet Services LLC",
    dba: "PFS FUEL",
    ein: "12-3456789",
    country: "United States",
    holding: "Pacific Holdings Group",
  },
  address: {
    street: "1200 Harbor Blvd, Suite 300",
    city: "Long Beach",
    state: "CA",
    zip: "90802",
  },
  contact: {
    name: "James Wheeler",
    initials: "JW",
    email: "jwheeler@pacificfleet.com",
  },
  classification: {
    industry: "Transportation & Logistics",
    status: "Active",
    operatingModel: "Marketplace",
    productPlan: "FuelConnect",
    addOns: "FuelRescue",
  },
  ownership: {
    accountManager: "Michael Torres",
    csm: "Sarah Chen",
    salesRep: "David Kim",
  },
  dates: {
    accountCreated: "September 15, 2025",
    firstOrder: "October 15, 2025",
    contactStart: "January 1, 2026",
  },
}

const outlineButtonClass =
  "inline-flex h-7 items-center gap-1.5 rounded-md border border-[var(--color-base-border)] bg-background px-2.5 text-xs font-medium text-foreground shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)] transition-colors hover:border-[color-mix(in_srgb,var(--color-base-border),#000_12%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

const primaryButtonClass =
  "inline-flex h-7 items-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)] transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

function EditButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={outlineButtonClass}>
      <HugeiconsIcon icon={Edit02Icon} size={14} strokeWidth={1.5} />
      Edit
    </button>
  )
}

function SectionEditActions({
  onSave,
  onCancel,
}: {
  onSave: () => void
  onCancel: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={onCancel} className={outlineButtonClass}>
        <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={1.25} />
        Cancel
      </button>
      <button type="button" onClick={onSave} className={primaryButtonClass}>
        <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={1.25} />
        Save
      </button>
    </div>
  )
}

const SectionEditContext = createContext<{
  editingSection: string | null
  setEditingSection: (id: string | null) => void
}>({ editingSection: null, setEditingSection: () => {} })

const FieldEditContext = createContext<{ isEditing: boolean }>({
  isEditing: false,
})

function CopyIconButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <HugeiconsIcon icon={Copy01Icon} size={14} strokeWidth={1.5} />
    </button>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  const { editingSection, setEditingSection } = useContext(SectionEditContext)
  const isEditing = editingSection === id

  return (
    <section className="overflow-hidden rounded-[10px] bg-[var(--color-background-alt)] pt-5 pr-5 pb-5 pl-6">
      <div className="flex items-center justify-between pt-0 pb-1">
        <h2 className="text-[12px] font-medium uppercase leading-[12px] tracking-[1px] text-muted-foreground">
          {title}
        </h2>
        {isEditing ? (
          <SectionEditActions
            onSave={() => setEditingSection(null)}
            onCancel={() => setEditingSection(null)}
          />
        ) : (
          <EditButton onClick={() => setEditingSection(id)} />
        )}
      </div>
      <FieldEditContext.Provider value={{ isEditing }}>
        {children}
      </FieldEditContext.Provider>
    </section>
  )
}

function Field({
  label,
  children,
  trailing,
  inputTrailing,
}: {
  label: string
  children: React.ReactNode
  trailing?: React.ReactNode
  inputTrailing?: React.ReactNode
}) {
  const { isEditing } = useContext(FieldEditContext)
  return (
    <div className="flex items-center pt-2 pb-0">
      <div className="w-[280px] shrink-0 text-sm text-foreground">
        {label}
      </div>
      <div className="flex flex-1 items-center gap-3">
        <div
          className={cn(
            "flex min-h-9 max-w-md flex-1 items-center rounded-md border bg-background py-1 pl-3 text-sm text-foreground transition-colors",
            inputTrailing ? "pr-1" : "pr-3",
            isEditing
              ? "border-[var(--color-base-border)] shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]"
              : "border-transparent"
          )}
        >
          <div className="flex flex-1 items-center gap-2">{children}</div>
          {inputTrailing}
        </div>
        {trailing}
      </div>
    </div>
  )
}

function StatusBadgeDropdown({ status }: { status: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-6 items-center gap-1 rounded-[6px] border border-[var(--color-utility-brand-300)] bg-[var(--color-utility-brand-50)] px-1.5 text-[12px] font-medium leading-4 text-[var(--color-utility-brand-800)]"
    >
      {status}
      <HugeiconsIcon icon={ArrowDown01Icon} size={12} strokeWidth={1.5} />
    </button>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex h-6 items-center rounded-[4px] bg-[var(--color-utility-brand-50)] px-2 text-[12px] font-medium leading-4 text-[var(--color-utility-brand-800)] ring-1 ring-inset ring-[var(--color-utility-brand-300)]">
      {status}
    </span>
  )
}


export default function CustomerDetailsPage({
  params,
}: {
  params: Params
}) {
  const { slug } = use(params)
  void slug

  const [editingSection, setEditingSection] = useState<string | null>(null)

  return (
    <SectionEditContext.Provider value={{ editingSection, setEditingSection }}>
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        breadcrumbs={[
          { label: "Home", href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          { label: customer.name },
        ]}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-[var(--color-base-border)] px-6 py-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-[0.5px] text-foreground">
                {customer.name}
              </h1>
              <StatusBadgeDropdown status={customer.status} />
            </div>
            <p className="text-sm leading-5 tracking-[0.1px] text-muted-foreground">
              {customer.operatingModel} · Holding: {customer.holding} ·{" "}
              {customer.sites} sites · {customer.state}
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-md bg-[var(--background-light-alt)] px-3 py-1.5">
            <div className="flex items-baseline gap-2 text-sm tracking-[0.1px]">
              <span className="text-muted-foreground">Average margin</span>
              <span className="text-[20px] font-semibold leading-[28px] tracking-[0] text-foreground">
                {customer.averageMargin}
              </span>
            </div>
            <span className="inline-flex h-6 items-center gap-1 rounded-[6px] border border-[var(--color-utility-brand-300)] bg-[var(--color-utility-brand-50)] px-1.5 text-[12px] font-medium leading-4 text-[var(--color-utility-brand-800)]">
              <HugeiconsIcon
                icon={ArrowUp02Icon}
                size={12}
                strokeWidth={2}
              />
              {customer.appsDelta}
            </span>
          </div>
        </div>

        {/* Top tabs (line variant) */}
        <Tabs
          variant="line"
          defaultValue="profile"
          className="sticky top-0 z-20 shrink-0 border-b border-[var(--color-base-border)] bg-background px-6"
        >
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sub-tabs (vertical pill nav) + sections layout */}
        <div className="flex items-start gap-16 px-6 pt-4 pb-10">
          <Tabs
            variant="pill"
            defaultValue="details"
            orientation="vertical"
            className="sticky top-[52px] z-10 shrink-0"
          >
            <TabsList className="h-auto w-[200px] flex-col gap-1 bg-[var(--color-background-alt)] p-1">
              <TabsTrigger
                value="details"
                className="h-7 w-full justify-start rounded-sm"
              >
                <HugeiconsIcon
                  icon={ProfileIcon}
                  size={16}
                  strokeWidth={1.5}
                />
                Details
              </TabsTrigger>
              <TabsTrigger
                value="contacts"
                className="h-7 w-full justify-start rounded-sm"
              >
                <HugeiconsIcon
                  icon={ContactBookIcon}
                  size={16}
                  strokeWidth={1.5}
                />
                Contacts
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="h-7 w-full justify-start rounded-sm"
              >
                <HugeiconsIcon
                  icon={UserListIcon}
                  size={16}
                  strokeWidth={1.5}
                />
                Users
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-1 flex-col gap-6">
            <Section id="company-identity" title="Company Identity">
              <Field
                label="Customer ID"
                inputTrailing={<CopyIconButton label="Copy customer ID" />}
              >
                {customer.identity.customerId}
              </Field>
              <Field label="Company name">{customer.identity.companyName}</Field>
              <Field label="Legal entity name">
                {customer.identity.legalEntityName}
              </Field>
              <Field label="DBA">{customer.identity.dba}</Field>
              <Field
                label="EIN / Tax ID"
                inputTrailing={<CopyIconButton label="Copy EIN" />}
              >
                {customer.identity.ein}
              </Field>
              <Field label="Country">{customer.identity.country}</Field>
              <Field label="Holding / Parent company">
                {customer.identity.holding}
              </Field>
            </Section>

            <Section id="address" title="Address">
              <Field label="HQ Street Address">{customer.address.street}</Field>
              <Field label="City">{customer.address.city}</Field>
              <Field label="State">{customer.address.state}</Field>
              <Field label="ZIP Code">{customer.address.zip}</Field>
            </Section>

            <Section id="primary-contact" title="Primary Contact">
              <Field
                label="Details"
                trailing={
                  <button
                    type="button"
                    className={cn(outlineButtonClass, "shrink-0")}
                  >
                    <HugeiconsIcon
                      icon={Copy01Icon}
                      size={14}
                      strokeWidth={1.5}
                    />
                    Copy email
                  </button>
                }
              >
                <Avatar className="size-8">
                  <AvatarFallback className="bg-muted text-[11px] font-medium">
                    {customer.contact.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-foreground">
                    {customer.contact.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {customer.contact.email}
                  </span>
                </div>
              </Field>
              <div className="flex items-center pt-2 pb-0">
                <div className="w-[280px] shrink-0" />
                <div className="flex max-w-md flex-1 items-center justify-between gap-3 rounded-md border border-[var(--color-base-border)] bg-[var(--color-utility-neutral-50)] px-3 py-2">
                  <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      size={14}
                      strokeWidth={1.5}
                    />
                    This contact is managed in Contacts tab.
                  </div>
                  <button
                    type="button"
                    className={cn(outlineButtonClass, "shrink-0")}
                  >
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={14}
                      strokeWidth={1.5}
                    />
                    Manage in Contacts
                  </button>
                </div>
              </div>
            </Section>

            <Section id="classification" title="Classification">
              <Field label="Industry">{customer.classification.industry}</Field>
              <Field label="Status">
                <StatusBadge status={customer.classification.status} />
              </Field>
              <Field
                label="Operating model"
                trailing={
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <HugeiconsIcon
                      icon={LockIcon}
                      size={12}
                      strokeWidth={1.5}
                    />
                    Change requires Super Admin
                  </span>
                }
              >
                {customer.classification.operatingModel}
              </Field>
              <Field label="Product plan">
                {customer.classification.productPlan}
              </Field>
              <Field label="Add-ons">{customer.classification.addOns}</Field>
            </Section>

            <Section id="internal-ownership" title="Internal Ownership">
              <Field label="Account manager">
                {customer.ownership.accountManager}
              </Field>
              <Field label="CSM">{customer.ownership.csm}</Field>
              <Field label="Sales rep">{customer.ownership.salesRep}</Field>
            </Section>

            <Section id="dates" title="Dates">
              <Field label="Account created">
                {customer.dates.accountCreated}
              </Field>
              <Field label="First order">{customer.dates.firstOrder}</Field>
              <Field label="Contact start">{customer.dates.contactStart}</Field>
            </Section>
          </div>
        </div>
      </div>
    </div>
    </SectionEditContext.Provider>
  )
}
