import {createSlice}  from "@reduxjs/toolkit";
const cartSlice= createSlice({
    name: "cart",
    initialState: {
        items:[],
        totalQuantity: 0,
    },
    reducers:{
        addItemsToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    quantity:1,
                    price: newItem.price,
                    totalPrice: newItem.price,

                });
            } else{
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (!existingItem) {
                state.items = state.items.filter(item => item.id !== id);
               // state.items.splice(id, 1);
            }else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});
export const cartActions = cartSlice.actions;
export default cartSlice;
