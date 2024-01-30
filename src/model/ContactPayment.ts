export function stringEnum<T extends string>(...params: T[]): { [K in T]: K } {
  return Object.fromEntries(params.map((x) => [x, x])) as { [K in T]: K };
}

export const PaymentStatus = stringEnum("PAID", "VOIDED");
export interface ContactPayment {
  contactId: string;
  amount: number;
  date: number;
  status: string;
}

export interface CompanyPayments extends ContactPayment {
  companyId: string;
  companyName: string;
}
