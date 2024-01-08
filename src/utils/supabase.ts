import { SupabaseClient, User } from "@supabase/supabase-js";



export async function getUser(client: SupabaseClient) : Promise<User | null> {
    return (await client.auth.getSession())?.data?.session?.user ?? null;
}