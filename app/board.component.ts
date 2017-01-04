import {Component, OnInit} from '@angular/core';
import {Board} from './board';
import {Card} from './card';
import {BoardService} from './board.service';
import { NDV_DIRECTIVES } from 'angular2-click-to-edit/components';


@Component({
    selector: 'my-board',
    templateUrl: '../templates/board.html',
    providers: [BoardService],
    directives: [NDV_DIRECTIVES]
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
    checkPermissions() {
       return true;
    }

    ngOnInit() {
        this.getBoards();
    }

    addCardToList(list: CardList) {
        let newCard = {id: 0, title: 'newCard'};
        list.cards.push(newCard);
    }

    addNewList() {
        let newList = {id: 0, title: 'new list', cards: []};
        this.selectedBoard.lists.push(newList);
    }

    save() {

    }

    private getBoards() {
        this._boardService.getBoards()
            .subscribe(
                boards => {
                    this.boards = boards;
                    if (this.boards.length) {
                        this.boardSelect(this.boards[0].id);
                    }
                },
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