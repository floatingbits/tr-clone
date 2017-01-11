import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BoardComponent} from './board.component';
import { MainComponent }  from './main.component';
import { NDV_DIRECTIVES } from 'angular2-click-to-edit/components';
import { FormsModule }   from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula';


@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, DragulaModule ],
    declarations: [ MainComponent,BoardComponent, NDV_DIRECTIVES],
    bootstrap:    [ MainComponent ],
    providers:    [ ]
})
export class AppModule { }