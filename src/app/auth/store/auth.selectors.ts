import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { AuthState } from './auth.reducer';

export const selectCartState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authFeatureKey);

export const selectAccessToken = createSelector(selectCartState, (state: AuthState) => state.accessToken);

export const selectUserId = createSelector(selectCartState, (state: AuthState) => state.userId);

export const selectUserName = createSelector(selectCartState, (state: AuthState) => state.userName);

export const selectUserEmail = createSelector(selectCartState, (state: AuthState) => state.email);

export const selectUserRole = createSelector(selectCartState, (state: AuthState) => state.role);
