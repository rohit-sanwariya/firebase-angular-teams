import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule } from '@angular/material/input'
import {MatCardModule } from '@angular/material/card'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
const material=[
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatAutocompleteModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...material
  ],
  exports:[
    ...material
  ]
})
export class MaterialModule { }
