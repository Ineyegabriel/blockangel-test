import { ManagementCompany } from "../model/ManagementCompany";
import { ContactPayment, PaymentStatus } from "../model/ContactPayment";

export class CompanyData {
  private companies: ManagementCompany[] = [];
  private contactPayments: ContactPayment[] = [];

  constructor() {}

  private async createManagementCompanies(): Promise<void> {
    const mc1: ManagementCompany = {
      id: "1",
      companyName: "aCompany",
      sequence: 1,
    };
    this.companies.push(mc1);

    const mc2: ManagementCompany = {
      id: "3",
      companyName: "zCompany",
      sequence: 3,
    };
    this.companies.push(mc2);

    const mc3: ManagementCompany = {
      id: "3",
      companyName: "xCompany",
      sequence: 3,
    };
    this.companies.push(mc3);

    const mc4: ManagementCompany = {
      id: "2",
      companyName: "bCompany",
      sequence: 2,
    };
    this.companies.push(mc4);
  }

  private async createContactPayments(): Promise<void> {
    const cp1: ContactPayment = {
      contactId: "02-0003",
      amount: 20,
      date: new Date().getTime() - 1,
      status: PaymentStatus.PAID,
    };
    this.contactPayments.push(cp1);

    const cp2: ContactPayment = {
      contactId: "02-0001",
      amount: 10,
      date: new Date().getTime() - 3,
      status: PaymentStatus.PAID,
    };
    this.contactPayments.push(cp2);

    const cp3: ContactPayment = {
      contactId: "02-0002",
      amount: 20,
      date: new Date().getTime() - 2,
      status: PaymentStatus.VOIDED,
    };
    this.contactPayments.push(cp3);

    const cp4: ContactPayment = {
      contactId: "02-0004",
      amount: 40,
      date: new Date().getTime() - 4,
      status: PaymentStatus.PAID,
    };
    this.contactPayments.push(cp2);
  }

  public async getCompaniesData() {
    if (!this.companies || this.companies.length === 0) {
      await this.createManagementCompanies();
    }
    return this.companies;
  }

  public async getContactPaymentsData() {
    if (!this.contactPayments || this.contactPayments.length === 0) {
      await this.createContactPayments();
    }
    return this.contactPayments;
  }
}
