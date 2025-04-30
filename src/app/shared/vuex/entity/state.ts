import { Comparer, EntityState, EntityStateAdapter, IdSelector, Predicate, selectIdValue } from './models';

export function getInitialEntityState<V>(): EntityState<V> {
  return {
    ids: [],
    entities: {}
  };
}

export function createInitialStateFactory<V>() {
  // function getInitialState(): EntityState<V>;
  function getInitialState<S extends Record<string, unknown>>(additionalState: S): EntityState<V> & S;
  function getInitialState<S extends Record<string, unknown>>(additionalState: S): EntityState<V> & S {
    return Object.assign(getInitialEntityState<V>(), additionalState);
  }

  return { getInitialState };
}

export function createStateAdapter<T>(selectId: IdSelector<T>, sort: false | Comparer<T>): any {
  type R = EntityState<T>;

  function addOne(entity: T, state: R): R {
    return addMany([entity], state);
  }

  function addMany(entities: T[], state: R): R {
    const models = entities.filter((model) => !(selectIdValue(model, selectId) in state.entities));

    if (models.length === 0) {
      return state;
    }

    models.forEach((entity) => {
      const id = selectIdValue(entity, selectId);
      state.entities[id] = entity; // Vue 3 reactivity
    });

    if (sort) {
      merge(models, state);
    } else {
      models.forEach((entity) => {
        state.ids.push(selectIdValue(entity, selectId));
      });
    }

    return state;
  }

  function addAll(entities: T[], state: R): R {
    state.ids = [];
    state.entities = {};

    return addMany(entities, state);
  }

  function removeOne(key: string | number, state: R): R {
    return removeMany([key], state);
  }

  function removeMany(keysOrPredicate: (string | number)[] | Predicate<T>, state: R): R {
    const keys = Array.isArray(keysOrPredicate)
      ? keysOrPredicate
      : state.ids.filter((id) => keysOrPredicate(state.entities[id]!));

    let mutated = false;

    keys.forEach((key) => {
      if (key in state.entities) {
        delete state.entities[key]; // Vue 3 reactivity
        mutated = true;
      }
    });

    if (mutated) {
      state.ids = state.ids.filter((id) => id in state.entities);
    }

    return state;
  }

  function removeAll<S extends R>(state: S): S {
    return { ...state, ids: [], entities: {} };
  }

  function updateOne(entity: T, state: R): R {
    return updateMany([entity], state);
  }

  function updateMany(entities: T[], state: R): R {
    const models = entities.filter((model) => selectIdValue(model, selectId) in state.entities);

    if (models.length === 0) {
      return state;
    }

    models.forEach((entity) => {
      const id = selectIdValue(entity, selectId);
      Object.assign(state.entities[id]!, entity);
    });

    if (sort) {
      models.forEach((entity) => {
        const id = selectIdValue(entity, selectId);
        const index = state.ids.indexOf(id);
        if (index !== -1) {
          state.ids.splice(index, 1);
        }
      });
      merge(models, state);
    }

    return state;
  }

  function upsertOne(entity: T, state: R): R {
    return upsertMany([entity], state);
  }

  function upsertMany<S extends EntityState<T>>(entities: T[], state: S): S {
    const added: T[] = [];
    const updated: T[] = [];

    for (const entity of entities) {
      const id = selectIdValue(entity, selectId);
      if (id in state.entities) {
        updated.push(entity);
      } else {
        added.push(entity);
      }
    }

    addMany(added, state);
    updateMany(updated, state);

    return state;
  }

  function merge(models: T[], state: R): void {
    models.sort(sort as any);

    const ids: Array<string | number> = [];

    let i = 0;
    let j = 0;

    while (i < models.length && j < state.ids.length) {
      const model = models[i];
      const modelId = selectIdValue(model, selectId);
      const entityId = state.ids[j];
      const entity = state.entities[entityId];

      if ((sort as any)(model, entity) <= 0) {
        ids.push(modelId);
        i++;
      } else {
        ids.push(entityId);
        j++;
      }
    }

    // state.ids = ids.concat(i < models.length ? models.slice(i).map(selectId) : state.ids.slice(j));
  }

  return {
    addOne,
    addMany,
    addAll,
    removeOne,
    removeMany,
    removeAll,
    // updateOne,
    // updateMany,
    // upsertOne,
    upsertMany
  };
}
