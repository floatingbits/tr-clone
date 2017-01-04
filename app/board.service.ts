import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Board} from './board';
import {CardList} from './cardList';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BoardService {

    constructor (private http: Http) {}
    private boardApiUrl = 'http://localhost:8000/api/v1/boards';
    getBoards() {
        return this.http.get(this.boardApiUrl)
            .map(res => <Board[]> res.json())
            .do(data => console.log(data))
            .catch(this.errorHandler);
    }
    getBoard(boardId: number) {
        return this.http.get(this.boardApiUrl + '/' + boardId)
            .map(res => <Board> res.json())
            .do(data => console.log(data))
            .catch(this.errorHandler);
    }
    getBoardLists(boardId: number) {
        return this.http.get(this.boardApiUrl + '/' + boardId + '/lists')
            .map(res => <CardList[]> res.json())
            .do(data => console.log(data))
            .catch(this.errorHandler);
    }

    private errorHandler (error: Response) {
        console.error(error);
        return Observable.throw(error.json.error || 'Server error');
    }
}