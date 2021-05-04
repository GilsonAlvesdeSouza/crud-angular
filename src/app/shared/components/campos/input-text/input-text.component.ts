import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {ValidaCamposService} from '../valida-campos.service';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {

  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() placeholder: string;

  constructor(public validacao: ValidaCamposService) { }


  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
