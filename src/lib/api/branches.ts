// Branch API. Two surfaces:
//  - Admin  → /api/v1/admin/branches  (all branches, oversight; create exists but UI hides it)
//  - Partner→ /api/v1/branches         (own alliance only, auto-bound, full CRUD)

import { apiRequest } from "./client";
import type { Paged } from "./admin";

/** Mirrors backend BranchResponse. */
export type Branch = {
  id: number;
  uuid: string;
  allianceCompanyId: number | null;
  allianceCompanyName: string | null;
  name: string;
  code: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  managerId: number | null;
  managerName: string | null;
  commissionRate: number | null;
  isActive: boolean;
  augmontStoreId: number | null;
  augmontStoreUniqueId: string | null;
  syncedToAugmont: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

/** Mirrors backend BranchCreateRequest. allianceCompanyId is required for admin,
 *  ignored/auto-bound for partner. */
export type CreateBranchInput = {
  allianceCompanyId?: number;
  name: string;
  code?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  commissionRate?: number;
};

export type UpdateBranchInput = Partial<CreateBranchInput> & { isActive?: boolean };

type ListParams = { q?: string; active?: boolean; allianceId?: number; page?: number; size?: number };

function qs(params: ListParams) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.active !== undefined) sp.set("active", String(params.active));
  if (params.allianceId !== undefined) sp.set("allianceId", String(params.allianceId));
  sp.set("page", String(params.page ?? 0));
  sp.set("size", String(params.size ?? 50));
  return sp.toString();
}

// ---------- Admin (all branches; no create from UI) ----------
const ADMIN = "/api/v1/admin/branches";

export function adminListBranches(params: ListParams = {}) {
  return apiRequest<Paged<Branch>>(`${ADMIN}?${qs(params)}`);
}
export function adminUpdateBranch(id: number, input: UpdateBranchInput) {
  return apiRequest<Branch>(`${ADMIN}/${id}`, { method: "PUT", body: input });
}
export function adminDeactivateBranch(id: number) {
  return apiRequest<void>(`${ADMIN}/${id}`, { method: "DELETE" });
}
export function adminSyncBranchAugmont(id: number) {
  return apiRequest<Branch>(`${ADMIN}/${id}/sync-augmont`, { method: "POST" });
}

// ---------- Partner (own alliance only; full CRUD) ----------
const PARTNER = "/api/v1/branches";

export function partnerListBranches(params: ListParams = {}) {
  return apiRequest<Paged<Branch>>(`${PARTNER}?${qs(params)}`);
}
export function partnerCreateBranch(input: CreateBranchInput) {
  return apiRequest<Branch>(PARTNER, { method: "POST", body: input });
}
export function partnerUpdateBranch(id: number, input: UpdateBranchInput) {
  return apiRequest<Branch>(`${PARTNER}/${id}`, { method: "PUT", body: input });
}
export function partnerDeactivateBranch(id: number) {
  return apiRequest<void>(`${PARTNER}/${id}`, { method: "DELETE" });
}

/** Partner invites a branch manager (ROLE_BRANCH) for one of their branches.
 *  A set-password link is emailed; no password is sent. */
export type BranchManagerInput = {
  firstName: string;
  lastName?: string;
  email: string;
  mobile: string;
};

export function partnerCreateBranchManager(branchId: number, input: BranchManagerInput) {
  return apiRequest<unknown>(`${PARTNER}/${branchId}/managers`, { method: "POST", body: input });
}
