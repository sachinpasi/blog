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
                    background: '#0a0a0a',
                    color: 'white',
                    fontFamily: 'monospace',
                    letterSpacing: '-2px',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 40,
                        left: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        opacity: 0.5,
                    }}
                >
                    <div style={{ fontSize: 24 }}>/</div>
                    <div style={{ fontSize: 24, letterSpacing: 0 }}>sachinpasi.com</div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 16,
                    }}
                >
                    <div style={{ fontSize: 80, fontWeight: 700 }}>Sachin Pasi</div>
                    <div style={{ fontSize: 32, opacity: 0.7, letterSpacing: 0, marginTop: 10 }}>Software Engineer</div>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        right: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        opacity: 0.5,
                        fontSize: 20,
                        letterSpacing: 0,
                    }}
                >
                    <div>Writing</div>
                    <div>•</div>
                    <div>Systems</div>
                    <div>•</div>
                    <div>Code</div>
                </div>
            </div>
        ),
        { ...size }
    )
}
