import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Board} from './board';
import {BoardService} from './board.service';

@Component({
    selector: 'my-board',
    templateUrl: '../templates/board.html',
    providers: [HTTP_PROVIDERS, BoardService]
})

export class BoardComponent implements OnInit {
    errorMessage: string;
    boards: Board[];
    selectedID: number;
    boardLink: string;
    display: string;

    constructor (private _boardService: BoardService) {}

    boardSelect(boardId: number) {
        this.selectedID = boardId;

    }

    ngOnInit() {
        this.getBoards();
    }

    getBoards() {
        this._boardService.getBoards()
            .subscribe(
                boards => this.boards = boards,
                error => this.errorMessage = <any>error
            );
    }
}