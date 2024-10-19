// export async function POST(request: Request) {
//     const formData = await request.formData()
//     const name = formData.get('name')
//     const email = formData.get('email')
//     return Response.json({ name, email })
//   }

export async function POST(request: Request) {
    const res = await request.json()

    return Response.json({ res })
}