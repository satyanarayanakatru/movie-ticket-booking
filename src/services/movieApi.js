import axios from 'axios';

// Public TMDB API configuration & rich fallback endpoint integration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
// Demo TMDB API key or public key fallback
const TMDB_API_KEY = '522d421671cf7564328e68e146c40239';

// Rich fallback dataset ensuring immediate 100% offline availability & instant testing
const FALLBACK_MOVIES = [
  {
    id: 101,
    title: 'Uncharted',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    genre: 'Action',
    language: 'English',
    duration: '116 mins',
    rating: 4.8,
    releaseDate: '2026-02-18',
    description: 'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan to recover a fortune amassed by Ferdinand Magellan, and lost 500 years ago by the House of Moncada.',
    director: 'Ruben Fleischer',
    cast: ['Tom Holland', 'Mark Wahlberg', 'Sophia Ali', 'Tati Gabrielle'],
    trailerUrl: 'https://www.youtube.com/watch?v=eHp3MbsCBaw'
  },
  {
    id: 102,
    title: 'Dune: Part Two',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    genre: 'Sci-Fi',
    language: 'English',
    duration: '166 mins',
    rating: 4.9,
    releaseDate: '2026-03-01',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w'
  },
  {
    id: 103,
    title: 'Oppenheimer',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80',
    genre: 'Drama',
    language: 'English',
    duration: '180 mins',
    rating: 4.9,
    releaseDate: '2025-07-21',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg'
  },
  {
    id: 104,
    title: 'Spider-Man: Across the Spider-Verse',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
    genre: 'Animation',
    language: 'English',
    duration: '140 mins',
    rating: 4.8,
    releaseDate: '2025-06-02',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    director: 'Joaquim Dos Santos',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac', 'Jake Johnson'],
    trailerUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg'
  },
  {
    id: 105,
    title: 'The Dark Knight',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    genre: 'Action',
    language: 'English',
    duration: '152 mins',
    rating: 4.9,
    releaseDate: '2024-07-18',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.',
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY'
  },
  {
    id: 106,
    title: 'Interstellar',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    genre: 'Sci-Fi',
    language: 'English',
    duration: '169 mins',
    rating: 4.7,
    releaseDate: '2024-11-07',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E'
  },
  {
    id: 107,
    title: 'KGF: Chapter 2',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    genre: 'Action',
    language: 'Hindi',
    duration: '168 mins',
    rating: 4.6,
    releaseDate: '2025-04-14',
    description: 'In the blood-soaked Kolar Gold Fields, Rocky\'s name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order.',
    director: 'Prashanth Neel',
    cast: ['Yash', 'Sanjay Dutt', 'Raveena Tandon', 'Srinidhi Shetty'],
    trailerUrl: 'https://www.youtube.com/watch?v=JKa05nyUmuQ'
  },
  {
    id: 108,
    title: 'RRR',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    backdrop: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    genre: 'Drama',
    language: 'Telugu',
    duration: '187 mins',
    rating: 4.8,
    releaseDate: '2025-03-25',
    description: 'A tale of two legendary revolutionaries and their journey far away from home before they started fighting for their country in the 1920s.',
    director: 'S. S. Rajamouli',
    cast: ['N. T. Rama Rao Jr.', 'Ram Charan', 'Alia Bhatt', 'Ajay Devgn'],
    trailerUrl: 'https://www.youtube.com/watch?v=f_vbAtFSEc0'
  }
];

export const fetchMoviesFromAPI = async () => {
  try {
    const res = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: 1
      },
      timeout: 4000
    });

    if (res.data && res.data.results && res.data.results.length > 0) {
      return res.data.results.map((m) => ({
        id: m.id,
        title: m.title,
        poster: m.poster_path ? `${TMDB_IMAGE_BASE}${m.poster_path}` : FALLBACK_MOVIES[0].poster,
        backdrop: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : FALLBACK_MOVIES[0].backdrop,
        genre: getGenreName(m.genre_ids ? m.genre_ids[0] : 28),
        language: m.original_language === 'hi' ? 'Hindi' : m.original_language === 'te' ? 'Telugu' : 'English',
        duration: `${Math.floor(Math.random() * 40) + 110} mins`,
        rating: m.vote_average ? Number((m.vote_average / 2).toFixed(1)) : 4.5,
        releaseDate: m.release_date || '2026-01-01',
        description: m.overview || 'An exciting theatrical motion picture experience.',
        director: 'Renowned Director',
        cast: ['Lead Actor', 'Co-Star', 'Supporting Cast'],
        trailerUrl: 'https://www.youtube.com/watch?v=eHp3MbsCBaw'
      }));
    }
    return FALLBACK_MOVIES;
  } catch (error) {
    console.warn('TMDB API fetch fallback active:', error.message);
    return FALLBACK_MOVIES;
  }
};

const getGenreName = (genreId) => {
  const genresMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };
  return genresMap[genreId] || 'Action';
};

export const getMovieById = async (id) => {
  const allMovies = await fetchMoviesFromAPI();
  const found = allMovies.find((m) => String(m.id) === String(id));
  if (found) return found;
  
  // Search fallback dataset
  const fallbackFound = FALLBACK_MOVIES.find((m) => String(m.id) === String(id));
  return fallbackFound || FALLBACK_MOVIES[0];
};
