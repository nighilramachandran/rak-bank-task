import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import PollSlice from "./reducers/poll";

export const store = configureStore({
  reducer: {
    [PollSlice.name]: PollSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
