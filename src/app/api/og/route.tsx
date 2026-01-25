import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || 'My Aesthetic Core';
        const id = searchParams.get('id') || 'clean_girl';

        // In a real app, we would load the custom font here
        // const fontData = await fetch(new URL('../../assets/fonts/Inter-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer());

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #202020 0%, #000 100%)',
                        color: 'white',
                        fontFamily: 'serif',
                    }}
                >
                    {/* Background Element */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0.3,
                            display: 'flex',
                        }}
                    >
                        {/* We can't easily load local images in Edge runtime without converting to base64 or hosting them. 
                 For now, we use a CSS pattern or simple gradient as fallback if external image fails.
              */}
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #ff00cc 0%, #3333ff 100%)', opacity: 0.2 }} />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '20px',
                            padding: '40px 60px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            boxShadow: '0 0 50px rgba(255,255,255,0.1)',
                        }}
                    >
                        <div style={{ fontSize: 20, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 20, opacity: 0.7 }}>
                            My Aesthetic Core
                        </div>

                        <div style={{ fontSize: 70, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.1, background: 'linear-gradient(to right, #fff, #ffccff)', backgroundClip: 'text', color: 'transparent' }}>
                            {title}
                        </div>

                        <div style={{ marginTop: 30, display: 'flex', gap: '10px' }}>
                            <div style={{ padding: '8px 16px', borderRadius: '50px', border: '1px solid white', fontSize: 16 }}>
                                2026 Core
                            </div>
                            <div style={{ padding: '8px 16px', borderRadius: '50px', background: 'white', color: 'black', fontSize: 16 }}>
                                Find Yours
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
