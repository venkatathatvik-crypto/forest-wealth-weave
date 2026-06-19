// Public (unauthenticated) API calls.

import { apiRequest } from "./client";

export type PartnerLeadInput = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  gst?: string;
  city?: string;
  state?: string;
};

/** POST /api/v1/partner-leads — submit a public partner onboarding enquiry. */
export function submitPartnerLead(input: PartnerLeadInput) {
  return apiRequest<void>("/api/v1/partner-leads", {
    method: "POST",
    body: input,
    auth: false,
  });
}

/** GET /api/v1/auth/set-password/validate — check a set-password link token; returns the account email. */
export function validateSetPasswordToken(token: string) {
  return apiRequest<{ email: string }>(
    `/api/v1/auth/set-password/validate?token=${encodeURIComponent(token)}`,
    { auth: false },
  );
}

/** POST /api/v1/auth/set-password — set a password using a one-time link token. */
export function setPassword(token: string, password: string) {
  return apiRequest<void>("/api/v1/auth/set-password", {
    method: "POST",
    body: { token, password },
    auth: false,
  });
}
