import {Component, Input} from '@angular/core';
import {ValidaCamposService} from '../valida-campos.service';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {

  constructor(public validacao: ValidaCamposService) { }

  @Input() formGroup: FormGroup;
  @Input() placeholder: string;
  @Input() controlName: string;
  @Input() opcoes: Array<string>;

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
