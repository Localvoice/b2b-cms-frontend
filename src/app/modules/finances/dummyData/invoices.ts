import InvoiceModel from '../models/invoice';

export const invoices: InvoiceModel[] = [
  {
    invoiceId: 'INV-001',
    name: 'INV-2024-06-001',
    dateOfIssue: '2025-04-01T00:00:00Z',
    status: 'PAID',
    amount: 1000,
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-04-01T12:00:00Z'
  },
  {
    invoiceId: 'INV-002',
    name: 'INV-2025-06-001',
    dateOfIssue: '2025-05-01T00:00:00Z',
    status: 'PAID',
    amount: 1200,
    createdAt: '2025-05-01T00:00:00Z',
    updatedAt: '2025-05-01T12:00:00Z'
  },
  {
    invoiceId: 'INV-003',
    name: 'INV-2023-06-001',
    dateOfIssue: '2025-06-01T00:00:00Z',
    status: 'PAID',
    amount: 600,
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2025-06-01T12:00:00Z'
  }
];
