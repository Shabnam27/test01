import axios from "axios";
import { create } from "zustand";

export const GetProductsStore = create((set, get) => ({
    products: [],
    loading: false,
    getProducts: async () => {
        if(get().loading) {
            return
        }
        try{
            set({loading: true})
            const res = await axios.get('https://edab3eb64d83cd20.mokky.dev/products');
            const data = res.data;
            set({products: data});
            set({loading: false});
        }catch(e){
            console.error(e);
            set({loading: false})
        }
    }
}))

export const resultFilter = create((set, get) => ({
    filterItem: [],
    stateFilter: false,
    getResultFilter: (data) => {
        set({ filterItem: data })
        set({ stateFilter: true })
    }
}))