import { FC, ReactNode, memo } from "react";
import { computeCartTotal, removeLine, updateLine, useCartStore } from "../hooks/use-cart";
import { Button, FormattedPrice, ProductCartLine } from "tp-kit/components";

const CartCounter: FC = props => {
    const count = useCartStore(state => state.count);
    return <h1>
        {count}
    </h1>
};

export {CartCounter};