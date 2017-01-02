import {Card} from './card';

export interface CardList {
    id: number;
    title: string;
    cards: Card[];
}