export async function GET() {
    try {
        const res = await fetch(`${process.env.API_URL}${process.env.OFF_DAYS_TABLE_ID}/records`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': process.env.API_TOKEN,
            } as HeadersInit,
    
        });
    
        if (!res.ok) {
           const errorData = await res.json();
            return new Response(JSON.stringify({ error: errorData }), { status: res.status });
        }
    
        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });

    } catch (e: unknown) {
      const error = e as Error;
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}