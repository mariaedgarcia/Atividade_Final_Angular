import { Routes } from '@angular/router';
import { UsersList } from './pages/users-list/users-list';
import { UserDetail } from './pages/user-detail/user-detail';

export const routes: Routes = [
    // Essa rota é para abrir a lista:
    {
        path: 'users',
        component: UsersList
    },
    // Essa rota é dinâmica, para abrir os detalhes de cada "pessoa"
    {
        path: 'users/:id',
        component: UserDetail
    },
    // Essa é para se caso procurar vazio, ela vai abrir a lista
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
    // Essa é para qualquer coisa desconhecida abrirá a lista:
    
    {
        path: '**',
        redirectTo: '/users'
    }
];
