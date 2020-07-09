import { createAction, props } from '@ngrx/store';

export const loginUserSuccess = createAction('[Auth] Login User Success', props<{ user: any }>());
