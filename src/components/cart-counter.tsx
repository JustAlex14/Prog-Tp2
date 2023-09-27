import { FC, ReactNode, memo } from "react";
import { computeCartTotal, removeLine, updateLine, useCartStore } from "../hooks/use-cart";
import { Button, FormattedPrice, ProductCartLine } from "tp-kit/components";

const CartCounter: FC = props => {
    const count = useCartStore(state => state.count);
    return (
        <div className="aspect-square bg-brand text-white text-center text-xs absolute right-0 top-0 rounded-full flex items-center justify-center h-[20px] w-[20px]">  
                <div>{count}</div>
        </div>
    )
}

export {CartCounter};