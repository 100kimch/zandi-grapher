import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import App from './app';

declare global {
  module NodeJS {
    interface Global {
      $Lang: object;
      $LangGetFormattedText: (
        text: string,
        params: { [key: string]: any }
      ) => string;
    }
  }
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleware = [thunk] as const;

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
  blacklist: [],
};

const appPersistConfig = { key: 'app', storage };

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, App.reducer),
});

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware,
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;

const Store = {
  App: App.actions,
};

export default Store;
