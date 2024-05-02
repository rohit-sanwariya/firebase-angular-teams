import { NgModule } from '@angular/core';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field'
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button'
import {MatIconModule} from '@angular/material/icon'
import {MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input'
import {MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar'
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete'
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner'
const material=[
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule
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
