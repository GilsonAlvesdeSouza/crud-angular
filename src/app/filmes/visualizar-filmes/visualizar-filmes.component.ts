import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FilmesService} from '../../core/filmes.service';
import {Filme} from '../../shared/models/filme';
import {Alerta} from '../../shared/models/alerta';
import {AlertaComponent} from '../../shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  id: number;
  filme: Filme;
  readonly semFoto = '../assets/images/sem-imagem.jpeg';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private filmeService: FilmesService
  ) {
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.buscar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Excluir?',
        descricao: 'Tem certeza que deseja Excluir?',
        possuirBtnFechar: true
      } as Alerta
    };

    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmeService.excluir(this.id).subscribe(() => {
          const configSucesso = {
            data: {
              descricao: 'Dados excluidos com sucesso?',
            } as Alerta
          };
          const dialogSucesso = this.dialog.open(AlertaComponent, configSucesso);
          dialogSucesso.afterClosed().subscribe(() => {
            this.router.navigateByUrl('filmes');
          });
        });
      }
    });
  }

  private buscar(): void {
    this.filmeService.buscar(this.id).subscribe((filme) => {
      this.filme = filme;
    });
  }
}
