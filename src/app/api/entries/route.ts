
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
    } catch (error:any) {
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

    } catch(error: any){
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const entriesToDelete = Array.isArray(body) ? body : [body];

    const results = await Promise.all(
      entriesToDelete.map(async (entry) => {
        if (!entry.Id) {
          return { ok: false, error: 'Missing Id in entry' };
        }

        const res = await fetch(`${process.env.API_URL}${process.env.ENTRIES_TABLE_ID}/records`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'xc-token': process.env.API_TOKEN!,
          },
          body: JSON.stringify({ Id: entry.Id }),
        });

        const json = await res.json();
        return res.ok ? { ok: true, data: json } : { ok: false, error: json };
      })
    );

    const failed = results.filter((r) => !r.ok);
    if (failed.length > 0) {
      return new Response(JSON.stringify({ error: 'Some deletions failed', details: failed }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, deleted: results.length }), {
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.Id) {
      return new Response(JSON.stringify({ error: 'Missing Id for PATCH' }), { status: 400 });
    }

    // 🔴 Exclure les champs non modifiables
    const { Id, date, taskDescription, taskType, project, hours } = body;

    const payload = {
      Id, // requis pour PATCH
      ...(date && { date }),
      ...(taskDescription && { taskDescription }),
      ...(taskType && { taskType }),
      ...(project && { project }),
      ...(hours && { hours }),
    };

    const res = await fetch(`${process.env.API_URL}${process.env.ENTRIES_TABLE_ID}/records`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'xc-token': process.env.API_TOKEN!,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('NocoDB PATCH error:', error);
      return new Response(JSON.stringify({ error }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (err: any) {
    console.error('PATCH handler error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}



// export async function PATCH(req: Request) {
//   try {
//     const body = await req.json(); 
//     const { Id, date, taskDescription, taskType, project, hours } = body;
//     if (!body.Id) {
//   return new Response(JSON.stringify({ error: 'Missing Id for PATCH' }), { status: 400 });
// }

//     const res = await fetch(`${process.env.API_URL}${process.env.ENTRIES_TABLE_ID}/records`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'xc-token': process.env.API_TOKEN,
//       } as HeadersInit,
//       body: JSON.stringify({
//         Id, date, taskDescription, taskType, project, hours
//       }), 
//     });

//     if (!res.ok) {
//       const error = await res.json();
//       return new Response(JSON.stringify({ error }), { status: res.status });
//     }

//     const data = await res.json();
//     return new Response(JSON.stringify(data), { status: 200 });

//   } catch (err: any) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }

