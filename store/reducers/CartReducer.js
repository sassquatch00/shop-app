import CartItem from "../../models/CartItem"
import { ADD_TO_CART, CLEAR_CART, DELETE_FROM_CART } from "../actions/CartActions"
import { DELETE_PRODUCT } from "../actions/ProductActions"

const initialState = {
  items: {},
  totalAmount: 0,
}

export default CartReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product
      const productPrice = addedProduct.price
      const productTitle = addedProduct.title

      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1, 
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        )
        return { 
          ...state, 
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + productPrice
        }
      } else {
        const newCartItem = new CartItem(1, productPrice, productTitle, productPrice)
        return { 
          ...state, 
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice
        }
      }
    case DELETE_FROM_CART:
      const currentQuantity = state.items[action.productId].quantity
      const selectedCartItem = state.items[action.productId]
      let updatedCartItems
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1, 
          selectedCartItem.productPrice, 
          selectedCartItem.productTitle, 
          selectedCartItem.sum - selectedCartItem.productPrice)
        updatedCartItems = { ...state.items, [action.productId]: updatedCartItem }
      } else {
        updatedCartItems = {...state.items }
        delete updatedCartItems[action.productId]
      }
      return { ...state, items: updatedCartItems, totalAmount: state.totalAmount - selectedCartItem.productPrice}
    case CLEAR_CART:
      return initialState 
    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state
      } else {
        const updatedItems = {...state.items}
        const itemTotal = state.items[action.productId].sum
        console.log(itemTotal)
        delete updatedItems[action.productId]
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - itemTotal
        }
      }
  }
  return state
}