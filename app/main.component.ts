import {Component} from 'angular2/core';
import {BoardComponent} from './board.component';
@Component({
    selector: 'my-app',
    templateUrl: '../templates/main.html',
    directives: [BoardComponent]
})
export class MainComponent {}