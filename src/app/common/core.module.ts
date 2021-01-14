import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReplacePipe } from '../helpers/replace.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ApiService, DataService } from '../services';
import { SearchComponent } from './search/search.component'; 

@NgModule({
    declarations: [ReplacePipe,
          SearchComponent, ],
    imports: [
        AngularFontAwesomeModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [ 
        SearchComponent, 
        AngularFontAwesomeModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [  
        DataService,
        ApiService
    ]
})
export class CoreModule { }
