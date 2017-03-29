import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './component';
import { AuthGuard } from '../../shared';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children : [
            {
                path: 'home',
                loadChildren: '../home/index#HomeModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'history',
                loadChildren: '../history/index#HistoryModule',
                canActivate: [AuthGuard]
            }
        ]
    }
];

export const MainRouteModule: ModuleWithProviders = RouterModule.forChild(routes);
