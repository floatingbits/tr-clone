import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Board} from './board';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BoardService {

    constructor (private http: Http) {}
    private boardApiUrl = 'http://localhost:8000/api/v1/boards';
    getBoards() {
        return this.http.get(this.boardApiUrl)
            .map(res => <Board[]> res.json().items)
            .do(data => console.log(data))
            .catch(this.errorHandler);
    }

    private errorHandler (error: Response) {
        console.error(error);
        return Observable.throw(error.json.error || 'Server error');
    }
}