export const goldRateINR = 7284; // per gram 24K

export type Partner = {
  id: string; name: string; region: string; branches: number;
  customers: number; gmv: number; status: "Active" | "Onboarding" | "Paused";
  contact: string; joined: string;
};

export const partners: Partner[] = [
  { id: "P-1042", name: "Meridian Capital Partners", region: "West", branches: 142, customers: 18420, gmv: 184.2, status: "Active", contact: "ravi@meridian.in", joined: "2023-04-12" },
  { id: "P-1043", name: "Saraswati Distributors", region: "North", branches: 98, customers: 12110, gmv: 121.8, status: "Active", contact: "ops@saraswati.in", joined: "2023-08-02" },
  { id: "P-1044", name: "Coromandel Financial Network", region: "South", branches: 211, customers: 26544, gmv: 264.9, status: "Active", contact: "team@coromandel.in", joined: "2022-11-19" },
  { id: "P-1045", name: "Vindhya Bharat Alliance", region: "Central", branches: 64, customers: 8210, gmv: 71.4, status: "Onboarding", contact: "hello@vindhya.in", joined: "2025-02-21" },
  { id: "P-1046", name: "Northeast Gold Channel", region: "North-East", branches: 41, customers: 5104, gmv: 48.2, status: "Active", contact: "ne@goldchannel.in", joined: "2024-06-08" },
  { id: "P-1047", name: "Konkan Retail Trust", region: "West", branches: 27, customers: 3201, gmv: 22.9, status: "Paused", contact: "info@konkan.in", joined: "2024-01-30" },
];

export type Branch = {
  id: string; name: string; partner: string; city: string; state: string;
  manager: string; orders: number; status: "Live" | "Setup" | "Paused";
};

export const branches: Branch[] = [
  { id: "B-50211", name: "Andheri East Hub", partner: "Meridian Capital Partners", city: "Mumbai", state: "Maharashtra", manager: "Anika Shah", orders: 1284, status: "Live" },
  { id: "B-50212", name: "Indiranagar Centre", partner: "Coromandel Financial Network", city: "Bengaluru", state: "Karnataka", manager: "Karthik Iyer", orders: 1842, status: "Live" },
  { id: "B-50213", name: "Sector 18 Outlet", partner: "Saraswati Distributors", city: "Noida", state: "Uttar Pradesh", manager: "Priya Sinha", orders: 962, status: "Live" },
  { id: "B-50214", name: "Banjara Hills Desk", partner: "Coromandel Financial Network", city: "Hyderabad", state: "Telangana", manager: "Rahul Reddy", orders: 1102, status: "Live" },
  { id: "B-50215", name: "Salt Lake Sector V", partner: "Saraswati Distributors", city: "Kolkata", state: "West Bengal", manager: "Anjali Bose", orders: 644, status: "Setup" },
  { id: "B-50216", name: "Koregaon Park Branch", partner: "Meridian Capital Partners", city: "Pune", state: "Maharashtra", manager: "Devansh Patil", orders: 731, status: "Live" },
  { id: "B-50217", name: "MG Road Counter", partner: "Konkan Retail Trust", city: "Panaji", state: "Goa", manager: "Sneha D'Souza", orders: 211, status: "Paused" },
];

export type Customer = {
  id: string; name: string; phone: string; city: string; kyc: "Verified" | "Pending" | "Rejected";
  branch: string; gold: number; joined: string;
};

export const customers: Customer[] = [
  { id: "C-90211", name: "Aarav Mehta", phone: "+91 98201 12345", city: "Mumbai", kyc: "Verified", branch: "B-50211", gold: 42.5, joined: "2025-09-12" },
  { id: "C-90212", name: "Ishita Reddy", phone: "+91 99002 38491", city: "Hyderabad", kyc: "Verified", branch: "B-50214", gold: 18.2, joined: "2025-10-04" },
  { id: "C-90213", name: "Rohan Kapoor", phone: "+91 98112 55821", city: "Noida", kyc: "Pending", branch: "B-50213", gold: 8.0, joined: "2026-02-19" },
  { id: "C-90214", name: "Meera Iyer", phone: "+91 99845 11020", city: "Bengaluru", kyc: "Verified", branch: "B-50212", gold: 64.8, joined: "2024-12-01" },
  { id: "C-90215", name: "Arjun Bose", phone: "+91 98300 71204", city: "Kolkata", kyc: "Rejected", branch: "B-50215", gold: 0, joined: "2026-04-11" },
  { id: "C-90216", name: "Sanya Patil", phone: "+91 90282 41112", city: "Pune", kyc: "Verified", branch: "B-50216", gold: 22.1, joined: "2026-01-23" },
  { id: "C-90217", name: "Dev Kulkarni", phone: "+91 98221 99041", city: "Panaji", kyc: "Verified", branch: "B-50217", gold: 12.5, joined: "2025-07-15" },
  { id: "C-90218", name: "Kavya Nair", phone: "+91 96770 88321", city: "Kochi", kyc: "Pending", branch: "B-50212", gold: 3.4, joined: "2026-05-30" },
];

export type GoldProduct = {
  id: string; name: string; weight: number; purity: "24K" | "22K"; type: "Coin" | "Bar" | "Jewellery";
  premium: number; stock: number;
};

export const goldProducts: GoldProduct[] = [
  { id: "G-1G24", name: "Sovereign 1g Coin", weight: 1, purity: "24K", type: "Coin", premium: 4.2, stock: 412 },
  { id: "G-5G24", name: "Heritage 5g Coin", weight: 5, purity: "24K", type: "Coin", premium: 3.8, stock: 188 },
  { id: "G-10G24", name: "Imperial 10g Bar", weight: 10, purity: "24K", type: "Bar", premium: 3.1, stock: 96 },
  { id: "G-50G24", name: "Vault 50g Bar", weight: 50, purity: "24K", type: "Bar", premium: 2.4, stock: 38 },
  { id: "G-100G24", name: "Reserve 100g Bar", weight: 100, purity: "24K", type: "Bar", premium: 2.0, stock: 12 },
  { id: "G-8G22", name: "Lakshmi 8g Coin", weight: 8, purity: "22K", type: "Coin", premium: 5.0, stock: 142 },
];

export type Order = {
  id: string; customer: string; branch: string; product: string;
  qty: number; weight: number; amount: number;
  status: "Placed" | "Processing" | "Dispatched" | "Delivered" | "Cancelled";
  date: string;
};

export const orders: Order[] = [
  { id: "ORD-220114", customer: "Aarav Mehta", branch: "Andheri East Hub", product: "Heritage 5g Coin", qty: 2, weight: 10, amount: 75620, status: "Delivered", date: "2026-06-08" },
  { id: "ORD-220115", customer: "Ishita Reddy", branch: "Banjara Hills Desk", product: "Imperial 10g Bar", qty: 1, weight: 10, amount: 75021, status: "Dispatched", date: "2026-06-09" },
  { id: "ORD-220116", customer: "Rohan Kapoor", branch: "Sector 18 Outlet", product: "Sovereign 1g Coin", qty: 8, weight: 8, amount: 60824, status: "Processing", date: "2026-06-10" },
  { id: "ORD-220117", customer: "Meera Iyer", branch: "Indiranagar Centre", product: "Vault 50g Bar", qty: 1, weight: 50, amount: 372948, status: "Placed", date: "2026-06-11" },
  { id: "ORD-220118", customer: "Sanya Patil", branch: "Koregaon Park Branch", product: "Lakshmi 8g Coin", qty: 1, weight: 8, amount: 61234, status: "Delivered", date: "2026-06-07" },
  { id: "ORD-220119", customer: "Dev Kulkarni", branch: "MG Road Counter", product: "Heritage 5g Coin", qty: 1, weight: 5, amount: 37810, status: "Cancelled", date: "2026-06-04" },
  { id: "ORD-220120", customer: "Arjun Bose", branch: "Salt Lake Sector V", product: "Sovereign 1g Coin", qty: 3, weight: 3, amount: 22810, status: "Processing", date: "2026-06-11" },
  { id: "ORD-220121", customer: "Kavya Nair", branch: "Indiranagar Centre", product: "Reserve 100g Bar", qty: 1, weight: 100, amount: 740120, status: "Dispatched", date: "2026-06-12" },
];

export const activity = [
  { who: "Coromandel Financial Network", what: "onboarded 12 new branches", when: "2 min ago" },
  { who: "ORD-220121", what: "dispatched from Indiranagar Centre", when: "14 min ago" },
  { who: "Saraswati Distributors", what: "submitted Q2 settlement report", when: "1 hr ago" },
  { who: "Branch B-50215", what: "completed KYC for 38 customers", when: "3 hrs ago" },
  { who: "Meridian Capital Partners", what: "renewed master agreement", when: "Yesterday" },
];

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
