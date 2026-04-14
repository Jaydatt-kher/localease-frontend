import React, { useEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import AppRouter from './router/AppRouter';
import { ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { rehydrateTheme, selectTheme } from './redux/themeSlice';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { selectUser, selectIsAdmin, selectIsProvider } from './redux/authSlice';
import { useGetMyProfileQuery } from './api/userApi';
import { useGetAdminProfileQuery } from './api/adminApi';

function ThemeSync() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  useEffect(() => { dispatch(rehydrateTheme()); }, [dispatch]);
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark") }, [theme])
  return null
}

// Silently syncs the latest photoUrl/profile data to Redux on app load
function ProfileSyncInitializer() {
  const user      = useSelector(selectUser);
  const isAdmin   = useSelector(selectIsAdmin);
  const isProvider= useSelector(selectIsProvider);

  // For admin: fetch admin profile (onQueryStarted in adminApi syncs to Redux)
  useGetAdminProfileQuery(undefined, { skip: !user || !isAdmin });
  // For customers and providers: fetch user profile (onQueryStarted in userApi syncs to Redux)
  useGetMyProfileQuery(undefined, { skip: !user || isAdmin });

  return null;
}

function PersistLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light gap-4">
      <p className="text-2xl font-display font-extrabold">
        <span className="text-primary">Local</span>
        <span className="text-accent">Ease</span>
      </p>
      <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
    </div>
  )
}
function AppContent() {
  return (
    <>
      <ThemeSync />
      <ProfileSyncInitializer />
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        toastStyle={{ fontFamily: "'DM Sans', sans-serif" }} />
    </>
  )
}
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoader />} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  )
}

