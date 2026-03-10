import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #0A0A0F 0%, #111118 50%, #0A0A0F 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle orange gradient glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '15%',
            width: '70%',
            height: '60%',
            background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '10%',
            width: '50%',
            height: '40%',
            background: 'radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="90"
            height="90"
            viewBox="0 0 520 520"
            fill="none"
          >
            <path
              d="M467.79,236.84h-136.89c-2.51,0-4.55-2.04-4.55-4.55V80.84H37.65v202.32h151.45c2.51,0,4.55,2.04,4.55,4.55v151.45h288.71v-202.32h-14.57ZM381.4,424.6h-173.19v-146.9c0-5.03-4.08-9.1-9.1-9.1H52.21V95.4h173.19v146.9c0,5.03,4.08,9.1,9.1,9.1h146.9v173.19Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Main text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              textAlign: 'center',
              display: 'flex',
            }}
          >
            Free Strategy Call
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: '#8888A0',
              textAlign: 'center',
              marginTop: 8,
              display: 'flex',
            }}
          >
            30 minutes · No obligation · Custom growth plan
          </div>
        </div>

        {/* Bottom brand line */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 50,
              height: 1,
              background: 'rgba(249,115,22,0.4)',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase' as const,
              color: '#F97316',
              display: 'flex',
            }}
          >
            BLOK BLOK STUDIO
          </div>
          <div
            style={{
              width: 50,
              height: 1,
              background: 'rgba(249,115,22,0.4)',
              display: 'flex',
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
