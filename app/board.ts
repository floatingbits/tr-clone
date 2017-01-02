import {CardList} from './cardList';

export interface Board {
    id: number;
    title: string;
    lists: CardList[];
}