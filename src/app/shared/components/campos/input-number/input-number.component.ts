import {Component, Input} from '@angular/core';
import {ValidaCamposService} from '../valida-campos.service';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {

  constructor(public validacao: ValidaCamposService) { }

  @Input() formGroup: FormGroup;
  @Input() min = 0;
  @Input() max: number;
  @Input() step = 1;
  @Input() placeholder: string;
  @Input() controlName: string;

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
