import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BookingContext = createContext(null);

const DEFAULT_BOOKINGS = [
  {
    id: 'BK-9821',
    userId: 'usr_demo_1',
    user: 'Larry Davidson',
    movieId: '101',
    movie: 'Uncharted',
    moviePoster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80',
    theatreId: 'th-101',
    theatre: 'PVR IMAX, Forum Mall',
    city: 'Hyderabad',
    showDate: 'Today, 30 Sep 2026',
    showTime: '07:30 PM',
    seats: ['F5', 'F6'],
    ticketCount: 2,
    subtotal: 32,
    convenienceFee: 3.5,
    totalPrice: 35.5,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  }
];

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('movie_app_bookings');
      if (saved) return JSON.parse(saved);
      localStorage.setItem('movie_app_bookings', JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    } catch (e) {
      console.error('Error reading bookings from localStorage', e);
      return DEFAULT_BOOKINGS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('movie_app_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings to localStorage', e);
    }
  }, [bookings]);

  // Generate Unique Booking ID (e.g. BK-8492)
  const generateBookingId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `BK-${randomNum}`;
  };

  // Prevent Duplicate Booking
  const isDuplicateBooking = (theatreId, showDate, showTime, selectedSeats = []) => {
    if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) return false;
    return (bookings || []).some((b) => {
      if (!b || b.status === 'Cancelled' || b.status === 'Pending Payment') return false;
      const sameSession =
        b.theatreId === theatreId &&
        b.showDate === showDate &&
        b.showTime === showTime;

      if (!sameSession) return false;

      return Array.isArray(b.seats) && selectedSeats.some((seat) => b.seats.includes(seat));
    });
  };

  // Create pending booking
  const createBooking = (bookingPayload) => {
    const { theatreId, showDate, showTime, selectedSeats } = bookingPayload;

    if (isDuplicateBooking(theatreId, showDate, showTime, selectedSeats)) {
      toast.error('Duplicate Booking Detected! One or more selected seats are already booked for this showtime.');
      return { success: false, message: 'Duplicate booking' };
    }

    const bookingId = generateBookingId();
    const newBooking = {
      ...bookingPayload,
      id: bookingId,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    return { success: true, booking: newBooking };
  };

  // Cancel booking
  const cancelBooking = (bookingId) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: 'Cancelled' } : b
    );
    setBookings(updated);
    toast.info(`Booking ${bookingId} has been cancelled.`);
  };

  // Update payment status & confirm booking upon payment completion
  const updatePaymentInfo = (bookingId, transactionId, paymentMethod) => {
    const updated = bookings.map((b) =>
      b.id === bookingId
        ? {
            ...b,
            status: 'Confirmed',
            paymentStatus: 'Paid',
            transactionId: transactionId,
            paymentMethod: paymentMethod,
            paidAt: new Date().toISOString()
          }
        : b
    );
    setBookings(updated);
    toast.success(`Booking Confirmed & Payment Successful! Transaction ID: ${transactionId}`);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        createBooking,
        cancelBooking,
        updatePaymentInfo,
        isDuplicateBooking,
        generateBookingId
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
