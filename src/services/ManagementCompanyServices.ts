import { CompanyData } from "../init/CompanyData";
import {
  CompanyPayments,
  ContactPayment,
  PaymentStatus,
} from "../model/ContactPayment";
import { ManagementCompany } from "../model/ManagementCompany";

export class ManagementCompanyServices {
  private companyData: CompanyData;

  constructor() {
    this.companyData = new CompanyData();
  }

  // Test:
  // Implement logic outlined in the 3 functions below. Feel free to add any comments to support your
  // implementation. Don't spend any more than 90 mins on this
  //
  // Note: Don't change the function signature (including async)
  //

  // 1. Create a Map:
  //      From: this.companyData.getCompaniesData()
  //      Key: company.sequence
  //      Value: company
  //
  //  Return the Map
  public async getCompanySequenceMap() {
    //TODO - Implement
    let managementCompanies: ManagementCompany[] = [];
    const companySequenceMap: Map<number, ManagementCompany[]> = new Map();

    await this.companyData.getCompaniesData().then((data) => {
      managementCompanies = data;
      // Map companies to sequence map
      managementCompanies.forEach((company) => {
        if (company.sequence !== undefined) {
          // Add to map
          if (companySequenceMap.has(company.sequence)) {
            companySequenceMap.get(company.sequence)?.push(company);
          } else {
            // Create new array
            companySequenceMap.set(company.sequence, [company]);
          }
        }
      });
    });
    return companySequenceMap;
  }

  // 2. This function extracts the company related to a given contact Id
  //      Input: contactId, in the format of ss-xxxx where ss represents the company sequence (see ManagementCompany)
  //      Output: company identified by ss
  //
  // Hint: Use 1. getCompanySequenceMap()
  public async getCompanyRelatedToContactId(contactId: String) {
    //TODO - Implement
    const companySequence = Number(contactId.split("-")[0]);
    const companyMap = await this.getCompanySequenceMap();
    return companyMap.get(companySequence);
  }

  // 2.This function processes contact payments to create equivalent company payments that are filtered and sorted.
  //
  //  A. Create a new Model object: CompanyPayment, with same fields as ContactPayment with addition of companyId and
  //     company Name. Process contact payments (this.companyData.getContactPaymentsData()) to create CompanyPayments array
  //     enriched with companyId and company name.
  //
  //     Note: use map to process contact payments, contactPayments.map(....
  //
  //  B. Filter the array of CompanyPayments by PaymentStatus.PAID
  //
  //  C. Sort the CompanyPayments by date
  //
  //  Return CompanyPayments array
  //
  // Hint:
  //      - in mapping you will need to use this.getCompanyRelatedToContactId
  //      - in map logic you might run into promise issues, Promise.all!!
  //
  public async processContactPayments() {
    //TODO - Implement
    const contactPaymentsData = await this.companyData.getContactPaymentsData();

    // A. Create CompanyPayments array enriched with companyId and companyName
    const companyPayments: Array<CompanyPayments> = await Promise.all(
      contactPaymentsData.map(async (contactPayment) => {
        const company: ManagementCompany | undefined = (
          await this.getCompanyRelatedToContactId(contactPayment.contactId)
        )?.[0];
        return {
          ...contactPayment,
          companyId: company?.id || "",
          companyName: company?.companyName || "",
        };
      })
    );

    // B. Filter by PaymentStatus.PAID
    const paidCompanyPayments = companyPayments.filter((cp) => {
      if (cp.status !== PaymentStatus.PAID) {
        return false;
      }

      return true;
    });

    // C. Sort by date
    paidCompanyPayments.sort((a, b) => a.date - b.date);

    return paidCompanyPayments;
  }
}
