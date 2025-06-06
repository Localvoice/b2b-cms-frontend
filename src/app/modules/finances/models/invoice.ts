class InvoiceModel {
  invoiceId: string | undefined = undefined;

  name: string | undefined = undefined;

  dateOfIssue: string | undefined = undefined;

  status: 'PAID' | 'UNPAID' | undefined = undefined;

  amount: number | undefined = undefined;

  createdAt: string | undefined = undefined;

  updatedAt: string | undefined = undefined;
}

export default InvoiceModel;
