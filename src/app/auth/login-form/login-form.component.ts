import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState, UserRole } from '../store/auth.reducer';
import { loginUserSuccess } from '../store/auth.actions';

export interface UserAuthInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginUserSuccessPayload {
  accessToken: string;
  user: UserAuthInfo;
}

@Component({
  selector: 'os-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  //   mutation{
  //   loginUser(input: {
  //     email:"stephanie.zeng+10@rangle.io"
  //     password:"1234"
  //   }) {
  // user {
  //   firstName
  //   lastName
  //   role
  // }
  //     accessToken
  //   }
  // }

  loginStatusMessage$ = new BehaviorSubject('');
  accessToken$ = new BehaviorSubject('');

  constructor(private fb: FormBuilder, private apollo: Apollo, private store: Store<AuthState>) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.apollo
      .mutate({
        mutation: gql`
          mutation($email: String!, $password: String!) {
            loginUser(input: { email: $email, password: $password }) {
              user {
                id
                name
                email
                role
              }
              accessToken
            }
          }
        `,
        variables: { email, password },
      })
      .subscribe((res: any) => {
        console.log('the access token is... ', res);
        const { user, accessToken } = res.data.loginUser as LoginUserSuccessPayload;
        const updatedUserPayload = {
          accessToken,
          userId: user.id,
          role: user.role,
          userName: user.name,
          email: user.email,
        };

        this.store.dispatch(loginUserSuccess({ user: updatedUserPayload }));

        // this.accessToken$.next(token);
        this.loginStatusMessage$.next('Sign in successfully');
      });
  }

  // onSubmit() {
  //   const { email, password } = this.loginForm.value;
  //   this.apollo
  //     .mutate({
  //       mutation: gql`
  //         mutation($email: String!, $password: String!) {
  //           loginUser(data: { email: $email, password: $password }) {
  //             accessToken
  //           }
  //         }
  //       `,
  //       variables: { email, password },
  //     })
  //     .subscribe((token) => {
  //       console.log('the access token is... ', token);
  //       // this.accessToken$.next(token);
  //       this.loginStatusMessage$.next('Sign in successfully');
  //     });
  // }
}
