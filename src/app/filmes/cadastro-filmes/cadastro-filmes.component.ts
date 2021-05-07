import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {ValidaCamposService} from '../../shared/components/campos/valida-campos.service';
import {FilmesService} from '../../core/filmes.service';
import {Filme} from '../../shared/models/filme';
import {AlertaComponent} from '../../shared/components/alerta/alerta.component';
import {Alerta} from '../../shared/models/alerta';

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
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private filmeService: FilmesService,
    private router: Router
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
        const config = {
          data: {
            btnSucesso: 'Ir para listagem',
            btnCancelar: 'Cadastrar novo',
            corBtnCancelar: 'primary',
            possuiBtnFechar: true,
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl('filmes');
          } else {
            this.reiniciarForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            titulo: 'Oops ocorreu um erro!',
            mensagem: 'Por favor tente novamente!',
            btnSucesso: 'Fechar',
            corBtnSucesso: 'warn'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      });
  }
}

