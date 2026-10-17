import { Routes, Route } from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import SearchPage from './pages/public/SearchPage';
import BrowsePage from './pages/public/BrowsePage';
import PersonPage from './pages/public/PersonPage';
import OperationPage from './pages/public/OperationPage';
import OnThisDayPage from './pages/public/OnThisDayPage';
import AboutPage from './pages/public/AboutPage';
import ContributePage from './pages/public/ContributePage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// User Dashboard Pages
import UserDashboardPage from './pages/user/DashboardPage';
import BookmarksPage from './pages/user/BookmarksPage';
import SettingsPage from './pages/user/SettingsPage';

// Contributor Pages
import ContributorDashboardPage from './pages/contributor/DashboardPage';
import SubmissionsPage from './pages/contributor/SubmissionsPage';
import NewSubmissionPage from './pages/contributor/NewSubmissionPage';
import EditSubmissionPage from './pages/contributor/EditSubmissionPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/DashboardPage';
import ApplicationsPage from './pages/admin/ApplicationsPage';
import AdminSubmissionsPage from './pages/admin/SubmissionsPage';
import ReviewSubmissionPage from './pages/admin/ReviewSubmissionPage';
import UsersPage from './pages/admin/UsersPage';
import CorrectionsPage from './pages/admin/CorrectionsPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';

// Route Guards
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/people/:slug" element={<PersonPage />} />
        <Route path="/operations/:slug" element={<OperationPage />} />
        <Route path="/on-this-day" element={<OnThisDayPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contribute" element={<ContributePage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboardPage />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="corrections" element={<UserDashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Contributor Routes */}
        <Route
          path="/contributor"
          element={
            <ProtectedRoute requiredRole="CONTRIBUTOR">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ContributorDashboardPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route path="submissions/new" element={<NewSubmissionPage />} />
          <Route path="submissions/:id" element={<EditSubmissionPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="submissions" element={<AdminSubmissionsPage />} />
          <Route path="submissions/:id" element={<ReviewSubmissionPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="corrections" element={<CorrectionsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
