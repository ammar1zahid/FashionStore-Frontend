import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  _id: string;
  title: string;
  desc: string;
  img: string;
  categories?: string[];
  size?: string[];
  color?: string[];
  price: number;
  inventory: number;
  inStock: boolean;
}

interface WishlistState {
  products: IProduct[];
  quantity: number; 
}

const initialState: WishlistState = {
  products: [],
  quantity: 0, // Initial wishlist quantity is 0
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Action to add product to wishlist
    addProductToWishlist: (state, action: PayloadAction<IProduct>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const products = JSON.parse(JSON.stringify(state.products));

      const isProductInWishlist = state.products.some(
        (product) => product._id === action.payload._id
      );
      if (!isProductInWishlist) {
   
        state.products.push(action.payload);
     
        state.quantity += 1;
      }
    },
    // Action to remove product from wishlist

// Action to remove product from wishlist
removeProductFromWishlist: (state, action: PayloadAction<string>) => {
  const productId = action.payload;



  // Convert the products array to a plain array for better debugging
  const products = JSON.parse(JSON.stringify(state.products));


  // Find the index of the product to remove by matching `productId`
  const index = products.findIndex((product: { productId: string; }) => product.productId === productId);


  // Only proceed with removal if the product is found in the array
  if (index !== -1) {
    state.products.splice(index, 1); // Remove the product by index
    state.quantity -= 1; // Adjust the quantity

   
  } else {
    console.log("Product not found in wishlist.");
  }

  // Log the final state for verification
  console.log("Final state of wishlist:", JSON.parse(JSON.stringify(state)));
},




    // Action to set wishlist (useful when fetching from backend)
    setWishlist: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
      state.quantity = action.payload.length;
    },
    // Clear the wishlist
    clearWishlist: (state) => {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const {
  addProductToWishlist,
  removeProductFromWishlist,
  setWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
