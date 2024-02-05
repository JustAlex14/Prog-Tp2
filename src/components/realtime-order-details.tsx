"use client"

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import {ReactNode, useEffect, useState} from "react"
import {OrderData} from "tp-kit/types";
import {OrderDetailsLayout} from "tp-kit/components/orders";

export default function RealTimeOrderDetails({order}: { order: OrderData }) {

    const supabase = createClientComponentClient()
    const [current, setCurrent] = useState(order)

    useEffect(() => {
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'Order',
                    filter: 'id=eq.' + order.id,
                },
                (payload) => {
                    if (!payload.errors) {
                        setCurrent((previous: OrderData) => ({
                            ...previous,
                            ...payload.new,
                        }))
                    }
                }
            ).subscribe()

        return () => {
            supabase.removeChannel(channel);
        }
    }, [])

    return <OrderDetailsLayout order={current}/>
}