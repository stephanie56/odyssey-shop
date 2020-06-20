import { Action, createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartItem } from 'src/app/shared/models/CartItem';

export const cartFeatureKey = 'cart';

export interface CartState {
  cartItems: CartItem[];
  numberOfItems: number;
}

export const initialState: CartState = {
  cartItems: [],
  numberOfItems: 0,
};

const cartReducer = createReducer(
  initialState,

  on(CartActions.addToCart, (state, { item }) => {
    const hasDuplicateCartItem = !!state.cartItems.find((cartItem) => cartItem.product.id === item.product.id);

    if (state.cartItems.length === 0 || !hasDuplicateCartItem) {
      return {
        ...state,
        numberOfItems: state.numberOfItems + item.quantity,
        cartItems: state.cartItems.concat(item),
      };
    }

    const updatedCartItems = state.cartItems.reduce((accu, currCartItem) => {
      if (currCartItem.product.id === item.product.id) {
        const updatedItem = {
          ...currCartItem,
          quantity: item.quantity + currCartItem.quantity,
          total: item.total + currCartItem.total,
        };
        return accu.concat(updatedItem);
      } else {
        return accu.concat(currCartItem);
      }
    }, []);

    return {
      ...state,
      numberOfItems: state.numberOfItems + item.quantity,
      cartItems: updatedCartItems,
    };
  }),

  on(CartActions.removeFromCart, (state, { id, quantity }) => ({
    ...state,
    numberOfItems: state.numberOfItems - quantity,
    cartItems: state.cartItems.filter((item) => item.product.id !== id),
  })),

  on(CartActions.clearCart, (state) => ({
    ...initialState,
  }))
);

export function reducer(state: CartState | undefined, action: Action) {
  return cartReducer(state, action);
}
