"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import {ProductCartLine} from "tp-kit/components/products";
import {FormattedPrice} from "tp-kit/components/data-display";
import { addLine, computeCartTotal, removeLine, updateLine, useCartStore } from "../../hooks/use-cart";
import { ProductLineData } from "../../types";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
    const lines = useCartStore(state => state.lines);

    
    return (
        <SectionContainer
            className="py-36"
            wrapperClassName="flex flex-col lg:flex-row gap-24"
        >
            {/* Produits */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                {products.map((product) => (
                    <ProductCardLayout
                        key={product.id}
                        product={product}
                        button={<Button variant={"ghost"} onClick={() => {addLine(product)}} fullWidth>Ajouter au panier</Button>}
                    />
                ))}
            </section>
            {/* /Produits */}
            {/* Panier */}
            <section className="w-full lg:w-1/3 space-y-8">
                {lines.map(cartline => (
                    <ProductCartLine product={cartline.product} qty={cartline.qty} onDelete={() => removeLine(cartline.product.id)} onQtyChange={value => {updateLine({...cartline, qty: value})}}></ProductCartLine>
                ))}
                
                <div className="flex justify-between rounded-lg h-auto text-default overflow-hidden">
                    <h1>Total:</h1>
                    <FormattedPrice className="text-right" price={computeCartTotal(useCartStore((state => state.lines)))} />
                </div>
                <Button fullWidth>Commander</Button>
                <Button variant={"outline"} fullWidth>Vider le panier</Button>
            </section>
            {/* /Panier */}
        </SectionContainer>
    );
}