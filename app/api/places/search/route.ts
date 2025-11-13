import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // If Google API key is available, use Google Places API
  if (googleApiKey) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=restaurant&key=${googleApiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'OK') {
        const results = data.results.slice(0, 10).map((place: {
          place_id: string;
          name: string;
          formatted_address: string;
          geometry: { location: { lat: number; lng: number } };
          types: string[];
          rating?: number;
          user_ratings_total?: number;
        }) => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          types: place.types,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          source: 'google' as const
        }));
        
        return NextResponse.json({ results });
      }
    } catch (error) {
      console.error('Error with Google Places API:', error);
      // Fall through to OpenStreetMap if Google fails
    }
  }
  
  // Fallback to OpenStreetMap Nominatim
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query + ' restaurant'
      )}&limit=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Portfolio-Food-Reviews/1.0',
        },
      }
    );
    const data = await response.json();
    
    const results = data.map((place: {
      place_id: string;
      name?: string;
      display_name: string;
      lat: string;
      lon: string;
      type?: string;
    }) => ({
      id: place.place_id,
      name: place.name || place.display_name.split(',')[0],
      address: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      types: place.type ? [place.type] : [],
      source: 'openstreetmap' as const
    }));
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error with OpenStreetMap:', error);
    return NextResponse.json({ error: 'Failed to search for places' }, { status: 500 });
  }
}
