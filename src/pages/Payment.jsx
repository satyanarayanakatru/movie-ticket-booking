import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import {
  CreditCard,
  QrCode,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Ticket,
  Printer,
  Sparkles,
  Lock,
  DollarSign,
  Building2,
  Calendar,
  Clock,
  User,
  Loader2,
  RefreshCw,
  Share2
} from 'lucide-react';
import { toast } from 'react-toastify';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { bookings, updatePaymentInfo } = useBooking();

  // Retrieve current booking from navigation state or fallback to most recent booking
  const activeBooking = location.state?.booking || bookings[0] || {
    id: 'BK-9821',
    movie: 'Uncharted',
    moviePoster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80',
    theatre: 'PVR IMAX, Forum Mall',
    city: 'Hyderabad',
    showDate: 'Today, 30 Sep 2026',
    showTime: '07:30 PM',
    seats: ['F5', 'F6'],
    ticketCount: 2,
    subtotal: 32,
    convenienceFee: 3.5,
    totalPrice: 35.5,
    status: 'Confirmed'
  };

  // Payment tab state
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'upi' | 'wallet'

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || '');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // UPI Form State
  const [upiId, setUpiId] = useState('');

  // Wallet Form State
  const [selectedWallet, setSelectedWallet] = useState('phonepe');

  // Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(activeBooking.paymentStatus === 'Paid');
  const [paymentError, setPaymentError] = useState(false);
  const [txnId, setTxnId] = useState(activeBooking.transactionId || `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`);

  // Format Card Number input with spaces
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  // Format Expiry input MM/YY
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2)}`;
    }
    setExpiry(val);
  };

  // Process Payment Action
  const handlePayNow = (simulateFailure = false) => {
    if (activeTab === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        toast.error('Please enter a valid 16-digit Card Number');
        return;
      }
      if (!expiry || expiry.length < 5) {
        toast.error('Please enter a valid Expiry Date (MM/YY)');
        return;
      }
      if (!cvv || cvv.length < 3) {
        toast.error('Please enter a valid 3-digit CVV');
        return;
      }
    } else if (activeTab === 'upi') {
      if (!upiId.includes('@')) {
        toast.error('Please enter a valid UPI ID (e.g. john@okaxis)');
        return;
      }
    }

    setIsProcessing(true);
    setPaymentError(false);

    setTimeout(() => {
      setIsProcessing(false);

      if (simulateFailure) {
        setPaymentError(true);
        toast.error('Payment Failed! Bank gateway timeout or insufficient funds.');
      } else {
        const generatedTxn = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
        setTxnId(generatedTxn);
        setPaymentSuccess(true);
        updatePaymentInfo(
          activeBooking.id,
          generatedTxn,
          activeTab === 'card' ? 'Credit/Debit Card' : activeTab === 'upi' ? 'UPI Direct' : 'Digital Wallet'
        );
      }
    }, 2000);
  };

  // Print/Download Ticket UI
  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-8">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Module 7: Payment Gateway & E-Ticket Download</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {paymentSuccess ? 'Payment Successful!' : 'Complete Your Payment'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {paymentSuccess
              ? 'Your booking is confirmed & your E-Ticket is ready for paperless entry.'
              : 'Secure encrypted 256-bit payment gateway for movie tickets.'}
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-slate-300 hover:text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
      </div>

      {/* SUCCESS SCREEN */}
      {paymentSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Confirmed Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900/40 via-emerald-800/20 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-500/30 uppercase tracking-wider">
                  Payment Verified
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  Ticket Reserved Successfully!
                </h2>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  Transaction ID: <span className="font-mono font-bold text-white">{txnId}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrintTicket}
                className="px-5 py-3 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print E-Ticket</span>
              </button>
            </div>
          </div>

          {/* E-TICKET PASS DISPLAY */}
          <div className="bg-[#151c28] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl print:border-none print:shadow-none print:bg-white print:text-black">
            <div className="p-6 bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Ticket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wider">
                    Official Movie Pass
                  </h3>
                  <p className="text-xs text-amber-400/90 font-mono">
                    Booking ID: {activeBooking.id}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                {activeBooking.seats.length} SEATS RESERVED
              </span>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Poster & Movie Title */}
              <div className="flex items-center gap-5 md:col-span-2">
                <img
                  src={activeBooking.moviePoster}
                  alt={activeBooking.movie}
                  className="w-24 h-36 rounded-2xl object-cover border border-slate-700 shadow-xl"
                />
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-white tracking-tight">
                    {activeBooking.movie}
                  </h2>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-300">
                    <p className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <span>{activeBooking.theatre} ({activeBooking.city})</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>{activeBooking.showDate}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{activeBooking.showTime}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-amber-400" />
                      <span>{currentUser?.name || activeBooking.user}</span>
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold uppercase">Seats:</span>
                    {activeBooking.seats.map((seat) => (
                      <span
                        key={seat}
                        className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono font-black text-xs"
                      >
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* QR Code & Entry Details */}
              <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-3 bg-white rounded-2xl shadow-xl border-2 border-amber-400">
                  <QrCode className="w-28 h-28 text-slate-950" />
                </div>
                <div>
                  <p className="font-mono text-xs font-extrabold text-amber-400 tracking-widest">
                    {activeBooking.id}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Scan code at Cinema Gate #4
                  </p>
                  <p className="text-[11px] font-bold text-emerald-400 mt-2">
                    Paid: ${activeBooking.totalPrice?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => navigate('/movies')}
              className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Explore More Movies</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-colors"
            >
              <Ticket className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* PAYMENT FORM SCREEN */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Payment Tabs & Form Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selector Tabs */}
            <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span>Select Payment Method</span>
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveTab('card')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    activeTab === 'card'
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <div>
                    <p className="text-xs font-bold text-white">Credit / Debit</p>
                    <p className="text-[10px] text-slate-400">Visa, Mastercard, Amex</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('upi')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    activeTab === 'upi'
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-6 h-6" />
                  <div>
                    <p className="text-xs font-bold text-white">UPI / QR Code</p>
                    <p className="text-[10px] text-slate-400">Instant UPI Direct</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    activeTab === 'wallet'
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Wallet className="w-6 h-6" />
                  <div>
                    <p className="text-xs font-bold text-white">Digital Wallet</p>
                    <p className="text-[10px] text-slate-400">Paytm, PhonePe, GPay</p>
                  </div>
                </button>
              </div>

              {/* Dynamic Payment Tab Content */}
              <div className="pt-2">
                {activeTab === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4532 8921 7364 9102"
                          maxLength={19}
                          className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800 rounded-xl text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                        />
                        <CreditCard className="w-5 h-5 text-slate-500 absolute right-4 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800 rounded-xl text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          CVV Code
                        </label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800 rounded-xl text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Virtual Payment Address (VPA) / UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@okaxis or username@paytm"
                        className="w-full px-4 py-3 bg-[#0b0f17] border border-slate-800 rounded-xl text-white font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                      <p className="text-xs font-bold text-slate-300">Or Scan Dynamic QR Code</p>
                      <div className="p-3 bg-white w-32 h-32 mx-auto rounded-xl border-2 border-amber-400 flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-slate-950" />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Open GPay, PhonePe, Paytm or BHIM to scan & pay
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'wallet' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Choose Digital Wallet
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'phonepe', name: 'PhonePe Wallet' },
                        { id: 'paytm', name: 'Paytm Payments' },
                        { id: 'gpay', name: 'Google Pay' },
                        { id: 'amazon', name: 'Amazon Pay' }
                      ].map((w) => (
                        <button
                          key={w.id}
                          onClick={() => setSelectedWallet(w.id)}
                          className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            selectedWallet === w.id
                              ? 'bg-amber-500/10 border-amber-500/50 text-amber-400'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{w.name}</span>
                          {selectedWallet === w.id && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Error Box if previous attempt failed */}
              {paymentError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    <span>Transaction Declined by Bank. Try another method.</span>
                  </div>
                  <button
                    onClick={() => handlePayNow(false)}
                    className="px-3 py-1 bg-rose-500/20 text-rose-200 border border-rose-500/30 rounded-lg text-[10px] font-bold hover:bg-rose-500/30 cursor-pointer"
                  >
                    Retry Payment
                  </button>
                </div>
              )}

              {/* Payment Guarantee Notice */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p>
                  Your payment is secured with TLS encryption. Anti-fraud 3D Secure active.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary Sidebar & Action */}
          <div className="bg-[#151c28] border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <span>Order Summary</span>
                </h3>
                <span className="font-mono text-xs text-amber-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
                  {activeBooking.id}
                </span>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
                <img
                  src={activeBooking.moviePoster}
                  alt={activeBooking.movie}
                  className="w-16 h-22 rounded-xl object-cover border border-slate-700 shadow-md"
                />
                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-base leading-tight">
                    {activeBooking.movie}
                  </h4>
                  <p className="text-xs text-slate-400">{activeBooking.theatre}</p>
                  <p className="text-xs text-amber-400 font-mono font-bold">
                    Seats: {activeBooking.seats.join(', ')}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Tickets ({activeBooking.seats.length})</span>
                  <span className="font-semibold text-white">
                    ${activeBooking.subtotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Convenience Fee</span>
                  <span className="font-semibold text-white">
                    ${activeBooking.convenienceFee?.toFixed(2)}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-extrabold text-white">Total Amount</span>
                  <span className="text-2xl font-black text-amber-400">
                    ${activeBooking.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Pay Button & Simulator Options */}
            <div className="space-y-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePayNow(false)}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ${activeBooking.totalPrice?.toFixed(2)} Now</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {/* Developer Test Toggle for Payment Failure */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => handlePayNow(true)}
                  disabled={isProcessing}
                  className="text-[10px] text-slate-500 hover:text-rose-400 underline cursor-pointer"
                >
                  [Demo Test: Simulate Payment Failure]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
