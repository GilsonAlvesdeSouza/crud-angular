import {Component, Input} from '@angular/core';
import {ValidaCamposService} from '../valida-campos.service';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {

  constructor(public validacao: ValidaCamposService) {
  }

  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() placeholder: string;

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
