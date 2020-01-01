import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  exports: [DropdownComponent]
})
export class DropdownModule {}
