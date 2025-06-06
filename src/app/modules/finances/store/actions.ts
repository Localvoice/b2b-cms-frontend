/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { financesMutations } from './mutations';
import { NAMESPACE, FinancesState } from './state';
import { invoices } from '../dummyData/invoices';

const createAction = createActionFactory<FinancesState, RootState>();

export const actions = {
  setInvoicesData: createAction(({ commit }) => {
    commit(financesMutations.setInvoicesData.local, invoices);
  }),
  toggleEditing: createAction(({ commit }) => {
    commit(financesMutations.toggleEditing.local);
  })
};

export const financesActions = createActionMap<typeof actions, FinancesState, RootState>(NAMESPACE, actions);
