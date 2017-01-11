import {Component, OnInit} from '@angular/core';
import {Board} from './board';
import {Card} from './card';
import {BoardService} from './board.service';
import {CardListService} from './cardList.service';
import { NDV_DIRECTIVES } from 'angular2-click-to-edit/components';
import {Dragula, DragulaService} from 'ng2-dragula';


@Component({
    selector: 'my-board',
    templateUrl: '../templates/board.html',
    providers: [BoardService, CardListService, DragulaService],
    directives: [NDV_DIRECTIVES, Dragula]
})

export class BoardComponent implements OnInit {
    errorMessage: string;
    boards: Board[];
    selectedID: number;
    boardLink: string;
    display: string;
    selectedBoard: Board;

    constructor (private _boardService: BoardService, private _listService: CardListService, private dragulaService: DragulaService ) {
        dragulaService.dropModel.subscribe((value) => {
            this.selectedBoard.lists.forEach((list) => {
                this._listService.updateList(list).subscribe();
            })
        });

    }

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
        let newList = {id: 0, boardId: this.selectedBoard.id, title: 'new list', cards: []};
        this._listService.storeList(newList).subscribe(
            newList => this.selectedBoard.lists.push(newList)
        );

    }

    save(event, list: CardList) {
        list.title = event.title;
        this._listService.updateList(list).subscribe(

        );
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
                this.dragulaService.destroy('card-bag');
                this.selectedBoard.lists = lists;
            },
            error => this.errorMessage = <any>error
        );
    }
}