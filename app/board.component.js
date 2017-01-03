System.register(['angular2/core', 'angular2/http', './board.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, board_service_1;
    var BoardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (board_service_1_1) {
                board_service_1 = board_service_1_1;
            }],
        execute: function() {
            BoardComponent = (function () {
                function BoardComponent(_boardService) {
                    this._boardService = _boardService;
                }
                BoardComponent.prototype.boardSelect = function (boardId) {
                    this.selectedID = boardId;
                    this.getBoard(this.selectedID);
                };
                BoardComponent.prototype.ngOnInit = function () {
                    this.getBoards();
                };
                BoardComponent.prototype.addCardToList = function (list) {
                    var newCard = { id: 0, title: 'newCard' };
                    list.cards.push(newCard);
                };
                BoardComponent.prototype.getBoards = function () {
                    var _this = this;
                    this._boardService.getBoards()
                        .subscribe(function (boards) { return _this.boards = boards; }, function (error) { return _this.errorMessage = error; });
                };
                BoardComponent.prototype.getBoard = function (boardId) {
                    var _this = this;
                    this._boardService.getBoard(boardId)
                        .subscribe(function (board) {
                        _this.selectedBoard = board;
                        _this.getBoardLists(board.id);
                    }, function (error) { return _this.errorMessage = error; });
                };
                BoardComponent.prototype.getBoardLists = function (boardId) {
                    var _this = this;
                    this._boardService.getBoardLists(boardId)
                        .subscribe(function (lists) {
                        _this.selectedBoard.lists = lists;
                    }, function (error) { return _this.errorMessage = error; });
                };
                BoardComponent = __decorate([
                    core_1.Component({
                        selector: 'my-board',
                        templateUrl: '../templates/board.html',
                        providers: [http_1.HTTP_PROVIDERS, board_service_1.BoardService]
                    }), 
                    __metadata('design:paramtypes', [board_service_1.BoardService])
                ], BoardComponent);
                return BoardComponent;
            }());
            exports_1("BoardComponent", BoardComponent);
        }
    }
});
//# sourceMappingURL=board.component.js.map