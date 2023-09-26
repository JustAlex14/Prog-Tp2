import { create } from 'zustand'
import { CartData, ProductLineData } from '../types'

const productStore = create((set) => ({
    products: CartData,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))