import { Routes } from '@angular/router';
import { ListaProdutos } from './components/lista-produtos/lista-produtos';

export const routes: Routes = [
  { 
    path: 'produtos',
    component: ListaProdutos
  },
  { 
    path: '',
    redirectTo: '/produtos',
    pathMatch: 'full'
  }
];