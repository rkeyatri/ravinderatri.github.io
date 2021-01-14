import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';  
import {MainComponent} from './layouts/main/main.component';
import {HomeComponent} from './home/home.component'; 
import {ImportsComponent} from './imports/imports.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', 
        component: MainComponent,
        
        children: [
            {path: '', component: HomeComponent, pathMatch: 'full'}, 
            {path: 'imports', component: ImportsComponent, pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'}, 
        ]
    },
 
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}