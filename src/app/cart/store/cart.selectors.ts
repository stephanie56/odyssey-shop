import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from './cart.reducer';
import { CartState } from './cart.reducer';
import { CartItem } from 'src/app/shared/models/CartItem';

export const selectCartState = createFeatureSelector<fromCart.CartState>(fromCart.cartFeatureKey);

export const selectNumbersOfCartItems = createSelector(selectCartState, (state: CartState) => state.numberOfItems);

export const selectCartItems = createSelector(selectCartState, (state: CartState) => state.cartItems);

export const selectCartTotalPrice = createSelector(selectCartItems, (cartItems: CartItem[]) => {
  return cartItems.reduce((accu, curr) => {
    return accu + curr.total;
  }, 0);
});

export const selectIsEmptyCart = createSelector(selectNumbersOfCartItems, (numOfCartItems) => numOfCartItems === 0);
