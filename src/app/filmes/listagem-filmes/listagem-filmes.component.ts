import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FilmesService} from 'src/app/core/filmes.service';
import {Filme} from 'src/app/shared/models/filme';
import {ConfigParams} from "../../shared/models/config-params";

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  config = {
    pagina: 0,
    qtdPagina: 4,
  } as ConfigParams;
  filmes: Filme[] = [];
  filtroFilme: FormGroup;
  generos: Array<string>;

  constructor(
    private filmesService: FilmesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.filtroFilme = this.formBuilder.group({
      texto: [''],
      genero: ['']
    });

    this.filtroFilme.get('texto').valueChanges.subscribe((val: string) => {
      this.config.texto = val;
      this.resetarConsulta();
    });

    this.filtroFilme.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = {campo: 'genero', valor: val};
      this.resetarConsulta();
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama'];
    this.listar();
  }

  onScroll(): void {
    this.listar();
  }

  private listar(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listar();
  }
}
