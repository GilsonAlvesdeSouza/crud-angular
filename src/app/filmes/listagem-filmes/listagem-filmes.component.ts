import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina = 4;
  pagina = 0;
  filmes: Filme[] = [];
  filtroFilme: FormGroup;
  generos: Array<string>

  constructor(
    private filmesService: FilmesService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.filtroFilme = this.formBuilder.group({
      texto: [''],
      genero: ['']
    });
    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama'];
    this.listar();
  }

  onScroll(): void {
    this.listar();
  }

  private listar(): void {
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPagina)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }
}
