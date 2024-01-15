"use server";

import { Success } from "tp-kit/components/notice-message.stories";
import { computeCartTotal, computeLineSubTotal } from "../hooks/use-cart";
import { CartData } from "../types";
import prisma from "../utils/prisma";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export interface createOrderResponse {
  error: string | null,
  success: boolean
}

export async function createOrder(cart: CartData) : Promise<createOrderResponse> {
  const supabase = createServerComponentClient({ cookies });
  const {data} = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) {
    return {error : "User not logged in", success: false}
  }
  
  console.log(
      await prisma.order.create({
        data: {
          userId: userId,
          total: computeCartTotal(cart.lines),
          lines: {
            create: cart.lines.map((line) => ({
              productId: line.product.id,
              qty: line.qty,
              subtotal: computeLineSubTotal(line),
            })),
          },
        },
      })
  );
  return {error : "User not logged in", success: true }
}