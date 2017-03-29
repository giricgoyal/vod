import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './component';

const routes: Routes = [
    {
        path: '',
        component: HistoryComponent
    }
];

export const HistoryRouteModule: ModuleWithProviders = RouterModule.forChild(routes);