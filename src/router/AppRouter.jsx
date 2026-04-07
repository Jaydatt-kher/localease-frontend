import { useSelector } from "react-redux"
import { selectIsAdmin, selectIsCustomer, selectIsProvider, selectUser } from "../redux/authSlice"
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "../pages/user/HomePage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";
import AboutUsPage from "../pages/AboutUsPage";
import FAQPage from "../pages/FAQPage";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import BecomeProviderPage from "../pages/user/BecomeProviderPage";
import ProviderServicesPage from "../pages/provider/ProviderServicesPage";
import ProviderDashboard from "../pages/provider/ProviderDashboard";
import ServicesPage from "../pages/user/ServicesPage";
import ProviderProfilePage from "../pages/user/ProviderProfilePage";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import BookingDetailPage from "../pages/user/BookingDetailPage";
import MyRequestsPage from "../pages/user/MyRequestsPage";
import ServiceProvidersPage from "../pages/user/ServiceProvidersPage";
import ProfilePage from "../pages/user/ProfilePage";
import NotificationsPage from "../pages/NotificationsPage";
import ProviderRequestsPage from "../pages/provider/ProviderRequestsPage";
import ProviderBookingsPage from "../pages/provider/ProviderBookingsPage";
import ReviewFormPage from "../pages/user/ReviewFormPage";
import MyPaymentsPage from "../pages/provider/MyPaymentsPage";
import EarningsWalletPage from "../pages/provider/EarningsWalletPage";
import EnquiryDetailPage from "../pages/user/EnquiryDetailPage";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import UsersPage from "../pages/admin/UsersPage";
import UserProfilePage from "../pages/admin/UserProfilePage";
import ProvidersPage from "../pages/admin/ProvidersPage";
import PendingProvidersPage from "../pages/admin/PendingProvidersPage";
import ProviderProfilePage1 from "../pages/admin/ProviderProfilePage1";
import ServicesPageAdmin    from "../pages/admin/ServicesPageAdmin";
import AddServicePage  from "../pages/admin/AddServicePage";
import ServiceCategoriesPage from "../pages/admin/ServiceCategoriesPage";
import AddCategoryPage from "../pages/admin/AddCategoryPage";
import BookingsAdminPage from "../pages/admin/BookingsAdminPage";
import BookingDetailAdminPage from "../pages/admin/BookingDetailAdminPage";
import PaymentsAdminPage from "../pages/admin/PaymentsAdminPage";
import ReviewsAdminPage from "../pages/admin/ReviewsAdminPage";
import NotificationsAdminPage from "../pages/admin/NotificationsAdminPage";
import SettingsAdminPage from "../pages/admin/SettingsAdminPage";
import CitiesAdminPage from "../pages/admin/CitiesAdminPage";
import MyProfileAdminPage from "../pages/admin/MyProfileAdminPage";
import MyProfileProviderPage from "../pages/provider/MyProfileProviderPage";

const PublicOnlyRoute = () => {
  const u = useSelector(selectUser); return u ? <Navigate to={"/"} replace /> : <Outlet />;
};
const ProtectedRoute = () => {
  const u = useSelector(selectUser); return u ? <Outlet /> : <Navigate to="/signin" replace />;
}
const CustomerRoute = () => {
  const u = useSelector(selectUser); const ok = useSelector(selectIsCustomer); if (!u) return <Navigate to="/signin" replace />; if (!ok) return <Navigate to="/" replace />; return <Outlet />;
}
const ProviderRoute = () => {
  const u = useSelector(selectUser); const ok = useSelector(selectIsProvider); if (!u) return <Navigate to="/signin" replace />; if (!ok) return <Navigate to="/" replace />; return <Outlet />;
}
const AdminRoute = () => {
  const u = useSelector(selectUser); const ok = useSelector(selectIsAdmin); if (!u) return <Navigate to="/signin" replace />; if (!ok) return <Navigate to="/" replace />; return <Outlet />;
}

function HomeRedirect() {
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const isProvider = useSelector(selectIsProvider);
  if (!user) return <LandingPage />
  if (isAdmin) return <Navigate to={"/admin"} replace />
  if (isProvider) return <Navigate to={"/provider/dashboard"} replace />
  return <HomePage />
}

const Placeholder = ({ title }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-background-light dark:bg-background-dark font-display rounded-2xl border border-dashed border-border dark:border-border-dark">
    <span className="text-5xl">🚧</span>
    <h2 className="text-2xl font-bold text-foreground dark:text-foreground-dark">{title}</h2>
    <p className="text-muted dark:text-muted-dark font-body">Coming soon</p>
  </div>
)

const router = createBrowserRouter([
  { path: "/", element: <HomeRedirect /> },
  { path: "/privacy", element: <PrivacyPolicyPage /> },
  { path: "/terms", element: <TermsAndConditionsPage /> },
  { path: "/about", element: <AboutUsPage /> },
  { path: "/faqs", element: <FAQPage /> },
    { path: "/services", element: <ServicesPage /> },
  { path: "/services/category/:categoryId", element: <ServicesPage /> },
  { path: "/services/:serviceId", element: <ServiceProvidersPage /> },
  { path: "/providers/:id", element: <ProviderProfilePage /> },
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/profile", element: <ProfilePage /> },
      { path: "/become-provider", element: <BecomeProviderPage /> },
      { path: "/notifications", element: <NotificationsPage /> }
    ]
  },
  {
    element: <CustomerRoute />,
    children: [
      { path: "/my-bookings", element: <MyBookingsPage /> },
      { path: "/my-bookings/:id", element: <BookingDetailPage /> },
      { path: "/user/booking/:id/complete", element: <ReviewFormPage /> },
      { path: "/my-requests", element: <MyRequestsPage /> },
      { path: "/my-requests/:id", element: <EnquiryDetailPage /> },
      { path: "/payment/:id", element: <Placeholder title="Payment" /> },
    ]
  },
  {
    element: <ProviderRoute />,
    children: [
      { path: "/provider/dashboard", element: <ProviderDashboard /> },
      { path: "/provider/profile", element: <MyProfileProviderPage /> },
      { path: "/provider/services", element: <ProviderServicesPage /> },
      { path: "/provider/requests", element: <ProviderRequestsPage /> },
      { path: "/provider/bookings", element: <ProviderBookingsPage /> },
      { path: "/provider/bookings/:bookingId", element: <ProviderBookingsPage /> },
      { path: "/provider/payments", element: <MyPaymentsPage /> },
      { path: "/provider/earnings", element: <EarningsWalletPage /> },
    ]
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin",               element: <Dashboard /> },
          { path: "/admin/users",         element: <UsersPage /> },
          { path: "/admin/users/:id",     element: <UserProfilePage /> },
          { path: "/admin/providers",          element: <ProvidersPage /> },
          { path: "/admin/providers/pending",   element: <PendingProvidersPage /> },
          { path: "/admin/providers/:id",        element: <ProviderProfilePage1 /> },
                    { path: "/admin/services",          element: <ServicesPageAdmin />   },
          { path: "/admin/services/add",      element: <AddServicePage /> },
          { path: "/admin/services/edit/:id", element: <AddServicePage /> },
          { path: "/admin/categories",         element: <ServiceCategoriesPage /> },
          { path: "/admin/categories/add",     element: <AddCategoryPage /> },
          { path: "/admin/bookings",      element: <BookingsAdminPage /> },
          { path: "/admin/bookings/:id",   element: <BookingDetailAdminPage /> },
          { path: "/admin/payments",      element: <PaymentsAdminPage /> },
          { path: "/admin/reviews",       element: <ReviewsAdminPage /> },
          { path: "/admin/notifications", element: <NotificationsAdminPage /> },
          { path: "/admin/settings",      element: <SettingsAdminPage /> },
          { path: "/admin/cities",        element: <CitiesAdminPage /> },
          { path: "/admin/profile",       element: <MyProfileAdminPage /> },
          { path: "/admin/offers",        element: <Placeholder title="Offers & Coupons" /> },
        ]
      }
    ],
  },
  {
    path: "*", element: <Placeholder title="404 — Not Found" />
  }
]);
const AppRouter = () => <RouterProvider router={router} />
export default AppRouter;