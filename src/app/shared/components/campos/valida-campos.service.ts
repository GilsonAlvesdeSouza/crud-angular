import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidaCamposService {

  constructor() {
  }

  hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  hasErrorValidation(control: AbstractControl, errorName): boolean {
    if ((control.dirty || control.touched ) && this.hasError(control, errorName)) {
      return true;
    }
    return false;
  }

  lengthValidar(control: AbstractControl, errorName: string): number {
    const error = control.errors[errorName];
    return error.requiredLength || error.min || error.max || 0;
  }
}
