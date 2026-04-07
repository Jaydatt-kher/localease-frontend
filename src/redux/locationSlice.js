import { createSelector, createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "location",
    initialState: {
        lat: null,
        lng: null,
        label: null,
        address: null,
        isLive: null
    },
    reducers: {
        setLocation: (state, action) => {
            const { lat, lng, label, address, isLive } = action.payload;
            state.lat = lat,
                state.lng = lng,
                state.label = label,
                state.address = address ?? label,
                state.isLive = isLive ?? false
        },
        clearLocation: (state) => {
            state.lat = null;
            state.lng = null;
            state.label = null;
            state.address = null;
            state.isLive = false;
        }
    }
})
export const { setLocation, clearLocation } = locationSlice.actions;
const _selectLat     = (s) => s.location.lat;
const _selectLng     = (s) => s.location.lng;
const _selectLabel   = (s) => s.location.label;
const _selectAddress = (s) => s.location.address;
const _selectIsLive  = (s) => s.location.isLive
export const selectLocationLabel   = _selectLabel;
export const selectLocationAddress = _selectAddress;
export const selectHasLocation     = (s) => s.location.lat !== null && s.location.lng !== null;
 
export const selectLocationCoords = createSelector(
  [_selectLat, _selectLng],
  (lat, lng) => (lat !== null && lng !== null ? { lat, lng } : null)
);
 
export const selectLocation = createSelector(
  [_selectLat, _selectLng, _selectLabel, _selectAddress, _selectIsLive],
  (lat, lng, label, address, isLive) => ({ lat, lng, label, address, isLive })
);

export default locationSlice.reducer;