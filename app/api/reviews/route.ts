import { NextRequest, NextResponse } from 'next/server';
import pool, { initializeDatabase } from '@/lib/db';

// Helper to check password
function checkAuth(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  return password === process.env.ADMIN_PASSWORD;
}

// GET - Fetch all reviews (public)
export async function GET() {
  try {
    await initializeDatabase();

    const result = await pool.query(`
      SELECT * FROM food_reviews
      ORDER BY created_at DESC
    `);

    const reviews = result.rows.map(row => ({
      id: row.id,
      restaurantName: row.restaurant_name,
      cuisineType: row.cuisine_type,
      rating: row.rating,
      location: {
        address: row.address,
        lat: row.lat,
        lng: row.lng,
      },
      visitDate: row.visit_date,
      quickNotes: row.quick_notes,
      detailedReview: row.detailed_review,
      priceRange: row.price_range,
      dishesOrdered: row.dishes_ordered,
      tags: row.tags,
      images: row.images,
      isFavorite: row.is_favorite,
      wouldRecommend: row.would_recommend,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST - Create review (protected)
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = `review-${Date.now()}`;

    await pool.query(`
      INSERT INTO food_reviews (
        id, restaurant_name, cuisine_type, rating,
        address, lat, lng,
        visit_date, quick_notes, detailed_review,
        price_range, dishes_ordered, tags, images,
        is_favorite, would_recommend
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    `, [
      id,
      body.restaurantName,
      body.cuisineType,
      body.rating,
      body.location.address,
      body.location.lat,
      body.location.lng,
      body.visitDate,
      body.quickNotes || null,
      body.detailedReview || null,
      body.priceRange || null,
      JSON.stringify(body.dishesOrdered || []),
      JSON.stringify(body.tags || []),
      JSON.stringify(body.images || []),
      body.isFavorite || false,
      body.wouldRecommend || false,
    ]);

    return NextResponse.json({ id, ...body }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
