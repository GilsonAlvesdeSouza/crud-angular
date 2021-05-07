import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidaCamposService} from '../../shared/components/campos/valida-campos.service';
import {FilmesService} from '../../core/filmes.service';
import {Filme} from '../../shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidaCamposService,
    private formBuilder: FormBuilder,
    private filmeService: FilmesService
  ) {
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
      notaImdb: [0, [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern((/^\d{1,1}|^\d{11}(\.\d+)?$/))]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]],
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção Científica', 'Comédia', 'Drama'];

  }

  salvar(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvarService(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvarService(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(() => {
        alert('SucessoObservable!');
      },
      () => {
        alert('Erro ao salvar!');
      });
  }
}

