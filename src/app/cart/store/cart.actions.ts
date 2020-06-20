import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/shared/models/CartItem';

export const removeFromCart = createAction('[Cart] Remove From Cart', props<{ id: string; quantity: number }>());
export const addToCart = createAction('[Cart] Add To Cart', props<{ item: CartItem }>());
export const clearCart = createAction('[Cart] Clear Cart');
