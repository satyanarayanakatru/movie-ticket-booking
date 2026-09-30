export const mockTheatresData = [
  {
    id: 'th-101',
    name: 'PVR IMAX, Forum Mall',
    city: 'Hyderabad',
    address: 'Kukatpally Housing Board Colony, Hyderabad, Telangana 500072',
    screens: 8,
    phone: '+91 40 4567 8901',
    email: 'forum.hyd@pvrcinemas.com',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    amenities: ['IMAX 4K Laser', 'Dolby Atmos 7.1', 'Recliner Seats', 'Gourmet Food'],
    rating: 4.8,
    shows: [
      {
        movieId: '101',
        title: 'Uncharted',
        genre: 'Action',
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '10:30 AM', status: 'Available', screen: 'Screen 1 (IMAX)' },
          { time: '02:15 PM', status: 'Filling Fast', screen: 'Screen 1 (IMAX)' },
          { time: '06:00 PM', status: 'Almost Full', screen: 'Screen 1 (IMAX)' },
          { time: '09:30 PM', status: 'Available', screen: 'Screen 2' }
        ]
      },
      {
        movieId: '102',
        title: 'Dune: Part Two',
        genre: 'Sci-Fi',
        poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '11:15 AM', status: 'Available', screen: 'Screen 3' },
          { time: '03:45 PM', status: 'Filling Fast', screen: 'Screen 3' },
          { time: '07:30 PM', status: 'Almost Full', screen: 'Screen 3 (4K)' }
        ]
      }
    ]
  },
  {
    id: 'th-102',
    name: 'INOX Multiplex, City Center',
    city: 'Mumbai',
    address: 'Bandra West, Link Road, Mumbai, Maharashtra 400050',
    screens: 6,
    phone: '+91 22 8901 2345',
    email: 'bandra.inox@inoxmovies.com',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    amenities: ['INSIGNIA Lux', 'Dolby 7.1', 'Food At Seat', 'Free Parking'],
    rating: 4.7,
    shows: [
      {
        movieId: '102',
        title: 'Dune: Part Two',
        genre: 'Sci-Fi',
        poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '01:00 PM', status: 'Available', screen: 'Screen 1' },
          { time: '05:30 PM', status: 'Filling Fast', screen: 'Screen 1' },
          { time: '09:15 PM', status: 'Available', screen: 'Screen 2 (INSIGNIA)' }
        ]
      },
      {
        movieId: '103',
        title: 'Oppenheimer',
        genre: 'Drama',
        poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '10:00 AM', status: 'Available', screen: 'Screen 4' },
          { time: '04:00 PM', status: 'Almost Full', screen: 'Screen 4' }
        ]
      }
    ]
  },
  {
    id: 'th-103',
    name: 'Cinepolis, Grand Mall',
    city: 'Bangalore',
    address: 'MG Road, Ashok Nagar, Bangalore, Karnataka 560001',
    screens: 10,
    phone: '+91 80 3456 7890',
    email: 'mgroad.cinepolis@cinepolis.in',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    amenities: ['VIP Lounge', '4DX Motion', 'Dolby Atmos', 'Valet Parking'],
    rating: 4.9,
    shows: [
      {
        movieId: '104',
        title: 'Spider-Man: Across the Spider-Verse',
        genre: 'Animation',
        poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '12:00 PM', status: 'Available', screen: 'Screen 5 (4DX)' },
          { time: '04:30 PM', status: 'Filling Fast', screen: 'Screen 5 (4DX)' },
          { time: '08:30 PM', status: 'Almost Full', screen: 'Screen 5 (4DX)' }
        ]
      },
      {
        movieId: '101',
        title: 'Uncharted',
        genre: 'Action',
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '02:00 PM', status: 'Available', screen: 'Screen 2' },
          { time: '07:00 PM', status: 'Filling Fast', screen: 'Screen 2' }
        ]
      }
    ]
  },
  {
    id: 'th-104',
    name: 'PVR Director\'s Cut',
    city: 'Delhi',
    address: 'Vasant Kunj, Nelson Mandela Marg, New Delhi 110070',
    screens: 7,
    phone: '+91 11 6789 0123',
    email: 'directorscut.delhi@pvrcinemas.com',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    amenities: ['Luxury Recliners', 'Chef Special Dining', 'Personal Concierge', 'IMAX 3D'],
    rating: 4.9,
    shows: [
      {
        movieId: '103',
        title: 'Oppenheimer',
        genre: 'Drama',
        poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '01:30 PM', status: 'Available', screen: 'Auditorium 1' },
          { time: '06:30 PM', status: 'Almost Full', screen: 'Auditorium 1' }
        ]
      },
      {
        movieId: '102',
        title: 'Dune: Part Two',
        genre: 'Sci-Fi',
        poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '04:00 PM', status: 'Filling Fast', screen: 'Auditorium 2' },
          { time: '08:30 PM', status: 'Available', screen: 'Auditorium 2' }
        ]
      }
    ]
  },
  {
    id: 'th-105',
    name: 'PVR Icon, Jubilee Hills',
    city: 'Hyderabad',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    screens: 5,
    phone: '+91 40 7890 1234',
    email: 'jubilee.icon@pvrcinemas.com',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    amenities: ['Playhouse Kids Screen', 'Dolby 7.1', 'Gourmet Cafe', 'Wheelchair Access'],
    rating: 4.7,
    shows: [
      {
        movieId: '101',
        title: 'Uncharted',
        genre: 'Action',
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '11:00 AM', status: 'Available', screen: 'Screen 1' },
          { time: '03:15 PM', status: 'Available', screen: 'Screen 1' },
          { time: '08:00 PM', status: 'Filling Fast', screen: 'Screen 1' }
        ]
      }
    ]
  },
  {
    id: 'th-106',
    name: 'Satham Cinemas, Express Avenue',
    city: 'Chennai',
    address: 'Whites Road, Royapettah, Chennai, Tamil Nadu 600014',
    screens: 8,
    phone: '+91 44 2345 6789',
    email: 'express.sathyam@spcinemas.com',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    amenities: ['RGB Laser Projection', 'Dolby Atmos', 'Popcorn Lounge', 'DTS Sound'],
    rating: 4.8,
    shows: [
      {
        movieId: '102',
        title: 'Dune: Part Two',
        genre: 'Sci-Fi',
        poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80',
        timings: [
          { time: '10:45 AM', status: 'Available', screen: 'Screen 3 (Laser)' },
          { time: '02:30 PM', status: 'Filling Fast', screen: 'Screen 3 (Laser)' },
          { time: '07:15 PM', status: 'Almost Full', screen: 'Screen 3 (Laser)' }
        ]
      }
    ]
  }
];
