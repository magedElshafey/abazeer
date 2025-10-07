export const ADDRESS_TYPES = {
  SHIPPING: 1,
  BILLING: 2,
} as const;

export const ADDRESS_TYPE_OPTIONS = [
  { id: ADDRESS_TYPES.SHIPPING, name: "shipping" },
  { id: ADDRESS_TYPES.BILLING, name: "billing" },
];

