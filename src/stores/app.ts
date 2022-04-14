import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from '~config';
import { REFRESH_PERIOD } from '~constants';
import { AppStore, Simple } from '~models';

const initialState = new AppStore();

export default createSlice({
  name: 'app',
  initialState,
  reducers: {
    init: () => ({
      ...new AppStore(),
      storedVersion: config.VERSION,
    }),
  },
  extraReducers(builder) {},
});
