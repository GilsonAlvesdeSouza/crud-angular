import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ConfigParams} from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() {
  }

  confParamentros(config: ConfigParams): HttpParams {
    let httpParams = new HttpParams();
    if (config.pagina) {
      httpParams = httpParams.set('_page', config.pagina.toString());
    }
    if (config.pagina) {
      httpParams = httpParams.set('_limit', config.qtdPagina.toString());
    }
    if (config.texto) {
      httpParams = httpParams.set('q', config.texto.toString());
    }
    if (config.campo) {
      httpParams = httpParams.set(config.campo.campo, config.campo.valor.toString());
    }
    httpParams = httpParams.set('_order', 'desc');
    httpParams = httpParams.set('_sort', 'id');
    return httpParams;
  }
}
