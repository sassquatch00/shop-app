import { useDispatch } from "react-redux"
import Order from "../../models/Order"
import { clearCart } from "../actions/CartActions"
import { ADD_ORDER } from "../actions/OrderActions"

const initialState = {
  orders: [],
}

export default OrdersReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ORDER:
      const newOrder = new Order(new Date().toString(), action.orderData.items, action.orderData.totalAmount, new Date())
      return { ...state, orders: state.orders.concat(newOrder)}
  }
  return state
}