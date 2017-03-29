import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

export const HomeRouteModule: ModuleWithProviders = RouterModule.forChild(routes);