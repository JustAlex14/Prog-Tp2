import { FC, ReactNode, memo, useCallback, useState } from "react";
import { clearCart, computeCartTotal, removeLine, updateLine, useCartStore } from "../hooks/use-cart";
import { Button, FormattedPrice, NoticeMessage, NoticeMessageData, ProductCartLine } from "tp-kit/components";
import { createOrder } from "../actions/create-orders";


const Cart: FC = props => {
    const lines = useCartStore(state => state.lines);
    const [noticeMessage, setNoticeMessage] = useState<NoticeMessageData[]>([]);

    const handleCreateOrder = useCallback(async () => {
        const output = await createOrder(useCartStore.getState());
        if (!output.success) {
            setNoticeMessage([{type: "error", message: "Vous n'êtes plus connecté"}]);
        }
        else
            clearCart();
      }, []);

    
    return <section className="w-full space-y-8">
        {noticeMessage.map((notice, i) => (
          <NoticeMessage key={i}{...notice}/>
        ))}
        {lines.map(cartline => (
            <ProductCartLine product={cartline.product} qty={cartline.qty} onDelete={() => removeLine(cartline.product.id)} onQtyChange={value => {updateLine({...cartline, qty: value})}} className = '' key={null}></ProductCartLine>
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