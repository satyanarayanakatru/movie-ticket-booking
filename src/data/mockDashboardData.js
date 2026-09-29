export const mockDashboardStats = {
  totalMovies: 48,
  totalTheatres: 16,
  totalBookings: 1248,
  availableShows: 184,
  todaysBookings: 156,
  totalRevenue: 24850,
  monthlyRevenueGrowth: '+18.4%',
  seatOccupancyRate: '78.5%'
};

export const mockUpcomingMovies = [
  {
    id: 'm1',
    title: 'Uncharted',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    genre: 'Action / Adventure',
    language: 'English',
    rating: 4.8,
    releaseDate: '2026-10-15',
    duration: '116 mins',
    description: 'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan to recover a fortune.',
    director: 'Ruben Fleischer',
    writers: 'Rafe Judkins',
    trailerUrl: 'https://www.youtube.com/watch?v=eHp3MbsCBaw'
  },
  {
    id: 'm2',
    title: 'Dune: Part Two',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    genre: 'Sci-Fi / Drama',
    language: 'English',
    rating: 4.9,
    releaseDate: '2026-10-22',
    duration: '166 mins',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    director: 'Denis Villeneuve',
    writers: 'Jon Spaihts',
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w'
  },
  {
    id: 'm3',
    title: 'Oppenheimer',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80',
    genre: 'Biography / History',
    language: 'English',
    rating: 4.9,
    releaseDate: '2026-11-05',
    duration: '180 mins',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    director: 'Christopher Nolan',
    writers: 'Christopher Nolan',
    trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg'
  },
  {
    id: 'm4',
    title: 'Spider-Man: Across the Spider-Verse',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
    genre: 'Animation / Action',
    language: 'English',
    rating: 4.8,
    releaseDate: '2026-11-18',
    duration: '140 mins',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.',
    director: 'Joaquim Dos Santos',
    writers: 'Phil Lord, Christopher Miller',
    trailerUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg'
  }
];

export const mockRecentBookings = [
  {
    id: 'BK-9821',
    user: 'Larry Davidson',
    movie: 'Uncharted',
    theatre: 'PVR IMAX, Forum Mall',
    city: 'Hyderabad',
    showTime: 'Today, 07:30 PM',
    seats: ['F5', 'F6'],
    ticketCount: 2,
    totalPrice: 45,
    status: 'Confirmed',
    bookingDate: '2026-09-28 14:20'
  },
  {
    id: 'BK-9820',
    user: 'Sophia Martinez',
    movie: 'Dune: Part Two',
    theatre: 'INOX Multiplex, City Center',
    city: 'Mumbai',
    showTime: 'Today, 09:15 PM',
    seats: ['H10', 'H11', 'H12'],
    ticketCount: 3,
    totalPrice: 67.5,
    status: 'Confirmed',
    bookingDate: '2026-09-28 13:45'
  },
  {
    id: 'BK-9819',
    user: 'Alex Rivera',
    movie: 'Oppenheimer',
    theatre: 'Cinepolis, Grand Mall',
    city: 'Bangalore',
    showTime: 'Today, 04:00 PM',
    seats: ['D8'],
    ticketCount: 1,
    totalPrice: 22.5,
    status: 'Completed',
    bookingDate: '2026-09-28 11:30'
  },
  {
    id: 'BK-9818',
    user: 'Emma Watson',
    movie: 'Uncharted',
    theatre: 'PVR Icon, Jubilee Hills',
    city: 'Hyderabad',
    showTime: 'Tomorrow, 06:00 PM',
    seats: ['G4', 'G5'],
    ticketCount: 2,
    totalPrice: 45,
    status: 'Cancelled',
    bookingDate: '2026-09-27 18:10'
  },
  {
    id: 'BK-9817',
    user: 'David Miller',
    movie: 'Spider-Man: Across the Spider-Verse',
    theatre: 'PVR Director Cut',
    city: 'Delhi',
    showTime: 'Tomorrow, 08:30 PM',
    seats: ['E1', 'E2', 'E3', 'E4'],
    ticketCount: 4,
    totalPrice: 90,
    status: 'Confirmed',
    bookingDate: '2026-09-27 15:40'
  }
];

export const mockRevenueBreakdown = [
  { day: 'Mon', revenue: 3200 },
  { day: 'Tue', revenue: 4100 },
  { day: 'Wed', revenue: 3800 },
  { day: 'Thu', revenue: 4900 },
  { day: 'Fri', revenue: 6800 },
  { day: 'Sat', revenue: 9500 },
  { day: 'Sun', revenue: 8400 }
];
