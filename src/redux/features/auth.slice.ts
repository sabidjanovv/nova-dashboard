import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IToken {
  access_token: string;
  id: string;
}
const initialState: IToken = {
  access_token: localStorage.getItem("access_token") || "",
  id: localStorage.getItem("id") || "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ access_token: string; id: string }>
    ) => {
      state.access_token = action.payload.access_token;
      state.id = action.payload.id;
      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("id", action.payload.id);
    },
    logout: (state) => {
      state.access_token = "";
      state.id = "";
      localStorage.removeItem("access_token");
      localStorage.removeItem("id");
    },
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
