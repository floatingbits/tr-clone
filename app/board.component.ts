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
    selectedBoard: Board;

    constructor (private _boardService: BoardService) {}

    boardSelect(boardId: number) {
        this.selectedID = boardId;
        this.getBoard(this.selectedID);
    }

    ngOnInit() {
        this.getBoards();
    }

    private getBoards() {
        this._boardService.getBoards()
            .subscribe(
                boards => this.boards = boards,
                error => this.errorMessage = <any>error
            );
    }

    private getBoard(boardId: number) {
        this._boardService.getBoard(boardId)
            .subscribe(
            board => {
                this.selectedBoard = board;
                this.getBoardLists(board.id);
            },
            error => this.errorMessage = <any>error
        );
    }

    private getBoardLists(boardId: number) {
        this._boardService.getBoardLists(boardId)
            .subscribe(
            lists => {
                this.selectedBoard.lists = lists
            },
            error => this.errorMessage = <any>error
        );
    }
}