import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(req : Request) {
    const keyWebhook = process.env.SUPABASE_WEBHOOK_KEY
    const keyApi = req.headers.get("api-key")
    if (keyApi === null) {
        return new Response('"API-Key" header is missing', {
            status: 401
        })
    } else if (keyApi !== keyWebhook) {
        return new Response("API Key is not valid", {
            status: 403
        })
    }
    console.log("test")
    revalidatePath('/[categorySlug]/[productSlug]')
    return NextResponse.json({
        "revalidated":true,
        "date":new Date().toISOString()
    })
}