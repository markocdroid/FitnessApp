import { getFavorites, saveFavorites } from '../storage/localStorage';
import { setFavorites } from './favoritesSlice';

// Loads saved favorites into the store, then saves every later change.
// Subscribing only after hydration prevents the empty initial state from overwriting saved data.
export async function hydrateAndPersistFavorites(store) {
  const saved = await getFavorites();
  store.dispatch(setFavorites(saved));

  let previous = store.getState().favorites.items;
  return store.subscribe(() => {
    const current = store.getState().favorites.items;
    if (current !== previous) {
      previous = current;
      saveFavorites(current);
    }
  });
}
