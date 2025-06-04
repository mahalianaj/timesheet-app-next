export async function POST(request: Request) {
    try {
        const body = await request.json();
        //const {taskDescription, hours, date, project} = body; 
    
        const res = await fetch(`${process.env.API_URL}${process.env.ENTRIES_TABLE_ID}/records`,  {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'xc-token': process.env.API_TOKEN,
            } as HeadersInit,
            body: JSON.stringify(body),
        });
        
        if (!res.ok) {
            const error = await res.json();
            console.log('NocoDB API Error:', error);
            return new Response(JSON.stringify({error}), {status: 500});
        }
    
        const data = await res.json();
        return new Response(JSON.stringify({success: true, data}), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const res = await fetch(`${process.env.API_URL}${process.env.ENTRIES_TABLE_ID}/records`, {
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
}

