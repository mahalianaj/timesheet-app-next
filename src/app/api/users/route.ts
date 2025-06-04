
export async function GET(request: Request) {
    try {
        const res = await fetch(`${process.env.API_URL}${process.env.USERS_TABLE_ID}/records`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': process.env.API_TOKEN,
            }as HeadersInit,
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

    } catch(error){
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
}