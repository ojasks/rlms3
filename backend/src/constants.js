export const DB_NAME = "Rlmsdb"

export const ROLES = {
  USER: "user",
  GROUP_HEAD: "group_head",
  ADMIN: "admin"
};

export const FORM_TYPES = Array.from({ length: 9 }, (_, i) => i + 1); // [1,2,...,9]

export const RESPONSE_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected"
};