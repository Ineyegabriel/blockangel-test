import { ManagementCompanyServices } from "../src/services/ManagementCompanyServices";

describe("Management Company Services", () => {
  beforeEach(() => {
    const mockedSystemTime = "2023-08-10T01:36:37.675Z";
    jest.useFakeTimers().setSystemTime(new Date(mockedSystemTime));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("getCompanySequenceMap returns a map of company sequence and company details", async () => {
    let mcServices = new ManagementCompanyServices();
    const action = await mcServices.getCompanySequenceMap();
    expect(action).toMatchSnapshot();
  });

  test("processContactPayments returns a map of CompanyPayments sorted by payment status", async () => {
    let mcServices = new ManagementCompanyServices();
    const action = await mcServices.processContactPayments();

    expect(action).toMatchSnapshot();
  });
});
