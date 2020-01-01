import { Injectable } from '@angular/core';
import { CarroModel, CarroModeloModel } from '../interface/carro-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CarroMarcaModelo } from '../interface/carro-marca-modelo';
import { CarroListPaginator } from '../interface/carro-list-paginator';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  endpoint = environment.baseUrl + '/carro';
  routes = {
    create: this.endpoint + '/',
    listAstable: this.endpoint + '/buscar',
    marcaModelo: this.endpoint + '/marca-modelo',
    marca: this.endpoint + '/marca',
    modelo: this.endpoint + '/modelo'
  };


  constructor(private http: HttpClient) { }

  private _mapToArray(data: Object) {
    let arr = [];
    Object.keys(data).map(function (key) {
      if (data[key] && data[key].length > 0) {
        arr.push({ propName: key, value: data[key] })
      }
    });
    return arr;
  }

  listAsTable(search: string, pageIndex: number, pageSize: number) {
    const query = '?search=' + search + '&index=' + pageIndex + '&size=' + pageSize;
    const url = this.routes.listAstable + query;
    return this.http.get<CarroListPaginator>(url);
  }

  listMarcas(search: string) {
    const query = '?search=' + search;
    const url = this.routes.marca + query;
    return this.http.get<CarroMarcaModelo[]>(url);
  }

  create(marcaModelo: { marca: string, modelo: string }) {
    const url = this.routes.create;
    return this.http.post<CarroModel>(url, marcaModelo);
  }

  updateMarca(carro, id: number) {
    //Converte o objeto para array de acordo com o serviço.
    const url = this.routes.marca + '/' + id;
    return this.http.patch<CarroModel>(url, this._mapToArray(carro));
  }
  updateModelo(modelo, id: number) {
    //Converte o objeto para array de acordo com o serviço.
    const url = this.routes.modelo + '/' + id;
    return this.http.patch<CarroModel>(url, this._mapToArray(modelo));
  }
  deleteModelo(id: Number) {
    const url = this.routes.modelo + '/' + id;
    return this.http.delete(url);
  }
}