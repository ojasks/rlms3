import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Page imports
import LoginScreen from "./pages/login-screen";
import DashboardHome from "./pages/dashboard-home";
import FormListing from "./pages/form-listing";
import FormCompletion from "./pages/form-completion";
import ResponseAnalytics from "./pages/response-analytics";
import UserManagement from "./pages/user-management";

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/login-screen" element={<LoginScreen />} />
            
            {/* Normal user routes */}
            <Route 
              path="/dashboard-home" 
              element={
                <ProtectedRoute allowedRoles={['group_head', 'admin','normal']}>
                  <DashboardHome />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/form-listing" 
              element={
                <ProtectedRoute allowedRoles={['group_head', 'admin','normal']}>
                  <FormListing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/form-completion" 
              element={
                <ProtectedRoute allowedRoles={['group_head', 'admin','normal']}>
                  <FormCompletion />
                </ProtectedRoute>
              } 
            />
            
            {/* Group head and admin routes */}
            <Route 
              path="/response-analytics" 
              element={
                <ProtectedRoute allowedRoles={['group_head', 'admin']}>
                  <ResponseAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user-management" 
              element={
                <ProtectedRoute allowedRoles={['group_head', 'admin']}>
                  <UserManagement />
                </ProtectedRoute>
              } 
            />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;