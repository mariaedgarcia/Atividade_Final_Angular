import { Routes } from '@angular/router';
import { UsersList } from './pages/users-list/users-list';
import { UserDetail } from './pages/user-detail/user-detail';

export const routes: Routes = [
    {
        path: 'users',
        component: UsersList
    },
    {
        path: 'users/:id',
        component: UserDetail
    },
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/users'
    }
];
