import { Action } from '@ngrx/store';
import { Book } from '../models/book.model';

export enum BookActionTypes {
  ADD_BOOK = 'ADD_BOOK',
  REMOVE_BOOK = 'REMOVE_PRODUCT'
}

export class AddBook implements Action {
  readonly type = BookActionTypes.ADD_BOOK;
  constructor(public payload: Book){}
}


export class RemoveBook implements Action {
  readonly type = BookActionTypes.REMOVE_BOOK;
  constructor(public payload: Book){}
}

export type BookActions = AddBook | RemoveBook;
