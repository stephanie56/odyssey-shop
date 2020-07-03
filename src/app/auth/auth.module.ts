import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, MatButtonModule],
})
export class AuthModule {}
