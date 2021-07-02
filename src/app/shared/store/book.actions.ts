import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book.model';
import { ActionTypes } from '../models/enum.actiontypes';

export const loadBooks = createAction('[Books List] Load Books via Service');

export const booksLoaded = createAction(
  ActionTypes.LOADS_BOOK,
  props<{ books: Book[] }>()
);

export const createBook = createAction(
  ActionTypes.CREATE_BOOK,
  props<{ book: Book }>()
);

export const deleteBooks = createAction(
  ActionTypes.DELETE_BOOK,
  props<{ bookId: string }>()
);

export const updateBooks = createAction(
  ActionTypes.UPDATE_BOOK,
  props<{ update: Update<Book> }>()
);

export const SetSelectedBook = createAction(
  ActionTypes.SET_BOOK,
  props<{ book: Book }>()
);

export const bookActionTypes = {
  loadBooks,
  booksLoaded,
  createBook,
  deleteBooks,
  updateBooks,
  SetSelectedBook,
};
