// Admin API calls (partners, ...) against the Spring Boot backend.
// All require an admin (ROLE_ADMIN) access token, attached automatically by the client.

import { apiRequest } from "./client";

export type PartnerType = "NBFC" | "MFI" | "COOPERATIVE" | "BROKER" | "CORPORATE" | "OTHER";

/** Mirrors backend PartnerResponse. */
export type Partner = {
  id: number;
  uuid: string;
  name: string;
  registrationNumber: string | null;
  type: PartnerType | string;
  contactEmail: string | null;
  contactPhone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  commissionRate: number | null;
  isActive: boolean;
  onboardedById: number | null;
  branchCount: number;
  createdAt: string | null;
  updatedAt: string | null;
};

/** Mirrors backend PartnerCreateRequest (company + login user). */
export type CreatePartnerInput = {
  name: string;
  registrationNumber?: string;
  type: PartnerType;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  commissionRate?: number;
  contactPersonName: string;
  loginEmail: string;
  loginMobile: string;
};

/** Mirrors backend PagedResponse<T>. */
export type Paged<T> = {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  last: boolean;
};

const BASE = "/api/v1/admin/partners";

export function listPartners(params: { q?: string; active?: boolean; page?: number; size?: number } = {}) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.active !== undefined) sp.set("active", String(params.active));
  sp.set("page", String(params.page ?? 0));
  sp.set("size", String(params.size ?? 20));
  return apiRequest<Paged<Partner>>(`${BASE}?${sp.toString()}`);
}

export function createPartner(input: CreatePartnerInput) {
  return apiRequest<Partner>(BASE, { method: "POST", body: input });
}

export function deactivatePartner(id: number) {
  return apiRequest<void>(`${BASE}/${id}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------
// Partner leads (onboarding enquiries)
// ---------------------------------------------------------------------

export type LeadStatus = "NEW" | "CONTACTED" | "CONVERTED" | "REJECTED";

/** Mirrors backend PartnerLeadResponse. */
export type PartnerLead = {
  id: number;
  uuid: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  gst: string | null;
  city: string | null;
  state: string | null;
  status: LeadStatus;
  notes: string | null;
  convertedPartnerId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
};

const LEADS_BASE = "/api/v1/admin/partner-leads";

export function listLeads(params: { q?: string; status?: LeadStatus; page?: number; size?: number } = {}) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.status) sp.set("status", params.status);
  sp.set("page", String(params.page ?? 0));
  sp.set("size", String(params.size ?? 50));
  return apiRequest<Paged<PartnerLead>>(`${LEADS_BASE}?${sp.toString()}`);
}

export function getNewLeadCount() {
  return apiRequest<{ count: number }>(`${LEADS_BASE}/new-count`);
}

export function updateLeadStatus(id: number, status: LeadStatus, notes?: string) {
  return apiRequest<PartnerLead>(`${LEADS_BASE}/${id}/status`, {
    method: "PATCH",
    body: { status, notes },
  });
}

// ---------------------------------------------------------------------
// Admin dashboard overview
// ---------------------------------------------------------------------

/** Mirrors backend AdminDashboardResponse. */
export type AdminDashboard = {
  totalAlliances: number;
  activeAlliances: number;
  totalBranches: number;
  activeBranches: number;
  usersByRole: Record<string, number>;
  augmontEnabled: boolean;
  augmont: Record<string, unknown> | null;
};

export function getAdminDashboard() {
  return apiRequest<AdminDashboard>("/api/v1/admin/dashboard");
}
