import { isRejectedWithValue } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const rtkErrorLogger = (api) => (next) => (action) => {
    // RTK Query uses `isRejectedWithValue` for rejected promises with payloads.
    if (isRejectedWithValue(action)) {
        console.error('API Error:', action.payload || action.error);
        if (action.payload && action.payload.status === 400) {
           console.warn('API Warning: Validation or bad request issue detected.', action.payload);
        }
    }

    return next(action);
};
