import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Board} from './board';
import {CardList} from './cardList';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CardListService {

    constructor (private http: Http) {}
    private listApiUrl = 'http://localhost:8000/api/v1/lists';
    getLists() {
        return this.http.get(this.listApiUrl)
            .map(res => <Board[]> res.json())
            .do(data => console.log(data))
            .catch(this.errorHandler);
    }
    getList(listId: number) {
        return this.http.get(this.listApiUrl + '/' + listId)
            .map(res => <CardList> res.json())
            .do(data => console.log(data))
            .catch(this.errorHandler);
    }

    storeList(cardList: CardList) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.listApiUrl, cardList, options)
            .map(res => <CardList> res.json())
            .do(data => console.log(data))
            .catch(this.errorHandler);
    }
    updateList(cardList: CardList) {
        let headers = new Headers({
                'Content-Type': 'application/json',
                'Cookie': 'XDEBUG_SESSION=XDEBUG_ECLIPSE'}
        );
        let options = new RequestOptions({ headers: headers});
        return this.http.put(this.listApiUrl + '/' + cardList.id, cardList, options)
            .map(res => <CardList> res.json())
            .do(data => console.log(data))
            .catch(this.errorHandler);
    }


    private errorHandler (error: Response) {
        console.error(error);
        return Observable.throw(error.json.error || 'Server error');
    }
}