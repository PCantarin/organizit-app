import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/products';

  getProdutos(){
    return this.http.get<Produto[]>(this.API_URL);
  }
}
