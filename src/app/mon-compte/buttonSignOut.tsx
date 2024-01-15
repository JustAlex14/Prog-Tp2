"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { redirect, useRouter } from "next/navigation";
import { FC, ReactNode, memo } from "react";
import { Button } from "tp-kit/components";


const ButtonSignOut: FC = memo(function() {
    const router = useRouter()
    const supaClient = createClientComponentClient();
    const clientSignOut = async() => {
        console.log("tesd")
        await supaClient.auth.signOut();
        router.refresh();
    }

    return (
        <Button variant="outline" fullWidth="true" className="mt-10" onClick={clientSignOut}>Se déconnecter</Button>
    )
})

export {ButtonSignOut};