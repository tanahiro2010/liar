const adsTxtContent = `
google.com, pub-1267583009663745, DIRECT, f08c47fec0942fa0
`;

export async function GET() {
    return new Response(adsTxtContent, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}