import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      const addedItem = action.payload;
      console.log(addedItem.totalPrice);
      const existingItem = state.items.find((item) => item.id === addedItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items = [...state.items, addedItem];
        console.log(state.items);
      }

      console.log(addedItem.totalPrice);
    },
    removeFromBasket: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find(
        (basketItem) => basketItem.id === id
      );
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotalPrice = (state) =>
  state.basket.items.reduce((total, item) => total + item.totalPrice, 0);
export const selectTotalItems = (state) =>
  state.basket.items.reduce((total, item) => total + item.quantity, 0);

export default basketSlice.reducer;
