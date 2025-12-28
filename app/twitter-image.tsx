import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const contentType = 'image/png'
export const size = {
    width: 1200,
    height: 630,
}

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    background: '#ffffff',
                    color: 'black',
                    fontFamily: 'monospace',
                    letterSpacing: '-2px',
                }}
            >
                <div style={{ fontSize: 64, fontWeight: 700 }}>Sachin Pasi</div>
                <div style={{ fontSize: 24, opacity: 0.5, marginTop: 16, letterSpacing: 0 }}>@sachinpasi</div>
            </div>
        ),
        { ...size }
    )
}
