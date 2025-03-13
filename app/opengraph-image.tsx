import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Dang Phung';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/jpg';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="https://www.dangtphung.com/social/og-image.jpg"
          alt="Dang Phung"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
} 