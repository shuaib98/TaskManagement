import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path:'login',
        loadComponent:()=>
            import('./feature/account/login/login.component').then(
                c=>c.LoginComponent
        ),
    },
    {
        path:'register',
        loadComponent:()=>
            import('./feature/account/register/register.component').then(
                c=>c.RegisterComponent
        ),
    },
    {
        path:'board',
        loadComponent:()=>
            import('./feature/board/list/list.component').then(
            c=>c.ListComponent
        ),
        canActivate:[authGuard]
    },
    {
        path:'board/:id',
        loadComponent:()=>
            import('./feature/board/detail/detail.component').then(
                c=>c.DetailComponent
        ),
        canActivate:[authGuard]
    },
    {
        path:'**',
        redirectTo:'login',
    },
];
