import { createSlice } from "@reduxjs/toolkit";

const applyTheme = (mode) => {
    if (typeof document !== "undefined")
        document.documentElement.classList.toggle("dark", mode === "dark");
}
const getSystemPref = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";

const themeSlice = createSlice({
    name: "theme",
    initialState: { mode: getSystemPref() },
    reducers: {
        toggleTheme: (state) => { state.mode = state.mode === "light" ? "dark" : "light"; applyTheme(state.mode) },
        setTheme: (state, action) => { state.mode = action.payload; applyTheme(state.mode) },
        rehydrateTheme: (state) => { applyTheme(state.mode) },
    },
});
export const { toggleTheme, setTheme, rehydrateTheme } = themeSlice.actions;
export const selectTheme = (s) => s.theme.mode;
export const selectIsDark = (s) => s.theme.mode === "dark";
export default themeSlice.reducer;