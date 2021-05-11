import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Filme} from '../shared/models/filme';
import {ConfigParams} from '../shared/models/config-params';
import {ConfigParamsService} from './config-params.service';

const url = 'http://192.168.1.8:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(
    private http: HttpClient,
    private confiService: ConfigParamsService
  ) {
  }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  listar(config: ConfigParams): Observable<Filme[]> {
    const configParamsService = this.confiService.confParamentros(config);
    console.log(this.http.get<Filme[]>(url, {params: configParamsService}));
    return this.http.get<Filme[]>(url, {params: configParamsService});
  }

  buscar(id: number): Observable<Filme> {
    return this.http.get<Filme>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
