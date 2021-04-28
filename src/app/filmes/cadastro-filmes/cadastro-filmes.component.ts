import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  get cadastroControls() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.cadastro = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dataLancamento: ['', [Validators.required]],
      descricao: ['', []],
      notaImdb: [0, [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern((/^-?(0|[1-9]\d*)?$/))]],
      urlImdb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]],
    });

  }

  salvar(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    alert('Sucesso!\n' + JSON.stringify(this.cadastro.value, null, 2));
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

}
