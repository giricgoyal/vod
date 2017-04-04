import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', 
        loadChildren: 'app/components/authentication/index#AuthenticationModule'
    },
    {
        path: 'app',
        loadChildren: 'app/components/main/index#MainModule'
    },
    {
        path: 'about',
        loadChildren: 'app/components/about/index#AboutModule'
    }
];

export const AppRouteModule: ModuleWithProviders = RouterModule.forRoot(routes);