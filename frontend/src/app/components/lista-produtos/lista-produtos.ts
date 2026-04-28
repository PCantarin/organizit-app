import { Component, inject } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-lista-produtos',
  imports: [MatTableModule, MatDividerModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  private produtoService = inject(ProdutoService);

  public produtos = toSignal(this.produtoService.getProdutos(), { initialValue: [] });

  displayedColumns: string[] = ['id', 'name', 'description', 'quantity', 'dateInsert'];
}
