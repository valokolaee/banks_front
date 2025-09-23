import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  preferences: Record<string, any>;
}

const initialState: UserState = {
  preferences: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPreference(state, action: { payload: { key: string; value: any } }) {
      state.preferences[action.payload.key] = action.payload.value;
    }
  }
});

export const { setPreference } = userSlice.actions;
