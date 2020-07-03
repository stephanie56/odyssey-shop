import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';

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

  loginStatusMessage$ = new BehaviorSubject('');
  accessToken$ = new BehaviorSubject('');

  constructor(private fb: FormBuilder, private apollo: Apollo) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.apollo
      .mutate({
        mutation: gql`
          mutation($email: String!, $password: String!) {
            loginUser(data: { email: $email, password: $password }) {
              accessToken
            }
          }
        `,
        variables: { email, password },
      })
      .subscribe((token) => {
        console.log('the access token is... ', token);
        // this.accessToken$.next(token);
        this.loginStatusMessage$.next('Sign in successfully');
      });
  }
}
