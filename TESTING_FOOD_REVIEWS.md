# Testing Guide: Food Reviews Feature

## Overview
This guide helps you test the improved restaurant search and review functionality.

## Setup

### Option 1: With Google Places API (Recommended)
1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Enable the "Places API"
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

### Option 2: Without Google API (Free)
- The app will automatically use OpenStreetMap (no setup needed)
- Works out of the box, but with less comprehensive restaurant data

## Testing Checklist

### Restaurant Search Functionality

#### Basic Search
- [ ] Type 2 characters in search field - results should appear
- [ ] Search for "pizza" - should show pizza restaurants
- [ ] Search for a specific restaurant name (e.g., "McDonald's")
- [ ] Verify search results show:
  - Restaurant name
  - Full address
  - Rating (if Google API is enabled)
  - Source badge (Google Maps or OpenStreetMap)

#### Nearby Search (Mobile & Desktop)
- [ ] Click the location pin button next to search
- [ ] Grant location permission when prompted
- [ ] Verify nearby restaurants appear in search results
- [ ] Check that results are geographically relevant

#### Search Result Selection
- [ ] Click on a search result
- [ ] Verify auto-fill of:
  - Restaurant name
  - Full address
  - Latitude and longitude
  - Cuisine type (if detected)

### Mobile-Specific Features

#### Quick Cuisine Selection
- [ ] Open on mobile device or narrow browser window
- [ ] Verify cuisine buttons are visible below input
- [ ] Tap a cuisine button (e.g., "Italian")
- [ ] Confirm cuisine field is updated

#### Easy Rating Selection
- [ ] On mobile, verify number buttons (1-5) appear
- [ ] Tap a number button
- [ ] Confirm rating updates both in stars and button highlight

#### Touch Targets
- [ ] Test all buttons are easy to tap on mobile
- [ ] Verify no accidental taps on nearby elements
- [ ] Check form is usable with thumbs

### Desktop Features

#### Keyboard Shortcuts
- [ ] Press `Cmd/Ctrl + K` - search field should focus
- [ ] Type search query and select result
- [ ] Press `Cmd/Ctrl + Enter` - form should submit
- [ ] Verify shortcut hints are visible in form header

#### Mouse Interactions
- [ ] Hover over search results - should highlight
- [ ] Click outside search dropdown - should close
- [ ] Test all buttons have hover effects

### Form Validation

#### Required Fields
- [ ] Try to submit without restaurant name - should show error
- [ ] Try to submit without cuisine type - should show error
- [ ] Try to submit without rating - should show error
- [ ] Try to submit without address - should show error

#### Auto-Complete Features
- [ ] Search and select restaurant - all fields should fill
- [ ] Click map pin button for coordinates - should auto-fill lat/lng
- [ ] Verify map preview updates when coordinates change

### Integration Testing

#### Quick Mode
- [ ] Select "Quick" mode
- [ ] Fill only required fields
- [ ] Submit successfully

#### Detailed Mode
- [ ] Select "Detailed" mode
- [ ] Add dishes, tags, images
- [ ] Submit with all optional fields

#### Edit Review
- [ ] Open existing review for editing
- [ ] Modify search/fields
- [ ] Save changes
- [ ] Verify updates persist

## Expected Behavior

### With Google Places API
- Search results include major restaurant chains
- Restaurant ratings visible
- More accurate addresses
- Better coverage for international restaurants
- Badge shows "🗺️ Google Maps"

### Without Google API (OpenStreetMap)
- Search results from OpenStreetMap
- May have less comprehensive restaurant data
- Still fully functional
- Badge shows "🌍 OpenStreetMap"
- Automatic fallback if Google API fails

## Common Issues

### "No restaurants found"
- **Cause**: Search term too specific or location not in database
- **Solution**: Try broader search terms or different location

### Location permission denied
- **Cause**: Browser blocked location access
- **Solution**: Check browser settings, grant location permission

### Google API not working
- **Check**: Environment variable is set correctly
- **Check**: Places API is enabled in Google Cloud Console
- **Check**: API key has no restrictions blocking localhost

### Slow search results
- **Normal**: First search may be slower while API warms up
- **Check**: Network connection
- **Try**: Refreshing the page

## Performance Benchmarks

- **Search Response Time**: < 500ms (typical)
- **Debounce Delay**: 300ms (prevents excessive API calls)
- **Results Displayed**: Up to 10 restaurants
- **Minimum Search Length**: 2 characters

## Accessibility Testing

- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader
- [ ] Verify proper focus indicators
- [ ] Check color contrast ratios
- [ ] Test with browser zoom at 200%

## Browser Compatibility

### Tested Browsers
- [ ] Chrome/Edge (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Required Features
- Geolocation API (for nearby search)
- Fetch API (for search requests)
- ES6+ JavaScript support
- CSS Grid and Flexbox

## Reporting Issues

When reporting issues, please include:
1. Browser and version
2. Device type (mobile/desktop)
3. Whether using Google API or OpenStreetMap
4. Steps to reproduce
5. Expected vs actual behavior
6. Screenshots if applicable
