import { FC, ReactNode, memo } from "react";
import { computeCartTotal, removeLine, updateLine, useCartStore } from "../hooks/use-cart";
import { Button, FormattedPrice, ProductCartLine } from "tp-kit/components";


const CartCounter: FC = props => {
    const lines = useCartStore(state => state.lines);
    return <h1>
        {lines.length}
    </h1>
};

export {CartCounter};