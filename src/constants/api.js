// API Configuration for Music Services
export const API_CONFIG = {
  // Last.fm API (Free tier available)
  LASTFM: {
    BASE_URL: 'https://ws.audioscrobbler.com/2.0/',
    API_KEY: 'YOUR_LASTFM_API_KEY', // Get from: https://www.last.fm/api/account/create
    LIMIT: 20
  },
  
  // Spotify API (Free tier available)
  SPOTIFY: {
    BASE_URL: 'https://api.spotify.com/v1',
    CLIENT_ID: 'YOUR_SPOTIFY_CLIENT_ID', // Get from: https://developer.spotify.com/dashboard
    CLIENT_SECRET: 'YOUR_SPOTIFY_CLIENT_SECRET'
  },
  
  // Deezer API (Free, no API key required)
  DEEZER: {
    BASE_URL: 'https://api.deezer.com',
    LIMIT: 20
  },
  
  // iTunes API (Free, no API key required)
  ITUNES: {
    BASE_URL: 'https://itunes.apple.com',
    LIMIT: 20
  }
}

// Popular songs for fallback (when API is not available)
export const POPULAR_SONGS = [
  { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours' },
  { id: 2, title: 'Dance Monkey', artist: 'Tones and I', album: 'The Kids Are Coming' },
  { id: 3, title: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)' },
  { id: 4, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special' },
  { id: 5, title: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee', album: 'Vida' },
  { id: 6, title: 'See You Again', artist: 'Wiz Khalifa ft. Charlie Puth', album: 'Furious 7' },
  { id: 7, title: 'Sugar', artist: 'Maroon 5', album: 'V' },
  { id: 8, title: 'Shake It Off', artist: 'Taylor Swift', album: '1989' },
  { id: 9, title: 'Counting Stars', artist: 'OneRepublic', album: 'Native' },
  { id: 10, title: 'Dark Horse', artist: 'Katy Perry ft. Juicy J', album: 'Prism' },
  { id: 11, title: 'All of Me', artist: 'John Legend', album: 'Love in the Future' },
  { id: 12, title: 'Stay With Me', artist: 'Sam Smith', album: 'In The Lonely Hour' },
  { id: 13, title: 'Happy', artist: 'Pharrell Williams', album: 'G I R L' },
  { id: 14, title: 'Roar', artist: 'Katy Perry', album: 'Prism' },
  { id: 15, title: 'Can\'t Hold Us', artist: 'Macklemore & Ryan Lewis', album: 'The Heist' },
  { id: 16, title: 'Radioactive', artist: 'Imagine Dragons', album: 'Night Visions' },
  { id: 17, title: 'Royals', artist: 'Lorde', album: 'Pure Heroine' },
  { id: 18, title: 'Get Lucky', artist: 'Daft Punk ft. Pharrell Williams', album: 'Random Access Memories' },
  { id: 19, title: 'Locked Out of Heaven', artist: 'Bruno Mars', album: 'Unorthodox Jukebox' },
  { id: 20, title: 'Somebody That I Used to Know', artist: 'Gotye ft. Kimbra', album: 'Making Mirrors' },
]

// API Service Functions
export const MusicAPI = {
  // Fetch songs using iTunes API (free, no key required)
  async fetchFromITunes(searchQuery = '') {
    try {
      const query = searchQuery || 'popular'
      const response = await fetch(
        `${API_CONFIG.ITUNES.BASE_URL}/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=${API_CONFIG.ITUNES.LIMIT}`
      )
      const data = await response.json()
      
      if (data.results) {
        return data.results.map((track, index) => ({
          id: index + 1,
          title: track.trackName,
          artist: track.artistName,
          album: track.collectionName || 'Unknown Album',
          artwork: track.artworkUrl100
        }))
      }
      return []
    } catch (error) {
      console.error('iTunes API error:', error)
      return []
    }
  },

  // Fetch songs using Deezer API (free, no key required)
  async fetchFromDeezer(searchQuery = '') {
    try {
      const query = searchQuery || 'popular'
      const response = await fetch(
        `${API_CONFIG.DEEZER.BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${API_CONFIG.DEEZER.LIMIT}`
      )
      const data = await response.json()
      
      if (data.data) {
        return data.data.map((track, index) => ({
          id: index + 1,
          title: track.title,
          artist: track.artist.name,
          album: track.album.title,
          artwork: track.album.cover_medium
        }))
      }
      return []
    } catch (error) {
      console.error('Deezer API error:', error)
      return []
    }
  },

  // Fetch songs using Last.fm API (requires API key)
  async fetchFromLastFM(searchQuery = '') {
    if (API_CONFIG.LASTFM.API_KEY === 'YOUR_LASTFM_API_KEY') {
      throw new Error('Last.fm API key not configured')
    }

    try {
      const params = new URLSearchParams({
        method: 'track.search',
        track: searchQuery || 'popular',
        api_key: API_CONFIG.LASTFM.API_KEY,
        format: 'json',
        limit: API_CONFIG.LASTFM.LIMIT
      })
      
      const response = await fetch(`${API_CONFIG.LASTFM.BASE_URL}?${params}`)
      const data = await response.json()
      
      if (data.results && data.results.trackmatches) {
        return data.results.trackmatches.track.map((track, index) => ({
          id: index + 1,
          title: track.name,
          artist: track.artist,
          album: track.album || 'Unknown Album'
        }))
      }
      return []
    } catch (error) {
      console.error('Last.fm API error:', error)
      return []
    }
  }
}
