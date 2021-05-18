import { PRODUCTS } from "../../data/dummy-data"
import { DELETE_PRODUCT } from "../actions/ProductActions"

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
}

export default ProductsReducer = (state = initialState, action) => {
  switch(action.type) {
    case DELETE_PRODUCT:
      return { 
        ...state, 
        userProducts: state.userProducts.filter(product => product.id !== action.productId),
        availableProducts: state.availableProducts.filter(product => product.id !== action.productId)
      }
  }
  return state
}