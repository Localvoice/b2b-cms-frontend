/* eslint-disable import/no-cycle */
import { NavigationGuard } from 'vue-router';
import { store } from '~app/core/store';
import { configGetters } from './store';
import { FeatureName } from './types';

export function hasFeature(feature: FeatureName | FeatureName[]): boolean {
  return store.getters[configGetters.hasFeature](feature);
}

export function featureGuard(feature: FeatureName | FeatureName[]): NavigationGuard {
  return (to, from, next) => next(hasFeature(feature) ? undefined : (from as any));
}
