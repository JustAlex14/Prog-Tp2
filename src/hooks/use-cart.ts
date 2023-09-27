import { create } from 'zustand'
import { CartData, ProductLineData } from '../types'
import {ProductData, ProductsCategoryData} from "tp-kit/types"



export const useCartStore = create<CartData>(() => ({lines: []}))


/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
export function addLine(product: ProductData) {
    useCartStore.setState((state) => {
        const productLineData : ProductLineData = {
            product: product,
            qty: 1
        }

        const lineId = state.lines.findIndex(cartLine => cartLine.product.id === product.id)

        if (lineId!=-1) 
        state.lines[lineId].qty += 1
        else
            state.lines.push(productLineData)

        
        console.log(state.lines)
        return {lines: [...state.lines]}
    })
}

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
    useCartStore.setState((state) => {
        const lineId = state.lines.findIndex(cartLine => cartLine.product.id === line.product.id)

        /*
        if (line.qty==0) 
            state.lines.splice(lineId, 1)
        else 
        */
        state.lines[lineId] = line

        return {lines: [...state.lines]}
    })
}

/**
 * Supprime la ligne produit du panier 
 * 
 * @param productId 
 * @returns 
 */
export function removeLine(productId: number) {
    useCartStore.setState((state) => {
        const lineId = state.lines.findIndex(cartLine => {cartLine.product.id === productId})

        state.lines.splice(lineId, 1)
        return {lines: [...state.lines]}
    })
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useCartStore.setState((state) => {
        state.lines = []
        return {lines: [...state.lines]}
    })
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number { return line.product.price * line.qty}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    let total = 0
    lines.map(cartLine => {total += cartLine.product.price * cartLine.qty})
    return total
}