import { FC, ReactNode, memo } from "react";
import { clearCart, computeCartTotal, removeLine, updateLine, useCartStore } from "../hooks/use-cart";
import { Button, FormattedPrice, ProductCartLine } from "tp-kit/components";


const Cart: FC = props => {
    const lines = useCartStore(state => state.lines);
    return <section className="w-full lg:w-1/3 space-y-8">
        {lines.map(cartline => (
            <ProductCartLine product={cartline.product} qty={cartline.qty} onDelete={() => removeLine(cartline.product.id)} onQtyChange={value => {updateLine({...cartline, qty: value})}}></ProductCartLine>
        ))}
        
        <div className="flex justify-between rounded-lg h-auto text-default overflow-hidden">
            <h1>Total:</h1>
            <FormattedPrice className="text-right" price={computeCartTotal(useCartStore((state => state.lines)))} />
        </div>
        <Button fullWidth>Commander</Button>
        <Button variant={"outline"} onClick={() => clearCart()} fullWidth>Vider le panier</Button>
    </section>
};

export {Cart};