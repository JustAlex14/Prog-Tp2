import { FC, ReactNode, memo, useCallback } from "react";
import { clearCart, computeCartTotal, removeLine, updateLine, useCartStore } from "../hooks/use-cart";
import { Button, FormattedPrice, ProductCartLine } from "tp-kit/components";
import { createOrder } from "../actions/create-orders";


const Cart: FC = props => {
    const lines = useCartStore(state => state.lines);

    const handleCreateOrder = useCallback(async () => {
        await createOrder(useCartStore.getState());
        clearCart();
      }, []);

    
    return <section className="w-full space-y-8">
        {lines.map(cartline => (
            <ProductCartLine product={cartline.product} qty={cartline.qty} onDelete={() => removeLine(cartline.product.id)} onQtyChange={value => {updateLine({...cartline, qty: value})}}></ProductCartLine>
        ))}
        
        <div className="flex justify-between rounded-lg h-auto text-default overflow-hidden">
            <h1>Total:</h1>
            <FormattedPrice className="text-right" price={computeCartTotal(useCartStore((state => state.lines)))} />
        </div>
        <Button fullWidth onClick={handleCreateOrder}>Commander</Button>
        <Button variant={"outline"} onClick={() => clearCart()} fullWidth>Vider le panier</Button>
    </section>
};

export {Cart};