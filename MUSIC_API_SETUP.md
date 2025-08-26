# Music API Setup Guide

This guide explains how to set up real music APIs for the sound selection feature in your Fuugohub app.

## 🎵 Available APIs

### 1. **iTunes API** (Recommended - Free, No Key Required)
- **Status**: ✅ Ready to use
- **Features**: Search songs, get artwork, artist info
- **Rate Limit**: Generous limits
- **Setup**: No setup required - works out of the box

### 2. **Deezer API** (Free, No Key Required)
- **Status**: ✅ Ready to use  
- **Features**: Search songs, get album covers, artist info
- **Rate Limit**: Generous limits
- **Setup**: No setup required - works out of the box

### 3. **Last.fm API** (Free Tier Available)
- **Status**: ⚠️ Requires API key
- **Features**: Rich music data, artist info, tags
- **Rate Limit**: 5 requests per second (free tier)
- **Setup**: Requires API key registration

### 4. **Spotify API** (Free Tier Available)
- **Status**: ⚠️ Requires API key
- **Features**: Extensive music library, playlists
- **Rate Limit**: 25 requests per second (free tier)
- **Setup**: Requires API key registration

## 🚀 Current Implementation

The app currently uses a **fallback system**:

1. **First**: Tries iTunes API (free, no key)
2. **Second**: Tries Deezer API (free, no key)  
3. **Fallback**: Uses curated popular songs list

This ensures the app works immediately without any API setup!

## 🔧 Setting Up Paid APIs (Optional)

### Last.fm API Setup

1. Go to [Last.fm API](https://www.last.fm/api/account/create)
2. Create a free account
3. Generate an API key
4. Update `src/constants/api.js`:

```javascript
LASTFM: {
  BASE_URL: 'https://ws.audioscrobbler.com/2.0/',
  API_KEY: 'YOUR_ACTUAL_API_KEY_HERE', // Replace this
  LIMIT: 20
}
```

### Spotify API Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Get Client ID and Client Secret
4. Update `src/constants/api.js`:

```javascript
SPOTIFY: {
  BASE_URL: 'https://api.spotify.com/v1',
  CLIENT_ID: 'YOUR_CLIENT_ID_HERE', // Replace this
  CLIENT_SECRET: 'YOUR_CLIENT_SECRET_HERE' // Replace this
}
```

## 📱 Features

### Current Features
- ✅ Real-time song search
- ✅ Multiple API fallbacks
- ✅ Loading states
- ✅ Error handling
- ✅ Debounced search (500ms delay)
- ✅ Empty state handling
- ✅ Song details (title, artist, album)

### Song Data Structure
```javascript
{
  id: 1,
  title: "Song Title",
  artist: "Artist Name", 
  album: "Album Name",
  artwork: "https://..." // Available from some APIs
}
```

## 🔄 API Priority Order

The app tries APIs in this order:

1. **iTunes API** → Fast, reliable, no key needed
2. **Deezer API** → Good fallback, no key needed  
3. **Popular Songs** → Always available fallback

## 🎯 Usage

1. Record a video in the Drop screen
2. After recording, the AddSoundModal opens automatically
3. Search for songs using the search bar
4. Tap the play button to preview (future feature)
5. Tap the + button to add the song to your video

## 🛠️ Customization

### Adding More APIs

To add another API, update `src/constants/api.js`:

```javascript
// Add new API config
NEW_API: {
  BASE_URL: 'https://api.example.com',
  API_KEY: 'your_key'
}

// Add fetch function to MusicAPI
async fetchFromNewAPI(searchQuery = '') {
  // Implementation here
}
```

### Modifying Search Behavior

- **Debounce delay**: Change `500` in `handleSearch` function
- **Search threshold**: Change `text.length > 2` condition
- **Results limit**: Update `LIMIT` in API configs

## 🐛 Troubleshooting

### Common Issues

1. **"No songs found"**
   - Check internet connection
   - APIs might be temporarily down
   - Fallback to popular songs will work

2. **Slow search**
   - Increase debounce delay (currently 500ms)
   - Check API rate limits

3. **API errors**
   - Check console logs for specific errors
   - Verify API keys if using paid APIs

### Debug Mode

Enable debug logging by checking the console for:
- API response data
- Fallback triggers
- Search queries

## 📄 License Notes

- **iTunes API**: Free for commercial use
- **Deezer API**: Free for commercial use  
- **Last.fm API**: Free tier available
- **Spotify API**: Free tier available

## 🎉 Ready to Use!

The app is **immediately functional** with the current implementation. No setup required - just record a video and start adding sounds! 🚀
