import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MovieListing from './pages/MovieListing';
import MovieDetails from './pages/MovieDetails';
import TheatreListing from './pages/TheatreListing';
import SeatSelection from './pages/SeatSelection';
import TicketBooking from './pages/TicketBooking';
import Payment from './pages/Payment';
import BookingHistory from './pages/BookingHistory';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            {/* Public Only Routes (Accessible only when logged out) */}
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicOnlyRoute>
                  <ForgotPassword />
                </PublicOnlyRoute>
              }
            />

            {/* Protected Routes (Accessible only when logged in) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="movies" element={<MovieListing />} />
              <Route path="movies/:id" element={<MovieDetails />} />
              <Route path="theatres" element={<TheatreListing />} />
              <Route path="seat-selection" element={<SeatSelection />} />
              <Route path="ticket-booking" element={<TicketBooking />} />
              <Route path="payment" element={<Payment />} />
              <Route path="bookings" element={<BookingHistory />} />
              <Route path="profile" element={<Dashboard />} />
            </Route>

            {/* Catch-all Fallback Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          {/* Global Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
