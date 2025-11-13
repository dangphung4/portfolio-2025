import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

function checkAuth(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  return password === process.env.ADMIN_PASSWORD;
}

// PUT - Update review (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id } = params;

    await pool.query(`
      UPDATE food_reviews SET
        restaurant_name = $1,
        cuisine_type = $2,
        rating = $3,
        address = $4,
        lat = $5,
        lng = $6,
        visit_date = $7,
        quick_notes = $8,
        detailed_review = $9,
        price_range = $10,
        dishes_ordered = $11,
        tags = $12,
        images = $13,
        is_favorite = $14,
        would_recommend = $15,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $16
    `, [
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
      id,
    ]);

    return NextResponse.json({ id, ...body });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// DELETE - Delete review (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    await pool.query('DELETE FROM food_reviews WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
