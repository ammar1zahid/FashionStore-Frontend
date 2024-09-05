import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IProduct {
    _id:string;
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    size?: string[];
    color?: string[];
    price: number;
     inventory:number;
     inStock:boolean;
  }


  interface ICartItem {
    product: IProduct;
    quantity: number;
    color:string;
    size:string;
  }
  

interface CartState {
  products: ICartItem[];
  quantity: number;
  total: number;
}

const initialState: CartState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ICartItem>) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.product.price * action.payload.quantity;
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.products[index].quantity += 1;
      state.total += state.products[index].product.price;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.products[index].quantity > 1) {
        state.products[index].quantity -= 1;
        state.total -= state.products[index].product.price;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.total -= state.products[index].product.price * state.products[index].quantity;
      state.quantity -= 1;
      state.products.splice(index, 1);
    },
  },
});

export const { addProduct , increaseQuantity, decreaseQuantity,removeProduct} = cartSlice.actions;
export default cartSlice.reducer;
