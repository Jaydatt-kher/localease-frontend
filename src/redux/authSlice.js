import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: { user: null },
    reducers: {
        setCredentials: (state, action) => { state.user = action.payload },
        logout: (state) => { state.user = null },
        updateUser: (state, action) => { if (state.user) state.user = { ...state.user, ...action.payload } },
        setLoyaltyPoints: (state, action) => { if (state.user) state.user.loyaltyPoints = action.payload; },
    }
})
export const { setCredentials, logout, updateUser, setLoyaltyPoints } = authSlice.actions;
export const selectUser = (s) => s.auth.user;
export const selectIsLoggedIn = (s) => !!s.auth.user;
export const selectIsProvider = (s) => s.auth.user?.role === "serviceProvider";
export const selectIsAdmin = (s) => s.auth.user?.role === "admin";
export const selectIsCustomer = (s) => s.auth.user?.role === "customer";
export const selectUserRole = (s) => s.auth.user?.role ?? null;

export default authSlice.reducer;