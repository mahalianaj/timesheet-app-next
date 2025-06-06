
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

    } catch(error: any){
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json(); 

    const res = await fetch(`${process.env.API_URL}${process.env.USERS_TABLE_ID}/records`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': process.env.API_TOKEN,
      } as HeadersInit,
      body: JSON.stringify(body), 
    });

    if (!res.ok) {
      const error = await res.json();
      return new Response(JSON.stringify({ error }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


