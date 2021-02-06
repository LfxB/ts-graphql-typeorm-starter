import LRU from 'lru-cache';
import { TemporaryUser } from '../../type/TemporaryUser';

const setupCacheStores = () => ({
  exampleStore: (() => {
    // Store key must be a string and value must be a number
    const store = new LRU<string, number>({
      // Allow 500 entries in this store, based on the length value, which is 1
      max: 500,
      length: function () {
        return 1;
      },
      // 48 hrs default
      maxAge: 86400000 * 2
    });

    // setInterval to prune expired entries every x milliseconds
    // It is not required if you want to let the entries get popped out naturally
    // setInterval(() => {
    //   console.log("Pruning old entries in exampleSecondStore.");
    //   store.prune();
    // }, Math.floor(10000)); // every 10 seconds
    return store;
  })(),

  userSessionStore: (() => {
    const store = new LRU<string, TemporaryUser>({
      max: Number.POSITIVE_INFINITY,
      length: function () {
        return 1;
      },
      // 3 hrs
      maxAge: 1000 * 60 * 60 * 3
    });

    // Example:
    // sessionId = { username: 'bobby' };

    return store;
  })()
});

export const cacheStores = setupCacheStores();
