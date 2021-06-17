import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book.model';

export const loadBooks = createAction('[Books List] Load Books via Service');

export const booksLoaded = createAction(
  '[Books Effect] Books Loaded Successfully',
  props<{ books: Book[] }>()
);

export const createBook = createAction(
  '[Create Book Component] Create Book',
  props<{ book: Book }>()
);

export const deleteBooks = createAction(
  '[Books List Operations] Delete Book',
  props<{ bookId: string }>()
);

export const updateBooks = createAction(
  '[Books List Operations] Update Book',
  props<{ update: Update<Book> }>()
);

export const bookActionTypes = {
  loadBooks,
  booksLoaded,
  createBook,
  deleteBooks,
  updateBooks,
};
