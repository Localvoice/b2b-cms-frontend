/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import InvoiceModel from '../models/invoice';

export const NAMESPACE = 'finances';

export type InvoiceData = {
  companyName: string;
  taxId: string;
  street: string;
  apartmentNumber: string;
  postalCode: string;
  city: string;
  country: string;
};

export interface FinancesState {
  finances: {
    invoices: InvoiceModel[];
    invoiceData: InvoiceData;
    isEditing: boolean;
  };
}

export const CoursesListEntityAdapter: EntityAdapter<InvoiceModel> = createEntityAdapter<InvoiceModel>();

export function initialState(): FinancesState {
  return {
    finances: {
      invoices: [],
      invoiceData: {
        companyName: 'AdamKnowsLanguages',
        taxId: '123456',
        street: 'Francuska',
        apartmentNumber: '3/12A',
        postalCode: '78-100',
        city: 'Kołobrzeg',
        country: 'Polska'
      },
      isEditing: false
    }
  };
}
