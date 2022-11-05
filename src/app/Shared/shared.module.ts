import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCustomErrorComponent } from './Components/mat-custom-error/mat-custom-error.component';
import { MaterialModule } from './material/material.module';
import { LogoComponent } from './Components/logo/logo.component';



@NgModule({
  declarations: [
    MatCustomErrorComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[LogoComponent]
})
export class SharedModule { }
