/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, FinancesState, InvoiceData } from './state';
import InvoiceModel from '../models/invoice';

const createMutation = createMutationFactory<FinancesState>();

export const mutations = {
  setInvoicesData: createMutation((state, invoices: InvoiceModel[]) => {
    state.finances.invoices = invoices;
  }),
  toggleEditing: createMutation((state) => {
    state.finances.isEditing = !state.finances.isEditing;
  }),
  setInvoicedata: createMutation((state, invoiceData: InvoiceData) => {
    state.finances.invoiceData = invoiceData;
  })
};

export const financesMutations = createMutationMap<typeof mutations, FinancesState>(NAMESPACE, mutations);
