import { AbstractControl,  ValidationErrors, ValidatorFn } from "@angular/forms";


export function EqualityPassword(password:AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value !== password.value ? {passwordNotEqual: {value: control.value}} : null;
  };
}
