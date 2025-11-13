import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;

// Initialize database table
export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS food_reviews (
        id VARCHAR(255) PRIMARY KEY,
        restaurant_name VARCHAR(255) NOT NULL,
        cuisine_type VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),

        address TEXT NOT NULL,
        lat DOUBLE PRECISION NOT NULL,
        lng DOUBLE PRECISION NOT NULL,

        visit_date TIMESTAMP NOT NULL,
        quick_notes TEXT,
        detailed_review TEXT,

        price_range INTEGER CHECK (price_range >= 1 AND price_range <= 4),
        dishes_ordered JSONB DEFAULT '[]',
        tags JSONB DEFAULT '[]',
        images JSONB DEFAULT '[]',

        is_favorite BOOLEAN DEFAULT FALSE,
        would_recommend BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_cuisine_type ON food_reviews(cuisine_type);
      CREATE INDEX IF NOT EXISTS idx_rating ON food_reviews(rating);
      CREATE INDEX IF NOT EXISTS idx_is_favorite ON food_reviews(is_favorite);
    `);
  } finally {
    client.release();
  }
}
