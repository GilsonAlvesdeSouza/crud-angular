import {Component, Input} from '@angular/core';
import {ValidaCamposService} from '../valida-campos.service';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'dio-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent {

  constructor(public validacao: ValidaCamposService) { }

  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() placeholder: string;

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
