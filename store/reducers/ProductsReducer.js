import { PRODUCTS } from "../../data/dummy-data"
import Product from "../../models/Product"
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/ProductActions"

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
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString, 
        'u1', 
        action.productData.title, 
        action.productData.imageUrl, 
        action.productData.description, 
        action.productData.price)
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      }
    case UPDATE_PRODUCT:
      console.log(action.productData.title)
      const userProductIndex = state.userProducts.findIndex(prod => prod.id === action.productData.id)
      const productToUpdate = new Product(
        action.productData.id, 
        state.userProducts[userProductIndex].ownerId, 
        action.productData.title, 
        action.productData.imageUrl, 
        action.productData.description, 
        state.userProducts[userProductIndex].price)
      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[userProductIndex] = productToUpdate
      const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.productData.id)
      const updatedAvailableProducts = [...state.availableProducts]
      updatedAvailableProducts[availableProductIndex] = productToUpdate
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      }

  }
  return state
}