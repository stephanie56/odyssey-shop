import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CUSTOMER = 'customer',
  GUEST = 'guest',
}

export interface AuthState {
  accessToken: string;
  userId: number;
  role: UserRole;
  userName: string;
  email: string;
}

export const initialState: AuthState = {
  accessToken: '',
  userId: null,
  role: UserRole.GUEST,
  userName: '',
  email: '',
};

const authReducer = createReducer(
  initialState,

  on(AuthActions.loginUserSuccess, (state, { user }) => ({
    ...state,
    ...user,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
