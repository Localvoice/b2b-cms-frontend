/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, FinancesState } from './state';

const createGetter = createGetterFactory<FinancesState, RootState>();

export const getters = {
  getInvoices: createGetter((state) => state.finances.invoices),
  isEditing: createGetter((state) => state.finances.isEditing),
  getInvoiceData: createGetter((state) => state.finances.invoiceData)
};

export const financesGetters = createGetterMap<typeof getters, FinancesState, RootState>(NAMESPACE, getters);
