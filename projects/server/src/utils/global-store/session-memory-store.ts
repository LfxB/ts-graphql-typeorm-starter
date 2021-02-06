// This Memory Store is used for Express Session.
import session from '../express-session';
const MemoryStore = require('memorystore')(session);

export const memoryStore = new MemoryStore({
  checkPeriod: 86400000
});

export const getSessionAsync = (sid): Promise<any> => {
  return new Promise((resolve, reject) => {
    memoryStore.get(sid, (error, session) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(session);
    });
  });
};

export const setSessionAsync = (sid, session): Promise<any> => {
  return new Promise((resolve, reject) => {
    memoryStore.set(sid, session, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(true);
    });
  });
};
